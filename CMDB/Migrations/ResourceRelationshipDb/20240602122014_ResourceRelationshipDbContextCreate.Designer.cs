﻿// <auto-generated />
using CMDB.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CMDB.Migrations.ResourceRelationshipDb
{
    [DbContext(typeof(ResourceRelationshipDbContext))]
    [Migration("20240602122014_ResourceRelationshipDbContextCreate")]
    partial class ResourceRelationshipDbContextCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CMDB.Models.DBEntities.ResourceRelationship", b =>
                {
                    b.Property<int>("RelationshipID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RelationshipID"));

                    b.Property<int>("ChildResourceID")
                        .HasColumnType("int");

                    b.Property<int>("ParentResourceID")
                        .HasColumnType("int");

                    b.HasKey("RelationshipID");

                    b.HasIndex("ChildResourceID");

                    b.HasIndex("ParentResourceID");

                    b.ToTable("ResourceRelationship");
                });

            modelBuilder.Entity("CMDB.Models.DBEntities.ResourceRelationship", b =>
                {
                    b.HasOne("CMDB.Models.DBEntities.ResourceRelationship", "ChildResource")
                        .WithMany()
                        .HasForeignKey("ChildResourceID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CMDB.Models.DBEntities.ResourceRelationship", "ParentResource")
                        .WithMany()
                        .HasForeignKey("ParentResourceID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ChildResource");

                    b.Navigation("ParentResource");
                });
#pragma warning restore 612, 618
        }
    }
}