using Microsoft.EntityFrameworkCore.Migrations;

namespace LikeKant.Pantek.Core.Migrations
{
    public partial class languageVersionAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Version",
                table: "Languages",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Version",
                table: "Languages");
        }
    }
}
