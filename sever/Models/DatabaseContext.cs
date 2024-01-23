using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PJ_SEM03.Models;
using System.Data;
using System.Reflection.Emit;

namespace PJ_SEM03.Models;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Education> Education { get; set; } // Change DbSet name from Edu to Education
    public DbSet<Scientific> Scientific { get; set; }
    public DbSet<Medical> Medical { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Order>()
             .HasOne(o => o.User)
             .WithMany(u => u.Orders)
             .HasForeignKey(o => o.user_id);
        
        // modelBuilder.Entity<Product>()
        //     .ToTable("Products");
        //
        // modelBuilder.Entity<Education>()
        //     .ToTable("Educations");
        //
        // modelBuilder.Entity<Medical>()
        //     .ToTable("Medicals");
        //
        // modelBuilder.Entity<Scientific>()
        //     .ToTable("Scientifics");

        modelBuilder.Entity<OrderDetail>()
                             .HasOne(od => od.Order)
                             .WithMany(o => o.OrderDetails)
                             .HasForeignKey(od => od.order_id);

        modelBuilder.Entity<OrderDetail>()
                     .HasOne(od => od.Product)
                     .WithMany(p => p.OrderDetails)
                     .HasForeignKey(od => od.product_id);

        modelBuilder.Entity<Cart>()
                     .HasOne(c => c.User)
                     .WithMany(u => u.Carts)
                     .HasForeignKey(c => c.user_id);

        modelBuilder.Entity<Cart>()
                     .HasOne(c => c.Product)
                     .WithMany()
                     .HasForeignKey(c => c.product_id);
        modelBuilder.Entity<Feedback>(f =>
        {
            f.HasOne(f => f.User)
             .WithMany(u => u.Feedbacks)
             .HasForeignKey(f => f.user_id);

            f.HasOne(f => f.Product)
                      .WithMany(p => p.Feedbacks)
                      .HasForeignKey(f => f.product_id);

        });

        modelBuilder.Entity<User>().HasData(new User[]
        {
            new User
            {
                Id = "1",
                UserName = "admin",
                 Email = "admin@test.com",
                Role = "Admin"
            },
             new User
            {
                Id = "2",
                UserName = "admin",
                 Email = "admin@test.com",
                Role = "Admin"
            }

        }); 

        // modelBuilder.Entity<Education>().HasData(new Education[]
        // {
        //     new Education { edu_id = 1,  edu_teacher = "Adam", edu_description = "Description1", edu_subject = "Learn MEDICAL Vocabulary in English\n", product_type = "Education" },
        //     new Education { edu_id = 2, edu_teacher = "Adam", edu_description = "Description2", edu_subject = "Learn English Grammar: How to use SO & SO THAT\n", product_type = "Education" }
        // });

        modelBuilder.Entity<Cart>().HasData(new Cart[]
        {
                 new Cart
                 {
                     cart_id = 1,
                     product_id = 1,
                     product_quantity = 2,
                     user_id = "1"
                 },
                 new Cart
                 {
                     cart_id = 2,
                     product_id = 2,
                     product_quantity = 1,
                     user_id = "1"
                 },
                 new Cart
                 {
                     cart_id = 3,
                     product_id = 3,
                     product_quantity = 3,
                     user_id = "1"
                 }
        });

        modelBuilder.Entity<Order>().HasData(
            new Order[]
            {
                new Order
                     {
                         order_id = 1,
                         order_code = "ORD123",
                         user_id = "2",
                         order_datetime = DateTime.Now,
                         order_status = "Processing",
                         order_address = "123 Street, City, Country",
                         order_phone = "1234567890",
                         order_total = 100
                     },
                new Order
                     {
                         order_id = 2,
                         order_code = "ORD456",
                         user_id = "2",
                         order_datetime = DateTime.Now,
                         order_status = "Delivered",
                         order_address = "456 Avenue, City, Country",
                         order_phone = "0987654321",
                         order_total = 200
                     }
        });

        //modelBuilder.Entity<IdentityRole>().HasData(
        //    new IdentityRole { Name = "User", NormalizedName = "USER" },
        //    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" 
        //});

        modelBuilder.Entity<Feedback>().HasData(new Feedback[] {
                 new Feedback
                 {
                     feedback_id = 1,
                     user_id = "2",
                     product_id =1,
                     feedback_description = "Good Service",
                     feedback_rating = 5,
                 },
                  new Feedback
                 {
                     user_id = "2",
                     feedback_id = 2,
                     product_id =3,
                     feedback_description = "Great",
                     feedback_rating = 5,
                 },
                  new Feedback
                 {
                     feedback_id = 3,
                     user_id="2",
                     product_id =5,
                     feedback_description = "Good product!",
                     feedback_rating = 5,
                 },
             });

        modelBuilder.Entity<Product>().HasData(new Product[]
            {
                new Product
                 {
                     product_id = 1,
                     product_name = "Costar Evening Primrose Oil",
                     product_description = "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills",
                     product_img = "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg",
                     product_type = "Medical",
                     product_quantity = 10,
                     product_price = 90

                 },
                 new Product
                 {
                     product_id = 2,
                     product_name = "Bresser Science ETD-201",
                     product_price = 100,
                     product_description = "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.",
                     product_img = "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg",
                     product_type = "Scientific",
                     product_quantity = 10
                 },
                 new Product
                 {
                     product_id = 3,
                     product_name = "Course 2",
                     product_price = 30,
                     product_description = "Description1",
                     product_img = "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg",
                     product_type = "Education",
                     product_quantity = 10
                 },
                    new Product
                    {
                        product_id = 4,
                        product_name = "Acetylcystein",
                        product_description = "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills",
                        product_img = "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg",
                        product_type = "Medical",
                        product_quantity = 10,
                        product_price = 90

                    },
                 new Product
                 {
                     product_id = 5,
                     product_name = "Adapter (LEN)",
                     product_price = 100,
                     product_description = "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.",
                     product_img = "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg",
                     product_type = "Scientific",
                     product_quantity = 10
                 },
                 new Product
                 {
                    
                     product_id = 6,
                     product_name = "Course 1",
                     product_price = 30,
                     product_description = "Description1",
                     product_img = "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg",
                     product_type = "Education",
                     product_quantity = 10
                 },
        });
    }
}