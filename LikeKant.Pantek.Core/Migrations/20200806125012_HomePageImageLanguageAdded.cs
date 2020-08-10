using Microsoft.EntityFrameworkCore.Migrations;

namespace LikeKant.Pantek.Core.Migrations
{
    public partial class HomePageImageLanguageAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "HomePageImages",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "LanguageId",
                table: "HomePageImages",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_HomePageImages_LanguageId",
                table: "HomePageImages",
                column: "LanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_HomePageImages_Languages_LanguageId",
                table: "HomePageImages",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HomePageImages_Languages_LanguageId",
                table: "HomePageImages");

            migrationBuilder.DropIndex(
                name: "IX_HomePageImages_LanguageId",
                table: "HomePageImages");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "HomePageImages");

            migrationBuilder.DropColumn(
                name: "LanguageId",
                table: "HomePageImages");
        }
    }
}
