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
    public class StoresController : Controller
    {
        private PopUpStoreEntities db = new PopUpStoreEntities();

        // GET: Stores
        public ActionResult Index()
        {
            return View(db.Stores.Select(x=> new StoreViewModel {Id=x.Id,Name=x.Name,Address=x.Address }).ToList());
        }

        // GET: Stores/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            StoreViewModel storeViewModel = new StoreViewModel { Id = store.Id, Name = store.Name, Address = store.Address };
            //return View(store);
            return Json(storeViewModel, JsonRequestBehavior.AllowGet);
        }

        // GET: Stores/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Stores/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include = "Id,Name,Address")] Store store)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Stores.Add(store);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }

        //    return View(store);
        //}

        [HttpPost]        
        public ActionResult Create([Bind(Include = "Id,Name,Address")] StoreViewModel storeViewModel)
        {
            if (ModelState.IsValid)
            {
                Store store = new Store { Id = storeViewModel.Id, Name = storeViewModel.Name, Address = storeViewModel.Address };
                db.Stores.Add(store);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(storeViewModel);
        }
        // GET: Stores/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            StoreViewModel storeViewModel = new StoreViewModel { Id = store.Id, Name = store.Name, Address = store.Address };
            //return View(store);
            return Json(storeViewModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]        
        public ActionResult Edit([Bind(Include = "Id,Name,Address")] StoreViewModel storeViewModel)
        {
            if (ModelState.IsValid)
            {
                Store store = new Store { Id = storeViewModel.Id, Name = storeViewModel.Name, Address = storeViewModel.Address };
                db.Entry(store).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(storeViewModel);
        }

        // POST: Stores/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit([Bind(Include = "Id,Name,Address")] Store store)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Entry(store).State = EntityState.Modified;
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    return View(store);
        //}

        // GET: Stores/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            StoreViewModel storeViewModel = new StoreViewModel { Id = store.Id, Name = store.Name, Address=store.Address };
            //return View(store);
            return Json(storeViewModel, JsonRequestBehavior.AllowGet);
        }

        // POST: Stores/Delete/5
        [HttpPost, ActionName("Delete")]        
        public ActionResult DeleteConfirmed(int id)
        {
            Store store = db.Stores.Find(id);
            db.Stores.Remove(store);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // POST: Stores/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public ActionResult DeleteConfirmed(int id)
        //{
        //    Store store = db.Stores.Find(id);
        //    db.Stores.Remove(store);
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
