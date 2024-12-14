﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SpeedReaderAPI.Data;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ArticleCategory", b =>
                {
                    b.Property<int>("ArticlesId")
                        .HasColumnType("int");

                    b.Property<int>("CategoriesId")
                        .HasColumnType("int");

                    b.HasKey("ArticlesId", "CategoriesId");

                    b.HasIndex("CategoriesId");

                    b.ToTable("ArticleCategory");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CategoryIds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CategoryTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageMimeType")
                        .HasColumnType("int");

                    b.Property<string>("Language")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OriginalAuthor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ParagraphIds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Publisher")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Article");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.ArticleSession", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<int>("CorrectQuestionCount")
                        .HasColumnType("int");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime2");

                    b.Property<int>("TotalQuestionCount")
                        .HasColumnType("int");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<int>("Wpm")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("UserId");

                    b.ToTable("ArticleSession");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ArticleIds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageMimeType")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Paragraph", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<string>("ImageFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageMimeType")
                        .HasColumnType("int");

                    b.Property<string>("QuestionIds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(1500)
                        .HasColumnType("nvarchar(1500)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("UserId");

                    b.ToTable("Paragraph");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.ParagraphSession", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("ArticleSessionId")
                        .HasColumnType("bigint");

                    b.Property<int>("CorrectQuestionCount")
                        .HasColumnType("int");

                    b.Property<int>("DurationInSeconds")
                        .HasColumnType("int");

                    b.Property<int>("ParagraphId")
                        .HasColumnType("int");

                    b.Property<int>("TotalQuestionCount")
                        .HasColumnType("int");

                    b.Property<int>("Wpm")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ArticleSessionId");

                    b.HasIndex("ParagraphId");

                    b.ToTable("ParagraphSession");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AnswerChoices")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CorrectAnswerIndex")
                        .HasMaxLength(255)
                        .HasColumnType("int");

                    b.Property<string>("ImageFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageMimeType")
                        .HasColumnType("int");

                    b.Property<int>("ParagraphId")
                        .HasColumnType("int");

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ParagraphId");

                    b.HasIndex("UserId");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("ArticlesCountRead")
                        .HasColumnType("bigint");

                    b.Property<long>("CorrectQuestions")
                        .HasColumnType("bigint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageFilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageMimeType")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<long>("SecondsRead")
                        .HasColumnType("bigint");

                    b.Property<long>("TotalQuestions")
                        .HasColumnType("bigint");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("WordsRead")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("ValidationSettings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("MaxAnswerChoiceLength")
                        .HasColumnType("int");

                    b.Property<int>("MaxParagraphLength")
                        .HasColumnType("int");

                    b.Property<int>("MaxQuestionTextLength")
                        .HasColumnType("int");

                    b.Property<int>("MaxTitleLength")
                        .HasColumnType("int");

                    b.Property<int>("MinAnswerChoicesCount")
                        .HasColumnType("int");

                    b.Property<int>("MinParagraphLength")
                        .HasColumnType("int");

                    b.Property<int>("MinQuestionTextLength")
                        .HasColumnType("int");

                    b.Property<int>("MinTitleLength")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ValidationSettings");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            MaxAnswerChoiceLength = 255,
                            MaxParagraphLength = 1500,
                            MaxQuestionTextLength = 255,
                            MaxTitleLength = 255,
                            MinAnswerChoicesCount = 2,
                            MinParagraphLength = 10,
                            MinQuestionTextLength = 5,
                            MinTitleLength = 3
                        });
                });

            modelBuilder.Entity("ArticleCategory", b =>
                {
                    b.HasOne("SpeedReaderAPI.Entities.Article", null)
                        .WithMany()
                        .HasForeignKey("ArticlesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SpeedReaderAPI.Entities.Category", null)
                        .WithMany()
                        .HasForeignKey("CategoriesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Article", b =>
                {
                    b.HasOne("SpeedReaderAPI.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.ArticleSession", b =>
                {
                    b.HasOne("SpeedReaderAPI.Entities.Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("SpeedReaderAPI.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Category", b =>
                {
                    b.HasOne("SpeedReaderAPI.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Paragraph", b =>
                {
                    b.HasOne("SpeedReaderAPI.Entities.Article", "Article")
                        .WithMany("Paragraphs")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SpeedReaderAPI.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.ParagraphSession", b =>
                {
                    b.HasOne("SpeedReaderAPI.Entities.ArticleSession", "ArticleSession")
                        .WithMany()
                        .HasForeignKey("ArticleSessionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("SpeedReaderAPI.Entities.Paragraph", "Paragraph")
                        .WithMany()
                        .HasForeignKey("ParagraphId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ArticleSession");

                    b.Navigation("Paragraph");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Question", b =>
                {
                    b.HasOne("SpeedReaderAPI.Entities.Paragraph", "Paragraph")
                        .WithMany("Questions")
                        .HasForeignKey("ParagraphId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SpeedReaderAPI.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Paragraph");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Article", b =>
                {
                    b.Navigation("Paragraphs");
                });

            modelBuilder.Entity("SpeedReaderAPI.Entities.Paragraph", b =>
                {
                    b.Navigation("Questions");
                });
#pragma warning restore 612, 618
        }
    }
}
