
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepo _orderRepo;

        public OrderController(IOrderRepo orderRepo)
        {
            this._orderRepo = orderRepo;
        }
        //
        [HttpPost]
        public async Task<IActionResult> PostOrder(Order order)
        {
            try
            {
                var newOrders = await _orderRepo.addOrder(order);
                if (newOrders != null)
                {
                    return Ok(newOrders);
                    
                }
                else
                {
                    return NotFound("Add Order Failed");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> UpdateOrderStatus(int id, string status)
        {
            return await _orderRepo.updateOrderStatus(id, status);
        }
        
        [HttpGet("search/{phone}/{code}")]
        public async Task<IActionResult> GetOrderByPhoneAndCode(string phone, string code)
        {
            var order = await _orderRepo.GetOrderByPhoneAndCode(phone, code);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }
    }
}

