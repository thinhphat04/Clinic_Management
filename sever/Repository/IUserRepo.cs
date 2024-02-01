using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Repository;

public interface IUserRepo
{

    //edit user info
    Task<(bool Success, object Result)> UpdateUser(UserWithImageDto user);
        Task<PagedList<User>> getAll(int pageNumber, int pageSize);
    Task<User> getUserById(string user_id);
    Task<PagedList<User>> getUserByRole(string user_Role, int pageNumber, int pageSize);
}