using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CRUD_App_2.Models
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Price is required")]
        [Range(1.0, 10000000.0, ErrorMessage = "Price must be between 1.0 and 10000000.0")]
        public decimal Price { get; set; }
    }
}