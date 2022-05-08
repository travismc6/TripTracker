using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TripTracker.Migrations
{
    public partial class AddDays : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Days",
                table: "Trips",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Days",
                table: "Trips");
        }
    }
}
