using Microsoft.EntityFrameworkCore;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Services
{
    public class OrderService 
    {
        private readonly DatabaseContext db;

        public OrderService(DatabaseContext db)
        {
            this.db = db;
        }


       
        //public async Task<Order> addOrder(Order order)
        //{
        //    using(var transaction = db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            var listCart = await db.Carts.Where(c => c.user_id == order.user_id).ToListAsync();
        //            order.OrderDetails = new List<OrderDetail>();
        //            foreach (var cart in listCart)
        //            {
        //                OrderDetail details = new OrderDetail();
        //                details.product_id = cart.product_id;
        //                details.order_quantity = cart.product_quantity;
        //                order.OrderDetails.Add(details);
        //            }
        //            db.Orders.Add(order);

        //            foreach (var cart in listCart)
        //            {
        //                db.Carts.Remove(cart);
        //            }
        //            await db.SaveChangesAsync();
        //            transaction.Commit();
        //            return order;
        //        }
        //        catch (Exception)
        //        {
        //            transaction.Rollback();
        //            return null;
        //        }
        //    }
        //}

        public async Task<ActionResult<Order>> updateOrderStatus(int id, string status)
        {
            var order = await db.Orders.FindAsync(id);
            if (order == null)
            {
                return null;
            }

            order.order_status = status;
            await db.SaveChangesAsync();

            return order;
        }

        public async Task<Order> GetOrderByPhoneAndCode(string phone, string code)
        {
            return await db.Orders.FirstOrDefaultAsync(o => o.order_phone == phone && o.order_code == code);
        }

        public async Task<PagedList<Order>> getAll(int pageNumber, int pageSize)
        {
            var query = db.Orders.AsQueryable();
            var orders = await PagedList<Order>.ToPagedList(query, pageNumber, pageSize);
            return orders;
        }
    }
}