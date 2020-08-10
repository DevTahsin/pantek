using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        [StringLength(400)]
        public string Title { get; set; }
        public string InnerHTML { get; set; }
        [StringLength(4000)]
        public string MetaDescription { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<ProductImage> Images { get; set; }
    }
}
