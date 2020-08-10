using Microsoft.EntityFrameworkCore.Migrations;

namespace LikeKant.Pantek.Core.Migrations
{
    public partial class HomePageImageOrderAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "HomePageImages",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "HomePageImages");
        }
    }
}
