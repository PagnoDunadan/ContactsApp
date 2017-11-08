using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace ContactsApp.Models
{
    public class PhoneNumber
    {
        public int PhoneNumberID { get; set; }
        [Required]
        public string PhoneNumberNumber { get; set; }
        public string PhoneNumberType { get; set; }
        [Required]
        public Contact Contact { get; set; }
    }
}