using TripTracker.Dtos;
using TripTracker.Models;

namespace TripTracker.Services
{
    public interface ITripService
    {
        Task<List<Trip>> Import(IFormFile file);
        Task<List<Trip>> GetTrips();
        Task<Trip> GetTripById(int id);
        Task<Trip> CreateTrip(CreateTripDto dto);
    }
}
