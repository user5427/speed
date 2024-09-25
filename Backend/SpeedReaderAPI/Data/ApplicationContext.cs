using Microsoft.EntityFrameworkCore;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Article>()
           .HasMany(a => a.Paragraphs)
           .WithOne(p => p.Article)
           .HasForeignKey(p => p.ArticleId)
           .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Paragraph>()
            .HasMany(p => p.Questions)
            .WithOne(q => q.Paragraph)
            .HasForeignKey(q => q.ParagraphId)
            .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
