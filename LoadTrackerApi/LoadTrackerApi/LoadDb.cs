using Microsoft.EntityFrameworkCore;
public class LoadDb : DbContext
{
    public LoadDb(DbContextOptions<LoadDb> options) : base(options)
    {
        //TODO: Empty... for now? Not sure what this does 
    }
    public DbSet<Load> Loads => Set<Load>();
}

