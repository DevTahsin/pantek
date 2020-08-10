using LikeKant.Pantek.Core.Helpers;
using LikeKant.Pantek.Core.Models.Front;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp.Memory;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Controllers
{
    [Route("client")]
    public class FrontPagesController : ControllerBase    
    {
        private DataContext _db;
        public FrontPagesController(DataContext context)
        {
            _db = context;
        }

        #region Homepage
        [HttpPost, Authorize]
        [Route("homepage")]
        public async Task<IActionResult> HomepagePostRequest([FromBody] HomepagePost homepagePost)
        {
            if (homepagePost == null || homepagePost.images.Count == 0)
                return BadRequest();
            foreach (var item in homepagePost.images)
            {
                _db.HomePageImages.Add(new Entities.HomePageImage { ImageUrl = item.imageUrl, LanguageId = homepagePost.languageId, IsDeleted = false, Order=100 });
            }
            await _db.SaveChangesAsync();

            return Ok();
        }
        [HttpGet, Authorize]
        [Route("homepage/order")]
        public async Task<IActionResult> HomepageOrderPostRequest([FromQuery] int id, [FromQuery] int order)
        {
            var entity = await _db.HomePageImages.FindAsync(id);
            entity.Order = order;
            _db.Entry(entity).State = EntityState.Modified;
            _db.SaveChanges();
            return Ok();
        }
        [HttpGet, Authorize]
        [Route("homepage/photos")]
        public IActionResult HomepageGetRequest([FromQuery] int lang)
        {
            return Ok(_db.HomePageImages.Where(t => !t.IsDeleted && t.LanguageId == lang).OrderBy(t => t.Order).Select(t => new {
                t.ImageUrl,
                t.Id,
                t.Order
            }));
        }
        [HttpDelete, Authorize]
        [Route("homepage/photos")]
        public async Task<IActionResult> HomepageDeleteRequest([FromQuery] int id)
        {
            var entity = await _db.HomePageImages.FindAsync(id);
            entity.IsDeleted = true;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }

        [HttpGet]
        [Route("homepage")]
        public async Task<IActionResult> HomepageClientGetRequest([FromQuery] string lan)
        {
            if (string.IsNullOrEmpty(lan))
                return BadRequest();
            return Ok(_db.HomePageImages.Where(t => t.Language.Code == lan && !t.IsDeleted).OrderBy(t => t.Order).Select(t => t.ImageUrl));
        }
#endregion

        #region About

        [HttpGet]
        [Route("about")]
        public IActionResult AboutpageClientGetRequest([FromQuery] string lan)
        {
            if (string.IsNullOrEmpty(lan))
                return BadRequest();
            return Ok(_db.AboutPages.Where(t => t.Language.Code == lan).Select(t => new { html = t.Html }).FirstOrDefault());
        }

        [HttpGet, Authorize]
        [Route("about/html")]
        public IActionResult AboutpageGetRequest([FromQuery] int lang)
        {
            return Ok(_db.AboutPages.Where(t => t.LanguageId == lang).Select(t => new {html = t.Html }).FirstOrDefault());
        }
        
        [HttpPost,Authorize]
        [Route("about")]
        public async Task<IActionResult> AboutpagePostRequest([FromBody] AboutpagePost lan)
        {
            var entity = await _db.AboutPages.Where(t => t.LanguageId == lan.languageId).FirstOrDefaultAsync();
            if (entity == null)
            {
                entity = new Entities.AboutPage { LanguageId = lan.languageId, Html = lan.html };
                _db.AboutPages.Add(entity);
            }else
            {
                entity.Html = lan.html;
                _db.Entry(entity).State = EntityState.Modified;
            }
            await _db.SaveChangesAsync();
            return Ok();
        }
#endregion

        #region Categories
        [HttpGet]
        [Route("categories")]
        public IActionResult GetCategoriesForClient([FromQuery] string lan)
        {
            Regex rgx = new Regex("[^a-zA-Z0-9 -]");
            return Ok(_db.Categories.Where(t => !t.IsDeleted && t.Language.Code == lan).Select(t => new { t.Name, groups = t.Groups.Where(v=>!v.IsDeleted).Select(v=> new { image = v.ImageURL,v.Name,v.Description,link="/product-group/"+rgx.Replace(v.Name, "").Replace(' ', '-')+"-"+v.Id,products= v.Products.Where(k=>!k.IsDeleted).Select( k => new { name=k.Title, link = "/product/"+rgx.Replace(k.Title, "").Replace(' ', '-') + "-" + k.Id }) }) }));
        }

        [HttpGet, Authorize]
        [Route("categories-server")]
        public IActionResult GetCategories([FromQuery] int lang)
        {
            return Ok(_db.Categories.Where(t => !t.IsDeleted && t.LanguageId == lang).Select(t => new { t.Id, t.Name }));
        }

        [HttpPost, Authorize]
        [Route("categories")]
        public async Task<IActionResult> PostCategories([FromBody] CategoryPost model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            _db.Categories.Add(new Entities.Category { IsDeleted = false, LanguageId = model.languageId, Name = model.name });
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPut, Authorize]
        [Route("categories")]
        public async Task<IActionResult> ChangeCategory([FromBody] CategoryPut model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var entity = await _db.Categories.Where(t => t.Id == model.id).FirstOrDefaultAsync();
            entity.Name = model.name;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete, Authorize]
        [Route("categories")]
        public async Task<IActionResult> CategoryDeleteRequest([FromQuery] int id)
        {
            var entity = await _db.Categories.FindAsync(id);
            entity.IsDeleted = true;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
#endregion

        #region Groups
        [HttpGet]
        [Route("groups")]
        public IActionResult GetGroupsForClient([FromQuery] int cid)
        {
            return Ok(_db.Groups.Where(t => !t.IsDeleted && t.CategoryId == cid).Select(t => new { t.Id, t.Name, t.Description, t.ImageURL }));
        }

        [HttpGet]
        [Route("group")]
        public IActionResult GetGroupById([FromQuery] string d)
        {
            if (string.IsNullOrEmpty(d))
            {
                return BadRequest();
            }
            int id = 0;
            bool result = int.TryParse(d, out id);
            if (!result) return BadRequest();
            Regex rgx = new Regex("[^a-zA-Z0-9 -]");
            return Ok(_db.Groups.Where(x=> !x.IsDeleted && x.Id == id).Select(t => new {t.Description, t.Name, products = t.Products.Where(k => !k.IsDeleted).Select(k => new { image = k.Images.Where(a => !a.IsDeleted).Select(t => t.ImageURL).FirstOrDefault(), name = k.Title, link = "/product/" + rgx.Replace(k.Title, "").Replace(' ', '-') + "-" + k.Id }) }).FirstOrDefault());
        }

        [HttpGet, Authorize]
        [Route("groups-server")]
        public IActionResult GetGroups([FromQuery] int cid)
        {
            return Ok(_db.Groups.Where(t => !t.IsDeleted && t.CategoryId == cid).Select(t => new { t.Id, t.Name, t.Description, t.ImageURL }));
        }

        [HttpPost, Authorize]
        [Route("groups")]
        public async Task<IActionResult> PostGroups([FromBody] GroupPost model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            _db.Groups.Add(new Entities.Group { IsDeleted = false, CategoryId = model.categoryId, Name = model.name,ImageURL=model.imageUrl, Description = model.description });
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPut, Authorize]
        [Route("groups")]
        public async Task<IActionResult> ChangeGroup([FromBody] GroupPut model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var entity = await _db.Groups.Where(t => t.Id == model.id).FirstOrDefaultAsync();
            entity.Name = model.name;
            entity.Description = model.description;
            entity.ImageURL = model.imageUrl;
            entity.CategoryId = model.categoryId;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete, Authorize]
        [Route("groups")]
        public async Task<IActionResult> GroupDeleteRequest([FromQuery] int id)
        {
            var entity = await _db.Groups.FindAsync(id);
            entity.IsDeleted = true;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
        #endregion

        #region Products
        [HttpGet]
        [Route("products")]
        public IActionResult GetProductsForClient([FromQuery] int gid)
        {
            return Ok(_db.Products.Where(t => !t.IsDeleted && t.GroupId == gid).Select(t => new { t.Id, t.Title, t.InnerHTML, t.MetaDescription }));
        }

        [HttpGet, Authorize]
        [Route("products-server")]
        public IActionResult GetProducts([FromQuery] int gid)
        {
            return Ok(_db.Products.Where(t => !t.IsDeleted && t.GroupId == gid).Include(t => t.Images).Select(t => new { t.Id, t.Title, t.InnerHTML, t.MetaDescription, images=t.Images.Where(v=>!v.IsDeleted) }));
        }
        [HttpGet]
        [Route("product")]
        public IActionResult GetProductById([FromQuery] string d)
        {
            if (string.IsNullOrEmpty(d))
            {
                return BadRequest();
            }
            int id = 0;
            bool result = int.TryParse(d, out id);
            if (!result) return BadRequest();
            Regex rgx = new Regex("[^a-zA-Z0-9 -]");
            return Ok(_db.Products.Where(x => !x.IsDeleted && x.Id == id).Select(t => new { group=t.Group.Name,groupLink = "/product-group/" + rgx.Replace(t.Group.Name, "").Replace(' ', '-') + "-" + t.GroupId, header = t.Title, descriptionHtml = t.InnerHTML, metaDescription = t.MetaDescription, images = t.Images.Where(a => !a.IsDeleted).Select(t => new { link = t.ImageURL, alt = t.AltText }) }).FirstOrDefault());
        }
        [HttpPost, Authorize]
        [Route("products")]
        public async Task<IActionResult> PostProducts([FromBody] ProductPost model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            _db.Products.Add(new Entities.Product { IsDeleted = false, GroupId = model.groupId, Title = model.title, MetaDescription = model.metaDescription, InnerHTML= model.innerHTML, Images = model.images.Select(t => new Entities.ProductImage {ImageURL = t.imageURL, IsDeleted=false, AltText=t.altText }).ToList()});
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPut, Authorize]
        [Route("products")]
        public async Task<IActionResult> ChangeProduct([FromBody] ProductPut model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var entity = await _db.Products.Where(t => t.Id == model.id).Include(t=>t.Images).FirstOrDefaultAsync();
            entity.Title = model.title;
            entity.MetaDescription = model.metaDescription;
            entity.InnerHTML = model.innerHTML;
            entity.GroupId = model.groupId;
            foreach (var item in entity.Images)
            {
                foreach (var innerItem in model.images)
                {
                    if (item.Id == innerItem.id)
                    {
                        item.AltText = innerItem.altText;
                        item.ImageURL = innerItem.imageURL;
                    }
                }

            }
            foreach (var item in model.images.Where(t => t.id ==0))
            {
                entity.Images.Add(new Entities.ProductImage
                {
                    AltText = item.altText,
                    ImageURL = item.imageURL,
                    IsDeleted = false
                });
            }
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete, Authorize]
        [Route("products")]
        public async Task<IActionResult> ProductDeleteRequest([FromQuery] int id)
        {
            var entity = await _db.Products.FindAsync(id);
            entity.IsDeleted = true;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
        [HttpDelete, Authorize]
        [Route("products/image")]
        public async Task<IActionResult> ProductImageDeleteRequest([FromQuery] int id)
        {
            var entity = await _db.ProductImages.FindAsync(id);
            entity.IsDeleted = true;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
        #endregion

        #region News
        [HttpGet]
        [Route("news")]
        public IActionResult GetNewsForClient([FromQuery] string lan)
        {
            Regex rgx = new Regex("[^a-zA-Z0-9 -]");
            return Ok(_db.News.Where(t => !t.IsDeleted && t.Language.Code == lan).OrderByDescending(t=>t.Id).Select(t => new { link = "/article/" + rgx.Replace(t.Title, "").Replace(' ', '-') + "-" + t.Id, name=t.Title,description=t.MetaDescription,date=t.InsertTime,t.InsertTime,image=t.Images.Where(t => t.IsDefault&& !t.IsDeleted).Select(t => new { link = t.ImageURL, alt = t.AltText }).FirstOrDefault() }));
        }

        [HttpGet, Authorize]
        [Route("news-server")]
        public IActionResult GetNews([FromQuery] int lang)
        {
            return Ok(_db.News.Where(t => !t.IsDeleted && t.LanguageId == lang).Include(t => t.Images).Select(t => new { t.Id,t.InsertTime, t.Title, t.InnerHTML, t.MetaDescription, images= t.Images.Where(v=> !v.IsDeleted) }));
        }
        [HttpGet]
        [Route("new")]
        public IActionResult GetNewById([FromQuery] string d)
        {
            if (string.IsNullOrEmpty(d))
            {
                return BadRequest();
            }
            int id = 0;
            bool result = int.TryParse(d, out id);
            if (!result) return BadRequest();
            Regex rgx = new Regex("[^a-zA-Z0-9 -]");
            return Ok(_db.News.Where(x => !x.IsDeleted && x.Id == id).Select(t => new { header = t.Title, descriptionHtml = t.InnerHTML, metaDescription = t.MetaDescription, images = t.Images.Where(a => !a.IsDeleted).Select(t => new { link = t.ImageURL, alt = t.AltText }) }).FirstOrDefault());
        }
        [HttpPost, Authorize]
        [Route("news")]
        public async Task<IActionResult> PostNews([FromBody] NewPost model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            _db.News.Add(new Entities.New { InsertTime = DateTime.Now, IsDeleted = false, LanguageId = model.languageId, Title = model.title, MetaDescription = model.metaDescription, InnerHTML = model.innerHTML, Images = model.images.Select(t => new Entities.NewImage { ImageURL = t.imageURL, IsDefault = t.isDefault, IsDeleted = false, AltText = t.altText }).ToList() });
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPut, Authorize]
        [Route("news")]
        public async Task<IActionResult> ChangeNews([FromBody] NewPut model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var entity = await _db.News.Where(t => t.Id == model.id).Include(t => t.Images).FirstOrDefaultAsync();
            entity.Title = model.title;
            entity.MetaDescription = model.metaDescription;
            entity.InnerHTML = model.innerHTML;
            entity.LanguageId = model.languageId;
            foreach (var item in entity.Images)
            {
                foreach (var innerItem in model.images)
                {
                    if (item.Id == innerItem.id)
                    {
                        item.AltText = innerItem.altText;
                        item.IsDefault = innerItem.isDefault;
                        item.ImageURL = innerItem.imageURL;
                    }
                }

            }
            foreach (var item in model.images.Where(t => t.id == 0))
            {
                entity.Images.Add(new Entities.NewImage
                {
                    AltText = item.altText,
                    IsDefault = item.isDefault,
                    ImageURL = item.imageURL,
                    IsDeleted = false
                });
            }
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete, Authorize]
        [Route("news")]
        public async Task<IActionResult> NewDeleteRequest([FromQuery] int id)
        {
            var entity = await _db.News.FindAsync(id);
            entity.IsDeleted = true;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
        [HttpDelete, Authorize]
        [Route("news/image")]
        public async Task<IActionResult> NewImageDeleteRequest([FromQuery] int id)
        {
            var entity = await _db.NewImages.FindAsync(id);
            entity.IsDeleted = true;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
        [HttpPut, Authorize]
        [Route("news/image/default")]
        public async Task<IActionResult> NewImageIsDefaultChangeRequest([FromQuery] int id)
        {
            var entity = await _db.NewImages.FindAsync(id);
            entity.IsDefault = !entity.IsDefault;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
        #endregion

        #region Contact
        [HttpPost]
        [Route("contact")]
        public async Task<IActionResult> ContactPostRequest([FromBody] ContactPost model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            _db.ContactMessages.Add(new Entities.ContactMessage
            {
                Email = model.email,
                InsertTime = DateTime.Now,
                IPAdress = HttpContext.Connection.RemoteIpAddress.ToString(),
                IsRead = false,
                Message = model.message,
                Name = model.name,
                Phone = model.phone
            });
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpGet, Authorize]
        [Route("contacts")]
        public async Task<IActionResult> GetContacts([FromQuery] int read)
        {
            bool isread = read != 0;
            var list = await _db.ContactMessages.Where(t => t.IsRead == isread).OrderByDescending(t => t.Id).Select(v => new {v.Id,v.InsertTime,v.Name,v.Phone,v.Message,v.Email,v.IPAdress }).ToListAsync();
            return Ok(new
            {
                count = list.Count,
                data = list
            });
        }

        [HttpGet, Authorize]
        [Route("contacts/all")]
        public async Task<IActionResult> GetContactsAll()
        {
            var list = await _db.ContactMessages.Select(v => new {v.Id, v.IsRead, v.InsertTime, v.Name, v.Phone, v.Message, v.Email, v.IPAdress }).OrderBy(t => t.IsRead).ThenByDescending(t => t.Id).ToListAsync();
            return Ok(new
            {
                count = list.Count,
                data = list
            });
        }

        [HttpPut, Authorize]
        [Route("contact/read")]
        public async Task<IActionResult> ContactReadRequest([FromQuery] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var entity = await _db.ContactMessages.FindAsync(id);
            entity.IsRead = true;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
        #endregion
    }
}
