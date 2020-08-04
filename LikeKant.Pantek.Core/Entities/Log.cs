using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LikeKant.Pantek.Core.Entities
{
    public class Log
    {
        public int Id { get; set; }
        public DateTime LogTime { get; set; }
        public LogType Type { get; set; }
        public LogStatus Status { get; set; }
        [StringLength(4000)]
        public string Message { get; set; }
        public string IP { get; set; }

        [StringLength(4000)]
        public string HTTPRequestHeaders { get; set; }
        [StringLength(4000)]
        public string HttpRequestBody { get; set; }
    }

    public enum LogType
    {
        Login=1,
        Logout
    }

    public enum LogStatus
    {
        Insert= 1,
        Update,
        Delete,
        Select,
        Process
    }
}
