using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using CRUD_App_2.Models;

namespace CRUD_App_2.Controllers
{
    public class SalesController : Controller
    {
        private PopUpStoreEntities db = new PopUpStoreEntities();

        // GET: Sales
        public ActionResult Index()
        {
            return View(db.Sales.Select(x=> new SaleViewModel { Customer_Name=x.Customer_Name, Product_Name=x.Product_Name}).ToList());
        }  

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
