using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMDB.Migrations
{
    /// <inheritdoc />
    public partial class initializemodules : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UslugiIT",
                columns: table => new
                {
                    UslugaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nazwa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataRozpoczecia = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataZakonczenia = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UslugiIT", x => x.UslugaID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UslugiIT");
        }
    }
}
