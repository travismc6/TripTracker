namespace TripTracker.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }
        public int TripId { get; set; }
        public Trip Trip { get; set; }
    }
}
