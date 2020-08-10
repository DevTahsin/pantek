using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Models.Front
{
    public class ContactPost
    {
        [StringLength(50)]
        public string name { get; set; }
        [StringLength(50)]
        public string email { get; set; }
        [StringLength(20)]
        public string phone { get; set; }
        [StringLength(1500)]
        public string message { get; set; }
    }
}
