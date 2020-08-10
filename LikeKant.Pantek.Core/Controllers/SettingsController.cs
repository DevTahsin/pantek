using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using System;
using SixLabors.ImageSharp;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using SixLabors.ImageSharp.Processing;
using LikeKant.Pantek.Core.Models.Front;
using LikeKant.Pantek.Core.Helpers;

namespace LikeKant.Pantek.Core.Controllers
{
    [Route("[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private DataContext _db;
        public SettingsController(IWebHostEnvironment env, DataContext db)
        {
            _db = db;
            _env = env;
        }
        [HttpPost, Authorize, DisableRequestSizeLimit, Route("logo")]
        public IActionResult Upload([FromForm] IFormFile file)
        {
            try
            {
                var pathToSave = Path.Combine(_env.WebRootPath, "assets", "logo");
                if (!Directory.Exists(pathToSave))
                    Directory.CreateDirectory(pathToSave);
                System.IO.DirectoryInfo di = new DirectoryInfo(pathToSave);
                foreach (FileInfo fil in di.GetFiles())
                {
                    fil.Delete();
                }
                if (file.Length > 0)
                {
                    var fileName = "logo" + Path.GetExtension(file.FileName);
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine("assets", "logo", fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    using (Image image = Image.Load(fullPath))
                    {
                        image.Mutate(x => x
                             .Resize(256, 256));
                        using (var stream = new FileStream(Path.Combine(pathToSave, "logo-256x256.png"), FileMode.Create))
                        {
                            image.SaveAsPng(stream);
                        }
                        image.Mutate(x => x
                             .Resize(128, 128));
                        using (var stream = new FileStream(Path.Combine(pathToSave, "logo-128x128.png"), FileMode.Create))
                        {
                            image.SaveAsPng(stream);
                        }
                        image.Mutate(x => x
                             .Resize(64, 64));
                        using (var stream = new FileStream(Path.Combine(pathToSave, "logo-64x64.png"), FileMode.Create))
                        {
                            image.SaveAsPng(stream);
                        }
                        image.Mutate(x => x
                             .Resize(32, 32));
                        using (var stream = new FileStream(Path.Combine(pathToSave, "logo-32x32.png"), FileMode.Create))
                        {
                            image.SaveAsPng(stream);
                        }
                    }

                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Sunucu da bir hata gerçekleşti, {ex.Message}");
            }
        }

        [HttpPost, Authorize, DisableRequestSizeLimit, Route("language")]
        public async Task<IActionResult> LanguageJSON([FromBody] SettingsPost model)
        {
            var entity = await _db.Languages.FindAsync(model.languageId);
            var pathToSave = Path.Combine(_env.WebRootPath, "assets", "i18n", entity.Code+".json");
            try
            {
                System.IO.File.WriteAllText(pathToSave, model.json);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Sunucu da bir hata gerçekleşti, {ex.Message}");
            }
        }
    }

}
