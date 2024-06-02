using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMDB.Migrations.ResourceRelationshipDb
{
    /// <inheritdoc />
    public partial class ResourceRelationshipDbContextCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ResourceRelationship",
                columns: table => new
                {
                    RelationshipID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentResourceID = table.Column<int>(type: "int", nullable: false),
                    ChildResourceID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceRelationship", x => x.RelationshipID);
                    table.ForeignKey(
                        name: "FK_ResourceRelationship_ResourceRelationship_ChildResourceID",
                        column: x => x.ChildResourceID,
                        principalTable: "ResourceRelationship",
                        principalColumn: "RelationshipID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ResourceRelationship_ResourceRelationship_ParentResourceID",
                        column: x => x.ParentResourceID,
                        principalTable: "ResourceRelationship",
                        principalColumn: "RelationshipID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ResourceRelationship_ChildResourceID",
                table: "ResourceRelationship",
                column: "ChildResourceID");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceRelationship_ParentResourceID",
                table: "ResourceRelationship",
                column: "ParentResourceID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ResourceRelationship");
        }
    }
}
