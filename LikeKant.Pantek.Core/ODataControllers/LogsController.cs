using LikeKant.Pantek.Core.Entities;
using LikeKant.Pantek.Core.Services;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.ODataControllers
{
    [Authorize]
    public class LogsController: ODataController
    {
        private readonly ILogService _service;
        public LogsController(ILogService service)
        {
            _service = service;
        }

        [EnableQuery]
        public IEnumerable<Log> Get()
        {
            return _service.GetAll();
        }

        [EnableQuery]
        public IActionResult Get(int key)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var log = _service.GetAll().First(t => t.Id == key);
            if (log == null)
            {
                return NotFound();
            }
            return Ok(log);
        }
    }
}
