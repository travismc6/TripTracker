using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using TripTracker.Dtos;
using TripTracker.Models;
using TripTracker.Services;

namespace TripTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripService _tripService;
        private readonly ImageService _imageService;

        public TripsController(ITripService tripService, ImageService imageService)
        {
            _tripService = tripService;
            _imageService = imageService;
        }

        [HttpPost]
        [Route("/import")]
        public async Task<IActionResult> ImportTrips(IFormFile file)
        {
            var trips = await _tripService.Import(file);

            return Ok(trips);
        }

        [HttpGet]
        public async Task<IActionResult> GetTrips()
        {
            try
            {
                var trips = await _tripService.GetTrips();

                return Ok(trips);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTripById(int id)
        {
            try
            {
                var trip = await _tripService.GetTripById(id);
                return Ok(trip);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrip([FromForm]CreateTripDto createTrip)
        {
            try
            {
                var trip = await _tripService.CreateTrip(createTrip);
                return Ok(trip);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // TODO: figure out why api/trips is not appending
        [HttpPost("image/{tripId}")]
        public async Task<IActionResult> UploadImage([FromForm] PhotoUploadFile file, int tripId)
        {
            var imageResult = await _imageService.AddImageAsync(file.UploadFile);

            var result = await _tripService.UploadTripPhoto(tripId, imageResult.PublicId, imageResult.SecureUrl.ToString());

            return Ok(result);
        }
    }
}
