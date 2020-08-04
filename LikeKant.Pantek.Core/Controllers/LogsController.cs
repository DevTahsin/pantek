using LikeKant.Pantek.Core.Entities;
using LikeKant.Pantek.Core.Services;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class LogsController : ControllerBase
    {
        private ILogService _Logservice;

        public LogsController(ILogService Logservice)
        {
            _Logservice = Logservice;
        }


        [HttpGet]
        public IEnumerable<Log> GetAll()
        {
            return _Logservice.GetAll();
        }
    }
}
