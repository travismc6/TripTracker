using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TripTracker.Migrations
{
    public partial class columns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartCoordiantes",
                table: "Trips",
                newName: "StartCoordinates");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartCoordinates",
                table: "Trips",
                newName: "StartCoordiantes");
        }
    }
}
