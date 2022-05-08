using AutoMapper;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using TripTracker.Data;
using TripTracker.Dtos;
using TripTracker.Models;

namespace TripTracker.Services
{
    public class TripService : ITripService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TripService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Trip> CreateTrip(CreateTripDto dto)
        {
            var trip = _mapper.Map<Trip>(dto);
            await _context.Trips.AddAsync(trip);
            await _context.SaveChangesAsync();

            return trip;
        }

        public async Task<bool> DeleteTrip(int id)
        {
            var trip = _context.Trips.Where(r => r.Id == id).First();
            _context.Trips.Remove(trip);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Trip> GetTripById(int id)
        {
            var trips = _context.Trips.Where(r=> r.Id == id).Include(r => r.Photos).AsQueryable();
            return await trips.FirstAsync();
        }

        public async Task<List<Trip>> GetTrips()
        {
            var trips =  _context.Trips.OrderByDescending(t => t.Date).AsQueryable();
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
                                    trip.Date = date;
                                }
                                else if (Int32.TryParse(tripDto.DateString, out year))
                                {
                                    trip.Date = new DateTime(year, 1, 1);
                                }
                                else if(!String.IsNullOrEmpty(tripDto.DateString))
                                {
                                    string[] s = tripDto.DateString.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

                                    if (Int32.TryParse(s.Last(), out year))
                                    {
                                        trip.Date = new DateTime(year, 1, 1);
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

        public async Task<Photo> UploadTripPhoto(int id, string publicId, string url)
        {
            var trip = await GetTripById(id);

            if(trip == null)
            {
                return null;
            }

            var photo = new Photo() { TripId = id, Url = url, PublicId = publicId };

            trip.Photos.Add(photo);
            await _context.SaveChangesAsync();

            return photo;
        }
    }
}
