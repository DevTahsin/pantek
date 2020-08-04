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
    public interface ILogService
    {

        Task<Log> Insert(string message, Entities.LogType logType, Entities.LogStatus logStatus, HttpContext context);
        IEnumerable<Log> GetAll();
        Log GetBy(object filter);
    }

    public class LogService : ILogService
    {
        private DataContext _context;

        public LogService(DataContext context)
        {
            _context = context;
        }


        public async Task<Log> Insert(string message, Entities.LogType logType, Entities.LogStatus logStatus, HttpContext context)
        {
            var result = new Log();
            result = new Entities.Log
            {
                IP = context.Connection.RemoteIpAddress.ToString(),
                LogTime = DateTime.Now,
                Message = message,
                Status = Entities.LogStatus.Process,
                HttpRequestBody = await new StreamReader(context.Request.Body).ReadToEndAsync(),
                HTTPRequestHeaders = context.Request.Headers.ToString(),
                Type = Entities.LogType.Login

            };
            //using (var reader = new StreamReader(context.Request.Body))
            //{
            //    // this won't fix your string empty problems
            //    // because exception will be thrown
            //    reader.BaseStream.Seek(0, SeekOrigin.Begin);
            //    var body = await reader.ReadToEndAsync();
            //    result = new Entities.Log
            //    {
            //        IP = context.Connection.RemoteIpAddress.ToString(),
            //        LogTime = DateTime.Now,
            //        Message = message,
            //        Status = Entities.LogStatus.Process,
            //        HttpRequestBody = body,
            //        HTTPRequestHeaders = context.Request.Headers.ToString(),
            //        Type = Entities.LogType.Login

            //    };
            //}
            this._context.Add(result);
            this._context.SaveChanges();
            return result;
        }

        IEnumerable<Log> ILogService.GetAll()
        {
            return _context.Logs;
        }

        Log ILogService.GetBy(object filter)
        {
            return _context.Logs.Find(filter);
        }

        // helper methods


    }
}
