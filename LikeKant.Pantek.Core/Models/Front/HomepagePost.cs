using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Models.Front
{
    public class HomepagePost
    {
        public List<HomepageImage> images { get; set; }
        public int languageId { get; set; }
    }
    public class HomepageImage
    {
        public string imageUrl { get; set; }
    }
}
