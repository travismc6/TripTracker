using Microsoft.EntityFrameworkCore;
using TripTracker.Models;

namespace TripTracker.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer(connectionString);
        }

        public DbSet<Trip> Trips { get; set; }
        public DbSet<Attendee> Attendees { get; set; }
        public DbSet<TripPhoto> TripPhotos { get; set; }

    }
}
