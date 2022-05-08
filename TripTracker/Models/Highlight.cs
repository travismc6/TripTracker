namespace TripTracker.Models
{
    public class Highlight
    {
        public int Id { get; set; }
        public Trip Trip { get; set; }
        public HighlightType Type { get; set; }
        public string Name { get; set; }
        public string Coordinates { get; set; }
        public string Notes { get; set; }
    }
    
    public enum HighlightType
    {
        Other,
        Rapids,
        Scenery,
        Campsite,
        Fishing,
        Lunch,
        Waterfall
    }
}
