using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Constants;
using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }
        //DbSet is used for getting data from the database
        public DbSet<Article> Article { get; set; }
        public DbSet<Paragraph> Paragraph { get; set; }
        public DbSet<Question> Question { get; set; }

        public DbSet<ValidationSettings> ValidationSettings { get; set; }

        public DbSet<Category> Category { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Article>()
           .HasMany(a => a.Paragraphs)
           .WithOne(p => p.Article)
           .HasForeignKey(p => p.ArticleId);

            modelBuilder.Entity<Paragraph>()
            .HasMany(p => p.Questions)
            .WithOne(q => q.Paragraph)
            .HasForeignKey(q => q.ParagraphId);

            modelBuilder.Entity<ValidationSettings>().HasData(
                new ValidationSettings
                {
                    Id = 1,  // Set a non-zero Id value for seeding
                    MaxTitleLength = ValidationConstants.MaxTitleLength,
                    MinTitleLength = ValidationConstants.MinTitleLength,
                    MaxQuestionTextLength = ValidationConstants.MaxQuestionTextLength,
                    MinQuestionTextLength = ValidationConstants.MinQuestionTextLength,
                    MaxAnswerChoiceLength = ValidationConstants.MaxAnswerChoiceLength,
                    MinAnswerChoicesCount = ValidationConstants.MinAnswerChoicesCount,
                    MaxParagraphLength = ValidationConstants.MaxParagraphLength,
                    MinParagraphLength = ValidationConstants.MinParagraphLength
                }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
