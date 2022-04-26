namespace TripTracker.Models
{
    public class TripImportDto
    {
        public string River { get; set; }
        public string State { get; set; }
        public string DateString { get; set; }
        public string Stage { get; set; }
        public string FlowString { get; set; }
        public string StartName { get; set; }
        public string EndName { get; set; }
        public string TimeString { get; set; }
        public string DistanceMiles { get; set; }
        public string MeasuredAt { get; set; }

        public string Notes { get; set; }
    }
}
