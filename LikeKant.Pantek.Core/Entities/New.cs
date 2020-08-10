using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Entities
{
    public class New
    {
        [Key]
        public int Id { get; set; }
        public int LanguageId { get; set; }
        public Language Language { get; set; }
        [StringLength(400)]
        public string Title { get; set; }
        public string InnerHTML { get; set; }
        [StringLength(4000)]
        public string MetaDescription { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime InsertTime { get; set; }

        public ICollection<NewImage> Images { get; set; }
    }
}
