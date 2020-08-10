using LikeKant.Pantek.Core.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Models.Front
{
    public class SettingsPost
    {
        public int languageId { get; set; }
        public string json { get; set; }
    }
}
