using System.Text;
using System.Text.Json.Serialization;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//kết nối database
builder.Services.AddDbContext<DatabaseContext>(o => {
    o.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection"));
    o.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

//Identity
builder.Services.AddIdentityCore<User>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<DatabaseContext>();

builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>options.TokenLifespan = TimeSpan.FromHours(10));

//Jwt
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});



builder.Services.AddControllers();
//khai báo các service
builder.Services.AddScoped<IUserRepo, UserService>();
// builder.Services.AddScoped<IContactRepo, ContactService>();
builder.Services.AddScoped<IProductRepo, ProductService>();
builder.Services.AddScoped<IOrderRepo, OrderService>();
builder.Services.AddScoped<ICartRepo, CartService>();
// builder.Services.AddScoped<CloudinaryService>();
builder.Services.AddScoped<IAccountRepo, AccountService>();
builder.Services.AddScoped<IGiftcode, GiftcodeService>();
builder.Services.AddScoped<ImageService>();

// // Retrieve Cloudinary settings from appsettings.json

builder.Services.Configure<Cloudinary>(builder.Configuration.GetSection("Cloudinary"));
/****************************************************************************************/
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

