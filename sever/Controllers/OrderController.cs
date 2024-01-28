
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.RequestHelpers;
using PJ_SEM03.Services;

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


      
        [HttpGet]
        public async Task<ActionResult<PagedList<Order>>> GetAll([FromQuery] PaginationParams paginationParams)
        {
            try
            {
                return Ok(await _orderRepo.getAll(paginationParams.PageNumber, paginationParams.PageSize));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostOrder(Order order)
        {
            try
            {
                // Generate a random order code
                order.GenerateOrderCode();

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

        [HttpGet("details/{orderId}")]
        public async Task<IActionResult> GetOrder(int orderId)
        {
            try
            {
                var order = await _orderRepo.OrderDetails(orderId);
                if (order != null)
                {
                    return Ok(order);
                }
                else
                {
                    return BadRequest("Order Details Not Found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrdersByUserId(string userId)
        {
            try
            {
                var orders = await _orderRepo.GetOrdersByUserId(userId);
                if (orders != null)
                {
                    return Ok(orders);
                }
                else
                {
                    return BadRequest("Order Details Not Found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}

