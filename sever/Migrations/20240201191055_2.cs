using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PJ_SEM03.Migrations
{
    /// <inheritdoc />
    public partial class _2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "product_img",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6d575024-173b-49e4-a0ee-20f811fffb23", "AQAAAAIAAYagAAAAEH+aP7xz59IE+1+pXfkGXuolxUaPTRcrv4MyQkB/McwH6s1Oq71GeFNfrJFNZ0M9Ug==", "106995de-ffa1-4b11-bdba-47ba34d893a7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6ac5adfa-538e-415b-81c8-340b49398ed6", "AQAAAAIAAYagAAAAEMhyD9xTMOWInHRJz2Sk4zHVyZDbWKKbPOLNvt2soGHvFPBPf3tm6AIweu89MogE3g==", "2bca7330-6d13-45d8-878d-3c4520707f2b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "029dbfc1-9ed1-4a05-abf9-69a35762d012", "AQAAAAIAAYagAAAAELnIvd/MSnIUAhkO8ujXMdAaCPgxedy/nTSdcum74OrRmTkCGaHM6tDU7ceMjMWEwg==", "13744bc7-62c7-427b-88af-582ede7e7b0f" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9d451f7f-6252-4ac1-b85a-890105813de8", "AQAAAAIAAYagAAAAEJvZc9dQ0Afx7xI06CLWPLvwtbS8RSI21j1aadw7EKhNDZv6n8ifwGVl0ABiKalEoQ==", "d8a3a2e0-6264-43a2-9e77-a399f7515e08" });

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 1,
                column: "order_datetime",
                value: new DateTime(2024, 2, 2, 2, 10, 54, 686, DateTimeKind.Local).AddTicks(4326));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 2,
                column: "order_datetime",
                value: new DateTime(2024, 2, 2, 2, 10, 54, 686, DateTimeKind.Local).AddTicks(4343));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "product_img",
                table: "Products",
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
                values: new object[] { "05f1c577-7ff5-4601-a044-9c1f1f7221da", "AQAAAAIAAYagAAAAEApEokN6Ep1vNJbylyQz66wiWtgT1j7xTUvnGbdccWviY4cWfTHRpkUjSQwVGPsnJw==", "2d38c3bb-968f-4845-a345-d0d01338b1ab" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d693a376-d240-4c14-8ca8-670f8bf86036", "AQAAAAIAAYagAAAAEJ1yy0z/1xWVVa5Py0D0adoK2wr3PlcZgs65bF76AsR2KKcbaI0wlPMnLiGmcbB1FQ==", "d642af45-f6f1-4b44-a818-4a5deace19dc" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6fb74556-7e9e-4a69-ba30-195fdfaa4021", "AQAAAAIAAYagAAAAEBYyERan/GYZxyLaHTQ2LrgSC5OfvNxg1IBud5e8fKEBv1P0KuoorPJtM5hE7dix6Q==", "69623a9e-90b3-4315-bb3b-df6eb22f672c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c754423f-575a-46fc-80a5-102b9eaeb8dd", "AQAAAAIAAYagAAAAEJsTr/Gn2L0ASNYj8OaMRR089d749eKub6hDsymCQRdRhFptyW7uIt/p+1FkKKYmSA==", "77286d2f-0344-455e-a14e-b69cf33b9407" });

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 1,
                column: "order_datetime",
                value: new DateTime(2024, 2, 2, 1, 51, 27, 808, DateTimeKind.Local).AddTicks(587));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "order_id",
                keyValue: 2,
                column: "order_datetime",
                value: new DateTime(2024, 2, 2, 1, 51, 27, 808, DateTimeKind.Local).AddTicks(601));
        }
    }
}
