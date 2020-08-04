using LikeKant.Pantek.Core.Entities;
using LikeKant.Pantek.Core.Helpers;
using LikeKant.Pantek.Core.Models.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Services
{
    public interface ILanguageService
    {

        IQueryable<Language> Query();
        Language Insert(Language language);
    }

    public class LanguageService : ILanguageService
    {
        private DataContext _context;

        public LanguageService(
            DataContext context)
        {
            _context = context;
        }

        public IQueryable<Language> Query()
        {
            return _context.Languages.AsQueryable();
        }

        public Language Insert(Language model)
        {
            _context.Languages.Add(model);
            _context.SaveChanges();
            return model;
        }
        // helper methods


    }
}
