using TripTracker.Dtos;
using TripTracker.Models;
using AutoMapper;

namespace TripTracker
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateTripDto, Trip>();
        }
    }
}
