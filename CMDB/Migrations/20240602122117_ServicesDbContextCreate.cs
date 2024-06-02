﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMDB.Migrations
{
    /// <inheritdoc />
    public partial class ServicesDbContextCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UslugiIT");

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OfficeLocation = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeID);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    ServiceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.ServiceID);
                });

            migrationBuilder.CreateTable(
                name: "Computers",
                columns: table => new
                {
                    ComputerID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OperatingSystem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IPAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RAM = table.Column<int>(type: "int", nullable: false),
                    CPU = table.Column<int>(type: "int", nullable: false),
                    Storage = table.Column<int>(type: "int", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmployeesEmployeeID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Computers", x => x.ComputerID);
                    table.ForeignKey(
                        name: "FK_Computers_Employees_EmployeesEmployeeID",
                        column: x => x.EmployeesEmployeeID,
                        principalTable: "Employees",
                        principalColumn: "EmployeeID");
                });

            migrationBuilder.CreateTable(
                name: "Phones",
                columns: table => new
                {
                    PhoneID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OperatingSystem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Storage = table.Column<int>(type: "int", nullable: false),
                    ScreenSize = table.Column<int>(type: "int", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmployeesEmployeeID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phones", x => x.PhoneID);
                    table.ForeignKey(
                        name: "FK_Phones_Employees_EmployeesEmployeeID",
                        column: x => x.EmployeesEmployeeID,
                        principalTable: "Employees",
                        principalColumn: "EmployeeID");
                });

            migrationBuilder.CreateTable(
                name: "Servers",
                columns: table => new
                {
                    ServerID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OperatingSystem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IPAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RAM = table.Column<int>(type: "int", nullable: false),
                    CPU = table.Column<int>(type: "int", nullable: false),
                    Storage = table.Column<int>(type: "int", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ServicesServiceID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servers", x => x.ServerID);
                    table.ForeignKey(
                        name: "FK_Servers_Services_ServicesServiceID",
                        column: x => x.ServicesServiceID,
                        principalTable: "Services",
                        principalColumn: "ServiceID");
                });

            migrationBuilder.CreateTable(
                name: "Accessories",
                columns: table => new
                {
                    AccessoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SerialNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WarrantyExpiration = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ComputersComputerID = table.Column<int>(type: "int", nullable: true),
                    PhonesPhoneID = table.Column<int>(type: "int", nullable: true),
                    ServersServerID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accessories", x => x.AccessoryID);
                    table.ForeignKey(
                        name: "FK_Accessories_Computers_ComputersComputerID",
                        column: x => x.ComputersComputerID,
                        principalTable: "Computers",
                        principalColumn: "ComputerID");
                    table.ForeignKey(
                        name: "FK_Accessories_Phones_PhonesPhoneID",
                        column: x => x.PhonesPhoneID,
                        principalTable: "Phones",
                        principalColumn: "PhoneID");
                    table.ForeignKey(
                        name: "FK_Accessories_Servers_ServersServerID",
                        column: x => x.ServersServerID,
                        principalTable: "Servers",
                        principalColumn: "ServerID");
                });

            migrationBuilder.CreateTable(
                name: "AccessoriesEmployees",
                columns: table => new
                {
                    AccessoriesAccessoryID = table.Column<int>(type: "int", nullable: false),
                    EmployeesEmployeeID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessoriesEmployees", x => new { x.AccessoriesAccessoryID, x.EmployeesEmployeeID });
                    table.ForeignKey(
                        name: "FK_AccessoriesEmployees_Accessories_AccessoriesAccessoryID",
                        column: x => x.AccessoriesAccessoryID,
                        principalTable: "Accessories",
                        principalColumn: "AccessoryID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccessoriesEmployees_Employees_EmployeesEmployeeID",
                        column: x => x.EmployeesEmployeeID,
                        principalTable: "Employees",
                        principalColumn: "EmployeeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_ComputersComputerID",
                table: "Accessories",
                column: "ComputersComputerID");

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_PhonesPhoneID",
                table: "Accessories",
                column: "PhonesPhoneID");

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_ServersServerID",
                table: "Accessories",
                column: "ServersServerID");

            migrationBuilder.CreateIndex(
                name: "IX_AccessoriesEmployees_EmployeesEmployeeID",
                table: "AccessoriesEmployees",
                column: "EmployeesEmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Computers_EmployeesEmployeeID",
                table: "Computers",
                column: "EmployeesEmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Phones_EmployeesEmployeeID",
                table: "Phones",
                column: "EmployeesEmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Servers_ServicesServiceID",
                table: "Servers",
                column: "ServicesServiceID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccessoriesEmployees");

            migrationBuilder.DropTable(
                name: "Accessories");

            migrationBuilder.DropTable(
                name: "Computers");

            migrationBuilder.DropTable(
                name: "Phones");

            migrationBuilder.DropTable(
                name: "Servers");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.CreateTable(
                name: "UslugiIT",
                columns: table => new
                {
                    UslugaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataRozpoczecia = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataZakonczenia = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Nazwa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UslugiIT", x => x.UslugaID);
                });
        }
    }
}
