using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using TripTracker.Data;
using TripTracker.Models;

namespace TripTracker.Services
{
    public class TripService : ITripService
    {
        private readonly DataContext _context;
        public TripService(DataContext context)
        {
            _context = context;
        }

        public async Task<Trip> GetTripById(int id)
        {
            var trips = _context.Trips.Where(r=> r.Id == id).AsQueryable();
            return await trips.FirstAsync();
        }

        public async Task<List<Trip>> GetTrips()
        {
            var trips =  _context.Trips.AsQueryable();
            return await trips.ToListAsync();
        }

        public async Task<List<Trip>> Import(IFormFile file)
        {
            try
            {
                var trips = new List<Trip>();

                var config = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                };

                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    ms.Position = 0;

                    using (var reader = new StreamReader(ms))
                    {
                        using (var csv = new CsvReader(reader, config))
                        {
                            var parsedRecords = csv.GetRecords<TripImportDto>().ToList();

                            foreach(var tripDto in parsedRecords)
                            {
                                var trip = new Trip { 
                                    River = tripDto.River,
                                    State = tripDto.State,

                                    Stage = tripDto.Stage,
                                    StartName = tripDto.StartName,
                                    StartCoordinates = tripDto.StartCoordinates,
                                    EndCoordinates = tripDto.EndCoordinates,
                                    EndName = tripDto.EndName,
                                    MeasuredAt = tripDto.MeasuredAt,
                                    Notes = tripDto.Notes
                                };

                                // year
                                //date
                                DateTime date;
                                int year;

                                if (DateTime.TryParse(tripDto.DateString, out date))
                                {
                                    trip.Year = date.Year;
                                    trip.Date = date;
                                }
                                else if (Int32.TryParse(tripDto.DateString, out year))
                                {
                                    trip.Year = year;
                                }
                                else if(!String.IsNullOrEmpty(tripDto.DateString))
                                {
                                    string[] s = tripDto.DateString.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

                                    if (Int32.TryParse(s.Last(), out year))
                                    {
                                        trip.Year = year;
                                    }
                                }

                                //flow
                                if (!string.IsNullOrEmpty(tripDto.FlowString))
                                {
                                    string flowNumber = tripDto.FlowString.ToLower().Replace("cfs", "").Trim();
                                    double flow;
                                    if (Double.TryParse(flowNumber, out flow))
                                    {
                                        trip.Flow = flow;
                                    }
                                }

                                //time minues
                                if (!string.IsNullOrEmpty(tripDto.TimeString))
                                {
                                    int minutes;
                                    int hours;
                                    trip.TimeMinutes = 0;

                                    var timeString = tripDto.TimeString.ToLower().Replace("~", "").Replace("hours", "hr").
                                        Replace("hrs", "hr").Replace("?", "").Replace(" ", "").Trim(); ;

                                    var s = timeString.Split(new[] { "hr", "min" }, StringSplitOptions.RemoveEmptyEntries);

                                    if (Int32.TryParse(s[0], out hours))
                                    {
                                        trip.TimeMinutes += (hours * 60);
                                    }
                                    
                                    if(s.Length > 1)
                                    {
                                        if (Int32.TryParse(s[1], out minutes))
                                        {
                                            trip.TimeMinutes += minutes;
                                        }
                                    }
                                }

                                //distance miles
                                double miles;
                                if (Double.TryParse(tripDto.DistanceMiles, out miles))
                                {
                                    trip.DistanceMiles = miles;
                                }

                                 trips.Add(trip);
                            }

                            _context.Trips.AddRange(trips);
                            await _context.SaveChangesAsync();


                            return trips;
                        }
                    }
                }
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
