<<<<<<<< HEAD:sever/Migrations/20240131154445_InittialCreate.cs
﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PJ_SEM03.Migrations
{
    /// <inheritdoc />
    public partial class InittialCreate : Migration
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
                    user_fullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_address = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GiftCodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    giftName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Describe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    percentReduce = table.Column<int>(type: "int", nullable: false),
                    ApplyFor = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiftCodes", x => x.Id);
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
                    order_total = table.Column<int>(type: "int", nullable: false),
                    AppliedGiftCodeId = table.Column<int>(type: "int", nullable: true)
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
                    table.ForeignKey(
                        name: "FK_Orders_GiftCodes_AppliedGiftCodeId",
                        column: x => x.AppliedGiftCodeId,
                        principalTable: "GiftCodes",
                        principalColumn: "Id");
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
                    product_price = table.Column<int>(type: "int", nullable: false),
                    product_percent = table.Column<int>(type: "int", nullable: false),
                    product_star = table.Column<int>(type: "int", nullable: false),
                    GiftCodeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.product_id);
                    table.ForeignKey(
                        name: "FK_Products_GiftCodes_GiftCodeId",
                        column: x => x.GiftCodeId,
                        principalTable: "GiftCodes",
                        principalColumn: "Id");
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
                name: "OrderDetails",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    product_quantity = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Role", "SecurityStamp", "TwoFactorEnabled", "UserName", "user_address", "user_fullName" },
                values: new object[,]
                {
                    { "1", 0, "275d806f-bb8e-447c-bb5b-b4edc55a6309", "admin@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEODtXxk0lGRTtxKJDOAtphY1EKla+8/LDoDCLX0t8rgGbRO+hlDNQnKwnfNlLdhJxQ==", null, false, "Admin", "92073215-3d90-4e45-af46-3b91cfcc4f9f", false, "admin", "Ho Chi Minh", "admin" },
                    { "2", 0, "fece3469-0fdb-4700-a3f3-7fcd69960c13", "phat@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEHkKYwYTuqLiN9IUJf/CSoVoggHMKMC5xRYB2Rb/azj9YQWUIVE3Vc7V+b+/MAiJyw==", null, false, "Member", "1e4c2447-1396-45b0-9f55-6e650017b9c6", false, "phat", "Quan 2, HCM", "Ngo Thinh Phat" },
                    { "3", 0, "e3935d11-be79-4872-8eb2-30c0ecbf02ef", "khai@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEACmCW4y9wrhCV53vhzpbd7qgpXw0ZQGtDDIE/Y5LW+WXPZBqy5X4RdxUpODJHdqbg==", null, false, "Member", "570a14df-c49a-4c65-a3cd-ddaa986f1f58", false, "khai", "Tan Binh, HCM", "Bui Tuan Khai" },
                    { "4", 0, "8dded735-d1e2-4209-a349-b38fd0ef8fdf", "tram@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEEEOsL/bqkQUPVtVeUduk4kdT1ZL6zA4uIXB+taL78/apnSC1TjxP8eJ2sjpz6S6tA==", null, false, "Member", "ab8802cd-4258-4e08-9905-e6ff4831170e", false, "tram", "Thu Duc, HCM", "Tran Bao Huyen Tram" }
                });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Content", "Email", "Fullname", "Type" },
                values: new object[,]
                {
                    { 1, "So easy to register and login! Like it", "khai@gmail.com", "Bui Tuan Khai", "Account" },
                    { 2, "I love promotion of this month", "trung@gmail.com", "Nguyen Thanh Trung", "Promotion" },
                    { 3, "The system run smoothly", "phat@gmail.com", "Ngo Thinh Phat", "System" },
                    { 4, "The staffs are so friendly", "tram@gmail.com", "Tran Bao Huyen Tram", "Other" }
                });

            migrationBuilder.InsertData(
                table: "GiftCodes",
                columns: new[] { "Id", "ApplyFor", "Describe", "giftName", "percentReduce" },
                values: new object[,]
                {
                    { 1, "Medical, Education, Scientific", "Reduce 5%", "Welcome", 5 },
                    { 2, "Medical, Education, Scientific", "Reduce 10%", "Goodbye", 10 }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "product_id", "GiftCodeId", "product_description", "product_img", "product_name", "product_percent", "product_price", "product_quantity", "product_star", "product_type" },
                values: new object[,]
                {
                    { 1, null, "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills", "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17315_1.jpg", "Costar Evening Primrose Oil", 10, 90, 10, 5, "Medical" },
                    { 2, null, "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.", "https://maykhoahoc.com/images/thumbnails/550/450/detailed/4/tu-bao-quan-thuoc-duoc-lieu-vacxin-haier-hbc-260-gia-re.jpg", "Bresser Science ETD-201", 20, 100, 10, 4, "Scientific" },
                    { 3, null, "Description1", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Course 2", 10, 30, 10, 5, "Education" },
                    { 4, null, "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills", "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17480_1.jpg", "Acetylcystein", 50, 90, 10, 5, "Medical" },
                    { 5, null, "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.", "https://maykhoahoc.com/images/thumbnails/550/450/detailed/4/tu-bao-quan-vacxine-thuoc-haier-hbc-150-gia-re.png", "Adapter (LEN)", 15, 100, 10, 4, "Scientific" },
                    { 6, null, "Description1", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Course 1", 0, 30, 10, 0, "Education" }
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
                table: "Orders",
                columns: new[] { "order_id", "AppliedGiftCodeId", "order_address", "order_code", "order_datetime", "order_phone", "order_status", "order_total", "user_id" },
                values: new object[,]
                {
                    { 1, null, "HCM", "ORD001", new DateTime(2024, 1, 31, 22, 44, 44, 585, DateTimeKind.Local).AddTicks(1147), "123", "Processing", 100, "1" },
                    { 2, null, "Ca Mau", "ORD001", new DateTime(2024, 1, 31, 22, 44, 44, 585, DateTimeKind.Local).AddTicks(1163), "124", "Delivered", 200, "2" }
                });

            migrationBuilder.InsertData(
                table: "OrderDetails",
                columns: new[] { "order_id", "product_id", "product_quantity" },
                values: new object[,]
                {
                    { 1, 1, 2 },
                    { 2, 2, 4 },
                    { 1, 3, 3 },
                    { 2, 4, 1 }
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
                name: "IX_OrderDetails_order_id",
                table: "OrderDetails",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AppliedGiftCodeId",
                table: "Orders",
                column: "AppliedGiftCodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_user_id",
                table: "Orders",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_GiftCodeId",
                table: "Products",
                column: "GiftCodeId");
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
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Educations");

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

            migrationBuilder.DropTable(
                name: "GiftCodes");
        }
    }
}
========
﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PJ_SEM03.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                    user_fullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_address = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GiftCodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    giftName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Describe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    percentReduce = table.Column<int>(type: "int", nullable: false),
                    ApplyFor = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiftCodes", x => x.Id);
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
                    order_total = table.Column<int>(type: "int", nullable: false),
                    AppliedGiftCodeId = table.Column<int>(type: "int", nullable: true)
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
                    table.ForeignKey(
                        name: "FK_Orders_GiftCodes_AppliedGiftCodeId",
                        column: x => x.AppliedGiftCodeId,
                        principalTable: "GiftCodes",
                        principalColumn: "Id");
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
                    product_price = table.Column<int>(type: "int", nullable: false),
                    product_percent = table.Column<int>(type: "int", nullable: false),
                    product_star = table.Column<int>(type: "int", nullable: false),
                    GiftCodeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.product_id);
                    table.ForeignKey(
                        name: "FK_Products_GiftCodes_GiftCodeId",
                        column: x => x.GiftCodeId,
                        principalTable: "GiftCodes",
                        principalColumn: "Id");
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
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "OrderDetails",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    product_quantity = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Role", "SecurityStamp", "TwoFactorEnabled", "UserName", "user_address", "user_fullName" },
                values: new object[,]
                {
                    { "1", 0, "f388d2b5-9ea2-4f4c-ba7d-f47771358fd5", "admin@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAELbaMZtFvTa00KmlTAPXQ6ZyihKoI9nK/Cf+Vl7VtDpQ6OjObkogOjHcs9AuVre8Kg==", null, false, "Admin", "62fd5986-467a-4797-8121-86f70c26225b", false, "admin", "Ho Chi Minh", "admin" },
                    { "2", 0, "91798d8a-fc43-4179-8cb9-277895bd6520", "phat@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEOATCcF1M5AVisfto0iYhNA+mcDvnUuoaV0lfPcgYzl3CFn2RrRAgi8gvz8gZTLnAA==", null, false, "Member", "9ad62055-f0a5-4c52-b071-0b2879a496d8", false, "phat", "Quan 2, HCM", "Ngo Thinh Phat" },
                    { "3", 0, "da0f9cea-df6d-4346-8f55-dce706a7e57d", "khai@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAENcV0Z/2l5HjwekVBNbtxy4T7GFwCvjlDMzrhZ1bo7Bl8MJ6Fs5MOhjMmPecCyzBLA==", null, false, "Member", "de5bee2a-f6de-4bfd-bcde-994123c52e27", false, "khai", "Tan Binh, HCM", "Bui Tuan Khai" },
                    { "4", 0, "df890361-8878-44b8-8bd5-97bf26edacd8", "tram@test.com", false, false, null, null, null, "AQAAAAIAAYagAAAAENnx4cC802XKVaCTi/xfvItdkp1FQPG887iYgEX6vagpW8kkxAKBgZ64GJo+mFArqw==", null, false, "Member", "1cded641-5216-45f6-b888-a1ad35a24b1b", false, "tram", "Thu Duc, HCM", "Tran Bao Huyen Tram" }
                });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Content", "Email", "Fullname", "Type" },
                values: new object[,]
                {
                    { 1, "So easy to register and login! Like it", "khai@gmail.com", "Bui Tuan Khai", "Account" },
                    { 2, "I love promotion of this month", "trung@gmail.com", "Nguyen Thanh Trung", "Promotion" },
                    { 3, "The system run smoothly", "phat@gmail.com", "Ngo Thinh Phat", "System" },
                    { 4, "The staffs are so friendly", "tram@gmail.com", "Tran Bao Huyen Tram", "Other" }
                });

            migrationBuilder.InsertData(
                table: "GiftCodes",
                columns: new[] { "Id", "ApplyFor", "Describe", "giftName", "percentReduce" },
                values: new object[,]
                {
                    { 1, "Medical, Education, Scientific", "Reduce 5%", "Welcome", 5 },
                    { 2, "Medical, Education, Scientific", "Reduce 10%", "Goodbye", 10 }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "product_id", "GiftCodeId", "product_description", "product_img", "product_name", "product_percent", "product_price", "product_quantity", "product_star", "product_type" },
                values: new object[,]
                {
                    { 1, null, "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills", "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17315_1.jpg", "Costar Evening Primrose Oil", 10, 90, 10, 5, "Medical" },
                    { 2, null, "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.", "https://maykhoahoc.com/images/thumbnails/550/450/detailed/4/tu-bao-quan-thuoc-duoc-lieu-vacxin-haier-hbc-260-gia-re.jpg", "Bresser Science ETD-201", 20, 100, 10, 4, "Scientific" },
                    { 3, null, "Description1", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Course 2", 10, 30, 10, 5, "Education" },
                    { 4, null, "What is Costar Evening Primrose Oil? Uses and correct usage\nCostar Evening Primrose Oil is a health care product extracted from evening primrose essential oil. Supports anti-oxidation and reduces symptoms of hot flashes in postmenopausal and premenopausal women. This article will introduce more information about the ingredients, uses, usage and intended users of Costar pills", "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17480_1.jpg", "Acetylcystein", 50, 90, 10, 5, "Medical" },
                    { 5, null, "The Bresser Science ETD-201 is a high-quality stereo microscope with transmitted and incident light. It is ideally suited for use in schools and universities as well as for the training of apprentices and in the field of electronics. The 360° rotatable binocular head allows comfortable viewing for both left and right-handed users. The magnification range of 20x to 80x can be extended with the included Barlow lens to 40x to 160x. The LED lighting is continuously dimmable and can be operated with batteries or the included power supply. The microscope is equipped with a 2x and 4x objective and a pair of 10x wide field eyepieces. The interpupillary distance and diopter adjustment are individually adjustable. The microscope is supplied with a dust cover and 5 prepared slides.", "https://maykhoahoc.com/images/thumbnails/550/450/detailed/4/tu-bao-quan-vacxine-thuoc-haier-hbc-150-gia-re.png", "Adapter (LEN)", 15, 100, 10, 4, "Scientific" },
                    { 6, null, "Description1", "https://www.bresser.de/out/pictures/generated/product/1/380_340_75/8851000_1.jpg", "Course 1", 0, 30, 10, 0, "Education" }
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
                columns: new[] { "order_id", "AppliedGiftCodeId", "order_address", "order_code", "order_datetime", "order_phone", "order_status", "order_total", "user_id" },
                values: new object[,]
                {
                    { 1, null, "HCM", "ORD001", new DateTime(2024, 2, 1, 1, 36, 39, 909, DateTimeKind.Local).AddTicks(7595), "123", "Processing", 100, "1" },
                    { 2, null, "Ca Mau", "ORD001", new DateTime(2024, 2, 1, 1, 36, 39, 909, DateTimeKind.Local).AddTicks(7609), "124", "Delivered", 200, "2" }
                });

            migrationBuilder.InsertData(
                table: "OrderDetails",
                columns: new[] { "order_id", "product_id", "product_quantity" },
                values: new object[,]
                {
                    { 1, 1, 2 },
                    { 2, 2, 4 },
                    { 1, 3, 3 },
                    { 2, 4, 1 }
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
                name: "IX_Orders_AppliedGiftCodeId",
                table: "Orders",
                column: "AppliedGiftCodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_user_id",
                table: "Orders",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Products_GiftCodeId",
                table: "Products",
                column: "GiftCodeId");
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
                name: "Contacts");

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

            migrationBuilder.DropTable(
                name: "GiftCodes");
        }
    }
}
>>>>>>>> a3592d1a6290c4db2dd2ace313b46d342a7f228f:sever/Migrations/20240131164142_1.cs