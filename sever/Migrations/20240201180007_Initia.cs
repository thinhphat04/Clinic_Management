using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PJ_SEM03.Migrations
{
    /// <inheritdoc />
    public partial class Initia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "user_fullName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "user_address",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bd4dc158-90f5-4547-808b-b2fb829a1307", "AQAAAAIAAYagAAAAEMCtmexDCZVVX3guScM+MJqA2t2G/CHo9XCYR/CW0uw65AlZu7w/jdTr5NcA4m3JpQ==", "1422094e-4046-490c-8eee-2c22a770e769" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0a4ae7a1-6399-480d-bb16-800dc72f3a44", "AQAAAAIAAYagAAAAEFM23vKyPNGWDWmF7l8of5hBfonuMbXSVD2pwNLE4fsk7NcsSFR09NNOqNxxx2ZoHQ==", "c333a66f-7e39-4398-9742-2365811d955e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cf1c6d81-c57e-4f25-889d-1533a7abdae1", "AQAAAAIAAYagAAAAEHpwIskDtE+UZEZXkWS8FahS0+wq0a59+sNgd3X/Rzq9evIvqPF2j0HvhY/RZ2sd1A==", "64c6651f-8521-465e-9fb3-608d15b3a250" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "99097125-1c30-4d2c-880b-c20d30ae9b4c", "AQAAAAIAAYagAAAAEE3KXMsDzkdvj+OCEg1i9OosZtxGrxZut//l/Bpe/AKe9R2eqxC+VQ7aAqEej9ULLw==", "b89c842f-124e-46c2-91af-b275d5a6bb9f" });

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 1,
                column: "order_datetime",
                value: new DateTime(2024, 2, 2, 1, 0, 6, 648, DateTimeKind.Local).AddTicks(299));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 2,
                column: "order_datetime",
                value: new DateTime(2024, 2, 2, 1, 0, 6, 648, DateTimeKind.Local).AddTicks(313));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "user_fullName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "user_address",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f0abff92-83ea-409e-9a3d-a06d56df7737", "AQAAAAIAAYagAAAAEA90qqzpvzqySKmRw7uCFvsxTGh8MN04q9iX55IPeRLd8Tq6mbqe62rhHHtejuRdpQ==", "d1a4c737-cc75-4f3d-8057-a05da69e45b5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e530c0fe-c7d7-455d-a4fd-3492b61befa2", "AQAAAAIAAYagAAAAEAFhYkphoeuTLiNw8aqSiudnBHzkM8DROxa45IAYtkbBZbD17rHzFTGTRIG3/R0sDw==", "7f4c0a5e-6a4e-4ea6-bec5-8a2793fa99e8" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a5fadb24-c97b-407c-a322-8604c1069f8c", "AQAAAAIAAYagAAAAEPyBfZJ/eR1vdlnb7hXaT0R8ku8CKSWCEeTEIC3VPDGUvCyXOIVh+pdL7uHKgufCTg==", "4cbfc942-2f9c-4b82-b67d-e0ca18b64abe" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "185d2913-f887-43b5-8fa7-de5956118fa4", "AQAAAAIAAYagAAAAEDrOai+y08pNlR5TUf3qm9Xf+Hw+5Uu/4+zDbIh+nPfSgPRhN83ssX2BI1i7/JYg5A==", "b5caa277-d98a-4e73-9851-274f267ce4dc" });

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 1,
                column: "order_datetime",
                value: new DateTime(2024, 2, 2, 0, 14, 13, 628, DateTimeKind.Local).AddTicks(8850));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 2,
                column: "order_datetime",
                value: new DateTime(2024, 2, 2, 0, 14, 13, 628, DateTimeKind.Local).AddTicks(8865));
        }
    }
}
