using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace LikeKant.Pantek.Core.Controllers
{
    [Route("[controller]")]
    public class CdnController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public CdnController(IWebHostEnvironment env)
        {
            _env = env;
        }
        [HttpPost, DisableRequestSizeLimit, Route("image")]
        public IActionResult Upload([FromForm] IFormFile file)
        {
            try
            {
                var pathToSave = Path.Combine(_env.WebRootPath, "images");

                if (file.Length > 0)
                {
                    var fileName = System.Guid.NewGuid().ToString("N").ToUpper()+""+Path.GetExtension(file.FileName);
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine("images", fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { path= dbPath.Replace("\\", "/") });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
