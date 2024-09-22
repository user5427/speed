using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.Data {
	public class SpeedreaderDbContext : DbContext{
		public SpeedreaderDbContext(DbContextOptions<SpeedreaderDbContext> options) : base(options) { 
		
		}
		public DbSet<Article> Article { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
			base.OnModelCreating(modelBuilder);
		}
	}
}
