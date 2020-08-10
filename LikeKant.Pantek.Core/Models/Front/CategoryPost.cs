using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Models.Front
{
    public class CategoryPost
    {
        public int languageId { get; set; }
        public string name { get; set; }
    }

    public class CategoryPut
    {
        public int id { get; set; }
        public string name { get; set; }
    }
}
