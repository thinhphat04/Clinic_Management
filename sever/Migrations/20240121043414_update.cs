using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PJ_SEM03.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Carts",
                columns: new[] { "cart_id", "product_id", "product_quantity", "user_id" },
                values: new object[,]
                {
                    { 1, 1, 2, "2" },
                    { 2, 2, 1, "3" },
                    { 3, 3, 3, "4" }
                });

            migrationBuilder.InsertData(
                table: "Feedbacks",
                columns: new[] { "feedback_id", "feedback_description", "feedback_rating", "product_id", "user_id" },
                values: new object[,]
                {
                    { 1, "Good Service", 5, 1, "2" },
                    { 2, "Great", 5, 3, "3" },
                    { 3, "Good product!", 5, 5, "4" }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "order_id", "order_address", "order_code", "order_datetime", "order_phone", "order_status", "order_total", "user_id" },
                values: new object[,]
                {
                    { 1, "123 Street, City, Country", "ORD123", new DateTime(2024, 1, 21, 11, 34, 14, 820, DateTimeKind.Local).AddTicks(524), "1234567890", "Processing", 100, "2" },
                    { 2, "456 Avenue, City, Country", "ORD456", new DateTime(2024, 1, 21, 11, 34, 14, 820, DateTimeKind.Local).AddTicks(537), "0987654321", "Delivered", 200, "3" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Carts",
                keyColumn: "cart_id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Carts",
                keyColumn: "cart_id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Carts",
                keyColumn: "cart_id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Feedbacks",
                keyColumn: "feedback_id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Feedbacks",
                keyColumn: "feedback_id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Feedbacks",
                keyColumn: "feedback_id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 2);
        }
    }
}
