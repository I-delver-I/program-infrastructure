﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace aspnet.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250123064547_AddImageFieldToViewer")]
    partial class AddImageFieldToViewer
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("aspnet.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("TicketId")
                        .HasColumnType("integer");

                    b.Property<int?>("ViewerId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TicketId");

                    b.HasIndex("ViewerId");

                    b.ToTable("Orders");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            OrderDate = new DateTime(2025, 8, 20, 10, 22, 16, 0, DateTimeKind.Utc),
                            TicketId = 1,
                            ViewerId = 1
                        },
                        new
                        {
                            Id = 2,
                            OrderDate = new DateTime(2025, 8, 20, 10, 24, 16, 0, DateTimeKind.Utc),
                            TicketId = 2,
                            ViewerId = 2
                        });
                });

            modelBuilder.Entity("aspnet.Models.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("MovieTitle")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SeatNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ShowTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Tickets");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            MovieTitle = "Dead Pool",
                            SeatNumber = "A7",
                            ShowTime = new DateTime(2025, 8, 20, 12, 22, 16, 0, DateTimeKind.Utc)
                        },
                        new
                        {
                            Id = 2,
                            MovieTitle = "Dead Pool",
                            SeatNumber = "A6",
                            ShowTime = new DateTime(2025, 8, 20, 12, 22, 16, 0, DateTimeKind.Utc)
                        });
                });

            modelBuilder.Entity("aspnet.Models.Viewer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Age")
                        .HasColumnType("integer");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<byte[]>("Image")
                        .HasColumnType("bytea");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Viewers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Age = 20,
                            Gender = "male",
                            Name = "John Doe"
                        },
                        new
                        {
                            Id = 2,
                            Age = 18,
                            Gender = "female",
                            Name = "Jane Doe"
                        });
                });

            modelBuilder.Entity("aspnet.Models.Order", b =>
                {
                    b.HasOne("aspnet.Models.Ticket", "Ticket")
                        .WithMany()
                        .HasForeignKey("TicketId");

                    b.HasOne("aspnet.Models.Viewer", "Viewer")
                        .WithMany()
                        .HasForeignKey("ViewerId");

                    b.Navigation("Ticket");

                    b.Navigation("Viewer");
                });
#pragma warning restore 612, 618
        }
    }
}
