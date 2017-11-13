using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CRUD_App_2.Models
{
    public class StoreViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Store Name is required")]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Store Address is required")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        [StringLength(300)]
        public string Address { get; set; }
    }
}