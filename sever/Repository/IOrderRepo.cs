using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.Models;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Repository
{
    public interface IOrderRepo
    {
        
        Task<Order> addOrder(Order order);
        // Task<ActionResult<Order>> updateOrderStatus(int id, string order_status);
        Task<PagedList<Order>> getAll(int pageNumber, int pageSize);
        Task<Order> GetOrderByPhoneAndCode(string phone, string code);
        
        Task<Order> OrderDetails(int orderId);

        Task<List<Order>> GetOrdersByUserId(string userId);

    }
}