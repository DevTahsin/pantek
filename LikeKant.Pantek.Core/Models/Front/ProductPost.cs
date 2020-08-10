using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Models.Front
{
    public class ProductPost
    {
        public int groupId { get; set; }
        [StringLength(400)]
        public string title { get; set; }
        [StringLength(4000)]
        public string metaDescription { get; set; }
        public string innerHTML { get; set; }
        public List<ProductImagePost> images { get; set; }
    }

    public class ProductPut
    {
        public int id { get; set; }
        public int groupId { get; set; }
        [StringLength(400)]
        public string title { get; set; }
        [StringLength(4000)]
        public string metaDescription { get; set; }
        public string innerHTML { get; set; }
        public List<ProductImagePut> images { get; set; }
    }

    public class ProductImagePost
    {
        [StringLength(250)]
        public string imageURL { get; set; }
        [StringLength(150)]
        public string altText { get; set; }
    }
    public class ProductImagePut
    {
        public int id { get; set; }
        [StringLength(250)]
        public string imageURL { get; set; }
        [StringLength(150)]
        public string altText { get; set; }
    }
}
