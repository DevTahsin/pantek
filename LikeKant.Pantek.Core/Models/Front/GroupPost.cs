using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Models.Front
{
    public class GroupPost
    {
        public int categoryId { get; set; }
        [StringLength(100)]
        public string name { get; set; }
        [StringLength(100)]
        public string imageUrl { get; set; }
        [StringLength(500)]
        public string description { get; set; }
    }

    public class GroupPut
    {
        public int id { get; set; }
        [StringLength(100)]
        public string name { get; set; }
        public int categoryId { get; set; }
        [StringLength(100)]
        public string imageUrl { get; set; }
        [StringLength(500)]
        public string description { get; set; }
    }
}
