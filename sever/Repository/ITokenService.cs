﻿using PJ_SEM03.Models;

namespace PJ_SEM03.Repository
{
    public interface ITokenService
    {
        Task<string> GenerateToken(User user);
    }
}
