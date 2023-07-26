/**
 * Main file for the LoadTrackerAPI layer
 * 
 * The LoadTrackerAPI is a backend for the LoadTracker app. This backend will
 * server as the API for a MS SQL server that contains load data being stored.
 * 
 * CITATION: This code is entirely based on the following microsoft tutorial:
 * https://learn.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-7.0&tabs=visual-studio
 * 
 * 
 */
using Microsoft.EntityFrameworkCore;

//Construct app with proper settings
var builder = WebApplication.CreateBuilder(args);
//add database context to the dependency injection  container and enables dispalying database exceptions
builder.Services.AddDbContext<LoadDb>(opt => opt.UseInMemoryDatabase("LoadList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();


//A simple homepage because without it the window launches to a 404 error and that's ugly
app.MapGet("/", () => "Running LoadTrackerAPI!");

//GET operations
//------------------------------------------------------------------------
app.MapGet("loaditems/", async (LoadDb db) =>
    {
        return Results.Ok(await db.Loads.Select(x => new LoadItemDTO(x)).ToArrayAsync());
    });

app.MapGet("loaditems/{id}", async (int id, LoadDb db) =>
{
    return Results.Ok(await db.Loads.FindAsync(id)
        is Load load
            ? Results.Ok(new LoadItemDTO(load))
            : Results.NotFound());
});

app.MapGet("loaditems/carrier/{name}", async (string name, LoadDb db) =>
{
    return Results.Ok(await db.Loads.Where(x => String.Equals(x.Carrier, name)).ToArrayAsync());
});

app.MapGet("loaditems/source/{name}", async (string name, LoadDb db) =>
{
    return Results.Ok(await db.Loads.Where(x => String.Equals(x.Source, name)).ToArrayAsync());
});

app.MapGet("loaditems/dest/{name}", async (string name, LoadDb db) =>
{
    return Results.Ok(await db.Loads.Where(x => String.Equals(x.Dest, name)).ToArrayAsync());
});

app.MapGet("loaditems/complete", async (LoadDb db) =>
    await db.Loads.Where(l => l.isComplete).Select(x => new LoadItemDTO(x)).ToArrayAsync());

//POST operations
//----------------------------------------------------------------
app.MapPost("loaditems", async (Load load, LoadDb db) =>
{
    db.Loads.Add(load);
    await db.SaveChangesAsync();

    return Results.Created($"loaditems/{load.Id}", load);
});

//PUT operations
//-----------------------------------------------------------------
app.MapPut("loaditems/{id}", async (int id, Load inputLoad, LoadDb db) =>
{
    var load = await db.Loads.FindAsync(id);

    if (load is null) return Results.NotFound();

    load.CustomerName = inputLoad.CustomerName;
    load.Carrier = inputLoad.Carrier;
    load.isComplete = inputLoad.isComplete;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/loaditems/{id}", async (int id, LoadDb db) =>
{
    if (await db.Loads.FindAsync(id) is Load load)
    {
        db.Loads.Remove(load);
        await db.SaveChangesAsync();
        return Results.Ok(load);
    }

    return Results.NotFound();
});

app.Run();
