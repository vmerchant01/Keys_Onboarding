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
    public class CustomersController : Controller
    {
        private PopUpStoreEntities db = new PopUpStoreEntities();

        // GET: Customers
        public ActionResult Index()
        {
            return View(db.Customers.Select(x=> new CustomerViewModel { Id= x.Id,Name = x.Name, Age=x.Age,Address=x.Address}).ToList());
        }

        // GET: Customers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            CustomerViewModel customerViewModel = new CustomerViewModel { Id=customer.Id,Name=customer.Name,Age=customer.Age,Address=customer.Address};

            //return View(customer);
            return Json(customerViewModel, JsonRequestBehavior.AllowGet);
        }

        // GET: Customers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Customers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include = "Id,Name,Address,Age")] Customer customer)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Customers.Add(customer);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }

        //    return View(customer);
        //}

        [HttpPost]
        
        public ActionResult Create([Bind(Include = "Id,Name,Address,Age")] CustomerViewModel customerViewModal)
        {
            if (ModelState.IsValid)
            {
                Customer customer = new Customer { Id=customerViewModal.Id,Name=customerViewModal.Name,Age=customerViewModal.Age,Address=customerViewModal.Address};
                db.Customers.Add(customer);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(customerViewModal);
        }

        
        // GET: Customers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            CustomerViewModel customerViewModel = new CustomerViewModel { Id = customer.Id, Name = customer.Name, Age = customer.Age, Address = customer.Address };
            //return View(customer);
            return Json(customerViewModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]        
        public ActionResult Edit([Bind(Include = "Id,Name,Address,Age")] CustomerViewModel customerViewModal)
        {
            if (ModelState.IsValid)
            {
                Customer customer = new Customer { Id = customerViewModal.Id, Name = customerViewModal.Name, Age = customerViewModal.Age, Address = customerViewModal.Address };
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(customerViewModal);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit([Bind(Include = "Id,Name,Address,Age")] Customer customer)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Entry(customer).State = EntityState.Modified;
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    return View(customer);
        //}

        // GET: Customers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            CustomerViewModel customerViewModel = new CustomerViewModel { Id = customer.Id, Name = customer.Name, Age = customer.Age, Address = customer.Address };
            //return View(customer);
            return Json(customerViewModel, JsonRequestBehavior.AllowGet);
        }

        // POST: Customers/Delete/5
        [HttpPost, ActionName("Delete")]        
        public ActionResult DeleteConfirmed(int id)
        {
            Customer customer = db.Customers.Find(id);
            db.Customers.Remove(customer);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // POST: Customers/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public ActionResult DeleteConfirmed(int id)
        //{
        //    Customer customer = db.Customers.Find(id);
        //    db.Customers.Remove(customer);
        //    db.SaveChanges();
        //    return RedirectToAction("Index");
        //}    

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
