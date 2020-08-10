using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public int LanguageId { get; set; }
        public Language Language { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<Group> Groups { get; set; } 
    }
}
