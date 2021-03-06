namespace TripTracker.Dtos
{
    public class CreateTripDto
    {
        public string River { get; set; }
        public string State { get; set; }
        public DateTime Date { get; set; }
        public string Stage { get; set; }
        public double? Flow { get; set; }
        public string StartName { get; set; }
        public string StartCoordinates { get; set; }
        public string EndName { get; set; }
        public string? EndCoordinates { get; set; }
        public double? TimeMinutes { get; set; }
        public double DistanceMiles { get; set; }
        public string? MeasuredAt { get; set; }
        public string? Notes { get; set; }
        public int? Days { get; set; }
    }
}
