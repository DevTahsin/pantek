using LikeKant.Pantek.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<HomePageImage> HomePageImages { get; set; }
        public DbSet<AboutPage> AboutPages { get; set; }
        public DbSet<New> News { get; set; }
        public DbSet<NewImage> NewImages { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Language>().Property(e => e.Id).HasIdentityOptions(startValue: 100);
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Password = "sa123!",
                    FirstName = "Volkan",
                    LastName = "Alacaoğlu"
                }
            );

            modelBuilder.Entity<Language>().HasData(
                new Language { Id = 1, Order = 2, Code = "en", FlagUrl = "https://www.countryflags.io/us/flat/64.png", Name = "English" },
                new Language { Id = 2, Order = 1, Code = "tr", FlagUrl = "https://www.countryflags.io/tr/flat/64.png", Name = "Turkish", IsDefault = true },
                new Language { Id = 3, Order = 3, Code = "zh-hans", FlagUrl = "https://www.countryflags.io/cn/flat/64.png", Name = "China" }
                );
        }
    }
}
