namespace CoffeeJournal.Models;

public class CoffeeRecord
{
    public int? Id { get; set; }
    public string Type { get; set; }
    public string? Bean { get; set; }
    public string Location { get; set; }
    public DateTime DateCreated { get; set; }
    public int Score { get; set; }
    public int NumShots { get; set; }
    public Single Price { get; set; }
}