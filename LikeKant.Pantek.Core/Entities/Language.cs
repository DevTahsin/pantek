using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Entities
{
    public class Language
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(20)]
        public string Code { get; set; }
        public int Version { get; set; }
        public short Order { get; set; }
        [StringLength(500)]
        public string FlagUrl { get; set; }
        public bool IsDefault { get; set; }
        public bool IsDeleted { get; set; }
    }
}
