using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Entities
{
    public class ContactMessage
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(50)]
        public string Email { get; set; }
        [StringLength(20)]
        public string Phone { get; set; }
        [StringLength(1500)]
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime InsertTime { get; set; }
        [StringLength(30)]
        public string IPAdress { get; set; }
    }
}
