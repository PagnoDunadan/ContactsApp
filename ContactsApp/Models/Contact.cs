using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace ContactsApp.Models
{
    public class Contact
    {
        public int ContactID { get; set; }
        public string ContactFirstName { get; set; }
        [Required]
        public string ContactLastName { get; set; }
        public string ContactAddress { get; set; }
        public string ContactEmail { get; set; }
        [Required]
        public double ContactDefaultNumber { get; set; }
        public string ContactDefaultNumberType { get; set; }
    }
}