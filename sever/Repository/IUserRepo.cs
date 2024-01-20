using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Repository;

public interface IUserRepo
{
    Task<User> CheckLogin(UserLogin userLogin);
    
    //edit user info
  
    Task<bool> UpdateUser(User user);
    Task<PagedList<User>> getAll(int pageNumber, int pageSize);
    Task<User> getUserById(string user_id);
   
}