
public class Load
    {
    public int Id { get; set; }
    public string? CustomerName { get; set; }
    public string? Carrier { get; set; }
    public bool isComplete { get; set; }

    public string? Secret { get; set; }

    public string? Source { get; set; }

    public string? Dest { get; set; }

    public Load(int id, string? customerName, string? carrier, bool isComplete, string? secret, string? source, string? dest)
    {
        Id = id;
        CustomerName = customerName;
        Carrier = carrier;
        this.isComplete = isComplete;
        Secret = secret;
        Source = source;
        Dest = dest;
    }
}

