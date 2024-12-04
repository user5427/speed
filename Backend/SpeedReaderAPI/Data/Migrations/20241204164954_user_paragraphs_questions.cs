using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class user_paragraphs_questions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Question",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Paragraph",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Question_UserId",
                table: "Question",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Paragraph_UserId",
                table: "Paragraph",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Paragraph_User_UserId",
                table: "Paragraph",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Question_User_UserId",
                table: "Question",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Paragraph_User_UserId",
                table: "Paragraph");

            migrationBuilder.DropForeignKey(
                name: "FK_Question_User_UserId",
                table: "Question");

            migrationBuilder.DropIndex(
                name: "IX_Question_UserId",
                table: "Question");

            migrationBuilder.DropIndex(
                name: "IX_Paragraph_UserId",
                table: "Paragraph");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Paragraph");
        }
    }
}
