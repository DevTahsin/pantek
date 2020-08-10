using LikeKant.Pantek.Core.Entities;
using LikeKant.Pantek.Core.Helpers;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.ODataControllers
{
    [Authorize]
    public class LanguagesController : ODataController
    {
        private DataContext _db;
        public LanguagesController(DataContext context)
        {
            _db = context;
        }

        [HttpGet, EnableQuery]
        public IEnumerable<Language> Get()
        {
            return _db.Languages;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Language model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            model.Version = 1;
            _db.Languages.Add(model);
            await _db.SaveChangesAsync();
            return Created(model);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromODataUri] int key, Delta<Language> model)
        {
            var entity = await _db.Languages.FindAsync(key);
            model.Patch(entity);
            _db.SaveChanges();
            return Updated(entity);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromODataUri] int key, Language entity)
        {
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return Updated(entity);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromODataUri] int key)
        {
            var entity = await _db.Languages.FindAsync(key);
            entity.IsDeleted = true;
            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
