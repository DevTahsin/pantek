using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Models.Front
{
    public class NewPost
    {
        public int languageId { get; set; }
        [StringLength(400)]
        public string title { get; set; }
        [StringLength(4000)]
        public string metaDescription { get; set; }
        public string innerHTML { get; set; }
        public List<NewImagePost> images { get; set; }
    }

    public class NewPut
    {
        public int id { get; set; }
        public int languageId { get; set; }
        [StringLength(400)]
        public string title { get; set; }
        [StringLength(4000)]
        public string metaDescription { get; set; }
        public string innerHTML { get; set; }
        public List<NewImagePut> images { get; set; }
    }

    public class NewImagePost
    {
        [StringLength(250)]
        public string imageURL { get; set; }
        public bool isDefault { get; set; }
        [StringLength(150)]
        public string altText { get; set; }
    }
    public class NewImagePut
    {
        public int id { get; set; }
        [StringLength(250)]
        public string imageURL { get; set; }
        public bool isDefault { get; set; }
        [StringLength(150)]
        public string altText { get; set; }
    }
}
