using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TripTracker.Migrations
{
    public partial class Photorename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripPhotos_Trips_TripId",
                table: "TripPhotos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TripPhotos",
                table: "TripPhotos");

            migrationBuilder.RenameTable(
                name: "TripPhotos",
                newName: "Photos");

            migrationBuilder.RenameIndex(
                name: "IX_TripPhotos_TripId",
                table: "Photos",
                newName: "IX_Photos_TripId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Photos",
                table: "Photos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Trips_TripId",
                table: "Photos",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Trips_TripId",
                table: "Photos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Photos",
                table: "Photos");

            migrationBuilder.RenameTable(
                name: "Photos",
                newName: "TripPhotos");

            migrationBuilder.RenameIndex(
                name: "IX_Photos_TripId",
                table: "TripPhotos",
                newName: "IX_TripPhotos_TripId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TripPhotos",
                table: "TripPhotos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TripPhotos_Trips_TripId",
                table: "TripPhotos",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
