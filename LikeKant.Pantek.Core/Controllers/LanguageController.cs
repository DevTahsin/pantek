using LikeKant.Pantek.Core.Helpers;
using LikeKant.Pantek.Core.Services;
using Microsoft.AspNetCore.Authorization;
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
    public class LanguageController: ControllerBase
    {
        private ILanguageService _service;
        public LanguageController(ILanguageService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [HttpGet("for")]
        public IActionResult Get()
        {
            return Ok(_service.Query()
                .Where(t => !t.IsDeleted)
                .Select(t => new { t.Name, t.Code, t.FlagUrl,t.Order, t.IsDefault })
                );
        }
    }
}
