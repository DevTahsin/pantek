using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Entities
{
    public class HomePageImage
    {
        [Key]
        public int Id { get; set; }
        public Language Language { get; set; }
        public int LanguageId { get; set; }
        public int Order { get; set; }
        public bool IsDeleted { get; set; }
        [StringLength(250)]
        public string ImageUrl { get; set; }
    }
}
