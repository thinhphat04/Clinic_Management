using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PJ_SEM03.CustomResult;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Services
{
    public class AuthService 
    {
        private readonly DatabaseContext db;

        public AuthService(DatabaseContext db)
        {
            this.db = db;
        }

       
      
    }
}
