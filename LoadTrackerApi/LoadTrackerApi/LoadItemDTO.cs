
public class LoadItemDTO
{
    public int Id { get; set; }
    public string? CustomerName { get; set; }
    public string? Carrier { get; set; }
    public bool isComplete { get; set; }

    public string? Source { get; set; }

    public string? Dest { get; set; }

    public LoadItemDTO() { }

    public LoadItemDTO(Load loadItem) =>
        (Id, CustomerName, Carrier, isComplete, Source, Dest) = 
        (loadItem.Id, loadItem.CustomerName, loadItem.Carrier, loadItem.isComplete, loadItem.Source, loadItem.Dest);
}
