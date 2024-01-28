using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PJ_SEM03.Migrations
{
    /// <inheritdoc />
    public partial class _1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    user_fullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    product_description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    product_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    product_img = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    product_quantity = table.Column<int>(type: "int", nullable: false),
                    product_price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.product_id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    order_datetime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    order_status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    order_address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    order_phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    order_total = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.order_id);
                    table.ForeignKey(
                        name: "FK_Orders_AspNetUsers_user_id",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    product_quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => new { x.product_id, x.user_id });
                    table.ForeignKey(
                        name: "FK_Carts_AspNetUsers_user_id",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Carts_Products_product_id",
                        column: x => x.product_id,
                        principalTable: "Products",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Educations",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false),
                    edu_id = table.Column<int>(type: "int", nullable: false),
                    edu_teacher = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    edu_description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    edu_subject = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Educations", x => x.product_id);
                    table.ForeignKey(
                        name: "FK_Educations_Products_product_id",
                        column: x => x.product_id,
                        principalTable: "Products",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    feedback_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    feedback_description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    feedback_rating = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.feedback_id);
                    table.ForeignKey(
                        name: "FK_Feedbacks_AspNetUsers_user_id",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Feedbacks_Products_product_id",
                        column: x => x.product_id,
                        principalTable: "Products",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Medicals",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false),
                    med_id = table.Column<int>(type: "int", nullable: false),
                    med_uses = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    med_sex = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    med_brand = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicals", x => x.product_id);
                    table.ForeignKey(
                        name: "FK_Medicals_Products_product_id",
                        column: x => x.product_id,
                        principalTable: "Products",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Scientifics",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false),
                    sci_id = table.Column<int>(type: "int", nullable: false),
                    sci_uses = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sci_brand = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scientifics", x => x.product_id);
                    table.ForeignKey(
                        name: "FK_Scientifics_Products_product_id",
                        column: x => x.product_id,
                        principalTable: "Products",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetails",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    order_quantity = table.Column<int>(type: "int", nullable: false),
                    order_price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetails", x => new { x.product_id, x.order_id });
                    table.ForeignKey(
                        name: "FK_OrderDetails_Orders_order_id",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Products_product_id",
                        column: x => x.product_id,
                        principalTable: "Products",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Role", "SecurityStamp", "TwoFactorEnabled", "UserName", "user_address", "user_fullName" },
                values: new object[,]
                {
                    { "1", 0, "edbfe0ae-bed5-47c2-8efd-78da6b6eb9ee", "admin@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEC/Gs7yWZx4wme9pK3cGwjuS/beOUBp/YFeeInS9yaKNsqmMjT4HsuB/xmmtLl6CwQ==", null, false, "Admin", "d77e7238-6d3a-4870-b7b5-363b8d8fd4b4", false, "admin", null, "admin" },
                    { "2", 0, "45666ed7-16a5-41a7-9e4f-ed21ca468a9e", "phat@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEBCuOLbh2g1+K6gQz1e3o20lry2AP7J4z2jg9ve+mlztGeS1Ogzxsf/ITFuxQ52LRQ==", null, false, "Member", "ec30e2fc-9bed-45f5-8b72-7cba613e1361", false, "phat", null, "Ngo Thinh Phat" },
                    { "3", 0, "8b37e3f3-3b5d-4a1f-987e-72c09c840a3f", "khai@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEAYXWtefqXeXvB+MxVsKj2BcUYx4Thfw1HZJvvH6xwFZ3VKIOv6SRzIOTqoQmqpXmQ==", null, false, "Member", "83d12d79-59aa-4f9b-8ea4-ba63eb252284", false, "khai", null, "Bui Tuan Khai" },
                    { "4", 0, "52e2112f-2f34-40e3-915c-16a9ce56b893", "tram@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAECPXAAzOGfoKR4rsNCW6JdQQQESegfqqqLf9gQCQAQfj5tG4KGAPKEI/qkQR/uocKQ==", null, false, "Member", "e77b1462-2d1d-4e5d-90d8-1dd2a6726c0f", false, "tram", null, "Tran Bao Huyen Tram" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "product_id", "product_description", "product_img", "product_name", "product_price", "product_quantity", "product_type" },
                values: new object[,]
                {
                    { 1, "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Costar Evening Primrose Oil", 90, 10, "Medical" },
                    { 2, "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Bresser Science ETD-201", 100, 10, "Scientific" },
                    { 3, "Description1", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Course 2", 30, 10, "Education" },
                    { 4, "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Acetylcystein", 90, 10, "Medical" },
                    { 5, "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Adapter (LEN)", 100, 10, "Scientific" },
                    { 6, "Description1", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Course 1", 30, 10, "Education" }
                });

            migrationBuilder.InsertData(
                table: "Carts",
                columns: new[] { "product_id", "user_id", "product_quantity" },
                values: new object[,]
                {
                    { 1, "1", 2 },
                    { 2, "2", 1 },
                    { 3, "3", 3 }
                });

            migrationBuilder.InsertData(
                table: "Feedbacks",
                columns: new[] { "feedback_id", "feedback_description", "feedback_rating", "product_id", "user_id" },
                values: new object[,]
                {
                    { 1, "Good Service", 5, 1, "1" },
                    { 2, "Great", 5, 3, "2" },
                    { 3, "Good product!", 5, 5, "3" }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "order_id", "order_address", "order_code", "order_datetime", "order_phone", "order_status", "order_total", "user_id" },
                values: new object[,]
                {
                    { 1, "HCM", "ORD001", new DateTime(2024, 1, 27, 21, 53, 17, 719, DateTimeKind.Local).AddTicks(2595), "123", "Processing", 100, "1" },
                    { 2, "Ca Mau", "ORD001", new DateTime(2024, 1, 27, 21, 53, 17, 719, DateTimeKind.Local).AddTicks(2622), "124", "Delivered", 200, "2" }
                });

            migrationBuilder.InsertData(
                table: "OrderDetails",
                columns: new[] { "order_id", "product_id", "order_price", "order_quantity" },
                values: new object[,]
                {
                    { 1, 1, 45, 2 },
                    { 2, 2, 100, 4 },
                    { 1, 3, 30, 3 },
                    { 2, 4, 90, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_Email",
                table: "AspNetUsers",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserName",
                table: "AspNetUsers",
                column: "UserName",
                unique: true,
                filter: "[UserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_user_id",
                table: "Carts",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_product_id",
                table: "Feedbacks",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_user_id",
                table: "Feedbacks",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_order_id",
                table: "OrderDetails",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_user_id",
                table: "Orders",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Educations");

            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "Medicals");

            migrationBuilder.DropTable(
                name: "OrderDetails");

            migrationBuilder.DropTable(
                name: "Scientifics");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
