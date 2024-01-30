using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace PJ_SEM03.Models;

public class DatabaseContext : IdentityDbContext<User>
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
    public DbSet<GiftCode> GiftCodes { get; set; }
    //public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Order>()
             .HasOne(o => o.User)
             .WithMany(u => u.Orders)
             .HasForeignKey(o => o.user_id);
        
        //nối bảng edu medical scientific với product
        modelBuilder.Entity<Product>()
            .ToTable("Products");
        
        modelBuilder.Entity<Education>()
            .ToTable("Educations");
        
        modelBuilder.Entity<Medical>()
            .ToTable("Medicals");
        
        modelBuilder.Entity<Scientific>()
            .ToTable("Scientifics");
        
        // modelBuilder.Entity<OrderDetail>()
        //                      .HasOne(od => od.Order)
        //                      .WithMany(o => o.OrderDetails)
        //                      .HasForeignKey(od => od.order_id);
        //
        // modelBuilder.Entity<OrderDetail>()
        //              .HasOne(od => od.Product)
        //              .WithMany(p => p.OrderDetails)
        //              .HasForeignKey(od => od.product_id);

        //cart
        modelBuilder.Entity<Cart>(c =>
        {
            c.HasKey(c => new { c.product_id, c.user_id });
            c.HasOne(c => c.Product).WithMany(p => p.Carts).HasForeignKey(c => c.product_id);
            c.HasOne(c => c.User).WithMany(u => u.Carts).HasForeignKey(c => c.user_id);
        });
        
        //feedback
        modelBuilder.Entity<Feedback>(f =>
        {
            f.HasOne(f => f.User)
             .WithMany(u => u.Feedbacks)
             .HasForeignKey(f => f.user_id);

            f.HasOne(f => f.Product)
                      .WithMany(p => p.Feedbacks)
                      .HasForeignKey(f => f.product_id);

        });
        //giftcode
        modelBuilder.Entity<Product>()
            .HasOne(p => p.GiftCode)
            .WithMany()
            .HasForeignKey(p => p.GiftCodeId)
            .IsRequired(false); 
        //product
        modelBuilder.Entity<Product>()
            .HasMany(p => p.Feedbacks)
            .WithOne(f => f.Product)
            .HasForeignKey(f => f.product_id)
            .IsRequired(false);
        //user
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.UserName).IsUnique();
            entity.HasIndex(u => u.Email).IsUnique();
        }); 
        //order
        modelBuilder.Entity<Order>(o =>
        {
            o.HasOne(o => o.User).WithMany(u => u.Orders).HasForeignKey(o => o.user_id);
            o.HasData(new Order[]
            {
                new Order{order_id=1,order_code = "ORD001", user_id="1", order_address="HCM", order_phone="123", order_datetime=DateTime.Now, order_status="Processing", order_total=100},
                new Order{order_id=2, order_code = "ORD001", user_id="2", order_address="Ca Mau", order_phone="124", order_datetime=DateTime.Now, order_status="Delivered", order_total=200}
            });
        });
        //orderdetail
        modelBuilder.Entity<OrderDetail>(od =>
        {
            od.HasKey(od => new { od.product_id, od.order_id });
            od.HasOne(od => od.Product).WithMany(p => p.OrderDetails).HasForeignKey(od => od.product_id);
            od.HasOne(od => od.Order).WithMany(o => o.OrderDetails).HasForeignKey(od => od.order_id);
            od.HasData(new OrderDetail[]
            {
                new OrderDetail {order_id=1, product_id=1, product_quantity = 2},
                new OrderDetail {order_id=1, product_id=3, product_quantity=3},
                new OrderDetail {order_id=2, product_id=2, product_quantity=4},
                new OrderDetail {order_id=2, product_id=4, product_quantity=1}
            });
        });

   
        modelBuilder.Entity<Feedback>().HasData(
            new Feedback
            {
                feedback_id = 1,
                user_id = "2",
                product_id = 1,
                feedback_description = "Great product!",
                feedback_rating = 5
            },
            new Feedback
            {
                feedback_id = 2,
                user_id = "3",
                product_id = 2,
                feedback_description = "Not as expected.",
                feedback_rating = 3
            }
            // Add more feedbacks here
        );

        // Other model configurations...
    

        PasswordHasher<User> passwordHasher = new PasswordHasher<User>();

        modelBuilder.Entity<User>().HasData(new User[]
        {
            new User
            {
                Id = "1",
                UserName = "admin",
                Email = "admin@test.com",
                user_fullName = "admin",
                Role = "Admin",
                PasswordHash = passwordHasher.HashPassword(new User(), "Admin*123")
            },

            new User
            {
                Id = "2",
                UserName = "phat",
                Email = "phat@test.com",
                user_fullName = "Ngo Thinh Phat",
                Role = "Member",
                PasswordHash = passwordHasher.HashPassword(new User(), "Phat*123")
            },

            new User
            {
                Id = "3",
                UserName = "khai",
                Email = "khai@test.com",
                user_fullName = "Bui Tuan Khai",
                Role = "Member",
                PasswordHash = passwordHasher.HashPassword(new User(), "Khai*123")
            },

            new User
            {
                Id = "4",
                UserName = "tram",
                Email = "tram@test.com",
                user_fullName = "Tran Bao Huyen Tram",
                Role = "Member",
                PasswordHash = passwordHasher.HashPassword(new User(), "Tram*123")
            },
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
                     // cart_id = 1,
                     product_id = 1,
                     product_quantity = 2,
                     user_id = "1"
                 },
                 new Cart
                 {
                     // cart_id = 2,
                     product_id = 2,
                     product_quantity = 1,
                     user_id = "2"
                 },
                 new Cart
                 {
                     // cart_id = 3,
                     product_id = 3,
                     product_quantity = 3,
                     user_id = "3"
                 }
        });

        // modelBuilder.Entity<Order>().HasData(
        //     new Order[]
        //     {
        //         new Order
        //              {
        //                  order_id = 1,
        //                  order_code = "ORD123",
        //                  user_id = "1",
        //                  order_datetime = DateTime.Now,
        //                  order_status = "Processing",
        //                  order_address = "123 Street, City, Country",
        //                  order_phone = "1234567890",
        //                  order_total = 100
        //              },
        //         new Order
        //              {
        //                  order_id = 2,
        //                  order_code = "ORD456",
        //                  user_id = "2",
        //                  order_datetime = DateTime.Now,
        //                  order_status = "Delivered",
        //                  order_address = "456 Avenue, City, Country",
        //                  order_phone = "0987654321",
        //                  order_total = 200
        //              }
        // });

        //modelBuilder.Entity<IdentityRole>().HasData(
        //    new IdentityRole { Name = "User", NormalizedName = "USER" },
        //    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" 
        //});

        modelBuilder.Entity<Feedback>().HasData(new Feedback[] {
                 new Feedback
                 {
                     feedback_id = 1,
                     user_id = "1",
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
                     user_id="3",   
                     product_id =5,
                     feedback_description = "Good product!",
                     feedback_rating = 5,
                 },
             });

        modelBuilder.Entity<GiftCode>().HasData(new GiftCode[]
        {
            new GiftCode {Id=1, giftName = "Welcome", Describe = "Reduce 5%",percentReduce = 5, ApplyFor ="Medical, Education, Scientific"},
            new GiftCode {Id=2, giftName = "Goodbye", Describe = "Reduce 10%",percentReduce = 10, ApplyFor = "Medical, Education, Scientific"}
        });
        
        // modelBuilder.Entity<OrderDetail>().HasData(new OrderDetail[]
        // {
        //     new OrderDetail
        //     {
        //         
        //         order_id = 1,
        //         product_id = 1,
        //         order_quantity = 2,
        //         order_price = 45
        //     },
        //     new OrderDetail
        //     {
        //         order_id = 1,
        //         product_id = 2,
        //         order_quantity = 1,
        //         order_price = 10
        //     },
        //     new OrderDetail
        //     {
        //         order_id = 2,
        //         product_id = 3,
        //         order_quantity = 3,
        //         order_price = 3,           
        //     }
        //     });
        // modelBuilder.Entity<GiftCode>().HasData(new GiftCode[]
        // {
        //     new GiftCode {Id=1, giftName = "Welcome", Describe = "Reduce 5%", percentReduce = 5, ApplyFor ="Medical, Education, Scientific"},
        //     new GiftCode {Id=2, giftName = "Goodbye", Describe = "Reduce 10%", percentReduce = 10, ApplyFor = "Medical, Education, Scientific"},
        // });
        modelBuilder.Entity<Product>().HasData(new Product[]
            {
                new Product
                 {
                     product_id = 1,
                     product_name = "Costar Evening Primrose Oil",
                     product_description = "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills",
                     product_img = "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17315_1.jpg",
                     product_type = "Medical",
                     product_quantity = 10,
                     product_price = 90,
                     product_star = 5,
                     product_percent = 10
                 },
                 new Product
                 {
                     product_id = 2,
                     product_name = "Bresser Science ETD-201",
                     product_price = 100,
                     product_description = "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.",
                     product_img = "https://maykhoahoc.com/images/thumbnails/550/450/detailed/4/tu-bao-quan-thuoc-duoc-lieu-vacxin-haier-hbc-260-gia-re.jpg",
                     product_type = "Scientific",
                     product_quantity = 10,
                     product_star = 4,
                        product_percent = 20
                 },
                 new Product
                 {
                     product_id = 3,
                     product_name = "Course 2",
                     product_price = 30,
                     product_description = "Description1",
                     product_img = "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg",
                     product_type = "Education",
                     product_quantity = 10,
                     product_star = 5,
                     product_percent = 10
                 },
                    new Product
                    {
                        product_id = 4,
                        product_name = "Acetylcystein",
                        product_description = "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills",
                        product_img = "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17480_1.jpg",
                        product_type = "Medical",
                        product_quantity = 10,
                        product_price = 90,
                        product_star = 5,
                        product_percent = 50

                    },
                 new Product
                 {
                     product_id = 5,
                     product_name = "Adapter (LEN)",
                     product_price = 100,
                     product_description = "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.",
                     product_img = "https://maykhoahoc.com/images/thumbnails/550/450/detailed/4/tu-bao-quan-vacxine-thuoc-haier-hbc-150-gia-re.png",
                     product_type = "Scientific",
                     product_quantity = 10,
                        product_star = 4,
                        product_percent = 15,
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