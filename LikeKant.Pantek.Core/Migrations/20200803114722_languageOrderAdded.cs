using Microsoft.EntityFrameworkCore.Migrations;

namespace LikeKant.Pantek.Core.Migrations
{
    public partial class languageOrderAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "Order",
                table: "Languages",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.UpdateData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: 1,
                column: "Order",
                value: (short)2);

            migrationBuilder.UpdateData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: 2,
                column: "Order",
                value: (short)1);

            migrationBuilder.UpdateData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: 3,
                column: "Order",
                value: (short)3);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "Languages");
        }
    }
}
