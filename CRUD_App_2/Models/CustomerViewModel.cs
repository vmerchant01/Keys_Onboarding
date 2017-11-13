using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CRUD_App_2.Models
{
    public class CustomerViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Customer Name is required")]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }
        [Range(1, 120, ErrorMessage = "Age Must be between 1 to 120")]
        public int? Age { get; set; }
        [Required(ErrorMessage = "Customer Address is required")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        [StringLength(300)]
        public string Address { get; set; }
        
    }
}