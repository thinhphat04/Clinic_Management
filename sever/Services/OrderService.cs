using Microsoft.EntityFrameworkCore;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Services
{
    public class OrderService : IOrderRepo
    {
        private readonly DatabaseContext db;

        public OrderService(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<Order> addOrder(Order order)
        {
            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    var listCart = await db.Carts.Where(c => c.user_id == order.user_id).ToListAsync();
                    order.OrderDetails = new List<OrderDetail>();
                    foreach (var cart in listCart)
                    {
                        OrderDetail details = new OrderDetail();
                        details.product_id = cart.product_id;
                        details.product_quantity = cart.product_quantity;
                        order.OrderDetails.Add(details);
                    }
                    db.Orders.Add(order);

                    foreach (var cart in listCart)
                    {
                        db.Carts.Remove(cart);
                    }
                    await db.SaveChangesAsync();
                    transaction.Commit();
                    return order;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return null;
                }
            }
        }

        public async Task<PagedList<Order>> getAll(int pageNumber, int pageSize)
        {
            var query = db.Orders.Include(o => o.OrderDetails)
                .Include(o => o.User) // Include User in the query
                .AsQueryable();
            var orders = await PagedList<Order>.ToPagedList(query, pageNumber, pageSize);
            return orders;
        }

        // public async Task<ActionResult<Order>> updateOrderStatus(int id, string order_status)
        // {
        //     var order = await db.Orders.FindAsync(id);
        //     if (order == null)
        //     {
        //         return null;
        //     }
        //
        //     order.order_status = order_status;
        //     await db.SaveChangesAsync();
        //
        //     return order;
        // }

        public async Task<Order> GetOrderByPhoneAndCode(string phone, string code)
        {
            return await db.Orders
                .Include(o => o.OrderDetails) // Include OrderDetails in the query
                .FirstOrDefaultAsync(o => o.order_phone == phone && o.order_code == code);
        }

       
        
        
    public async Task<Order> OrderDetails(int orderId)
        {
            return await db.Orders.Include(od => od.OrderDetails).ThenInclude(od => od.Product).SingleOrDefaultAsync(c => c.order_id == orderId);
        }
    
    
    public async Task<List<Order>> GetOrdersByUserId(string userId)
        {
            return await db.Orders
                .Where(o => o.user_id == userId)
                .Include(o => o.User)
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
                .ToListAsync();
        }
    
    //mail service 
        public void SendOrderConfirmationEmail(string toEmail, Order order)
        {
            var fromAddress = new MailAddress("your-email@example.com", "Your Name");
            var toAddress = new MailAddress(toEmail);
            const string fromPassword = "your-email-password";
            string subject = "Order Confirmation";
            string body = $"Thank you for your order. Your order id is {order.order_id} and total amount is {order.order_total}.";

            var smtp = new SmtpClient
            {
                Host = "smtp.example.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };

            using (var message = new MailMessage(fromAddress, toAddress)
                   {
                       Subject = subject,
                       Body = body
                   })
            {
                smtp.Send(message);
            }
        }
}
}