using TripTracker.Models;

namespace TripTracker.Services
{
    public interface ITripService
    {
        Task<List<Trip>> Import(IFormFile file);
        Task<List<Trip>> GetTrips();
    }
}
