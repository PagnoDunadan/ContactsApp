using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ContactsApp.Models;

namespace ContactsApp.Controllers
{
    public class PhoneNumbersController : Controller
    {
        private ContactsAppContext db = new ContactsAppContext();

        // POST: PhoneNumbers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create([Bind(Include = "PhoneNumberID,PhoneNumberNumber,PhoneNumberType,ContactID")] PhoneNumber phoneNumber)
        {
            if (ModelState.IsValid)
            {
                db.PhoneNumbers.Add(phoneNumber);
                db.SaveChanges();
                return Content("PhoneNumber saved");
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();
            return Json(errors);
        }

        //// GET: PhoneNumbers/Edit/5
        //public ActionResult Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    PhoneNumber phoneNumber = db.PhoneNumbers.Find(id);
        //    if (phoneNumber == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(phoneNumber);
        //}

        // POST: PhoneNumbers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Edit([Bind(Include = "PhoneNumberID,PhoneNumberNumber,PhoneNumberType,ContactID")] PhoneNumber phoneNumber)
        {
            if (ModelState.IsValid)
            {
                db.Entry(phoneNumber).State = EntityState.Modified;
                db.SaveChanges();
                return Content("PhoneNumber updated");
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();
            return Json(errors);
        }

        //// GET: PhoneNumbers/Delete/5
        //public ActionResult Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    PhoneNumber phoneNumber = db.PhoneNumbers.Find(id);
        //    if (phoneNumber == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(phoneNumber);
        //}

        // POST: PhoneNumbers/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            PhoneNumber phoneNumber = db.PhoneNumbers.Find(id);
            db.PhoneNumbers.Remove(phoneNumber);
            db.SaveChanges();
            return Content("PhoneNumber deleted");
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
