using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Entities
{
    public class NewImage
    {
        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string ImageURL { get; set; }
        [StringLength(150)]
        public string AltText { get; set; }
        public int NewId { get; set; }
        public bool IsDefault { get; set; }
        public bool IsDeleted { get; set; }
        public New New { get; set; }
    }
}
