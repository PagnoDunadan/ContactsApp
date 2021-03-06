﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ContactsApp.Models;
using System.Web.UI;

namespace ContactsApp.Controllers
{
    public class ContactsController : Controller
    {
        private ContactsAppContext db = new ContactsAppContext();

        public class PhoneNumberModel
        {
            public int PhoneNumberID { get; set; }
            public string PhoneNumberNumber { get; set; }
            public string PhoneNumberType { get; set; }
            public int ContactID { get; set; }
        }

        // GET: Contacts/Search
        public ActionResult Search()
        {
            return View();
        }

        // GET: Contacts/All
        [OutputCache(Location = OutputCacheLocation.None)]
        public ActionResult All()
        {
            return Json(db.Contacts.OrderByDescending(c=>c.ContactID).ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: Contacts/GetContact/5
        [OutputCache(Location = OutputCacheLocation.None)]
        public ActionResult GetContact(int id)
        {
            Contact contact = db.Contacts.Find(id);
            if (contact == null)
            {
                return HttpNotFound();
            }
            return Json(contact, JsonRequestBehavior.AllowGet);
        }

        // GET: Contacts/GetPhoneNumbersForContact/5
        [OutputCache(Location = OutputCacheLocation.None)]
        public ActionResult GetPhoneNumbersForContact(int id)
        {
            var phoneNumbers = db.PhoneNumbers
               .Where(p => p.Contact.ContactID.Equals(id)).OrderByDescending(p => p.PhoneNumberID)
               .Select(p => new PhoneNumberModel
               {
                   PhoneNumberID = p.PhoneNumberID,
                   PhoneNumberNumber = p.PhoneNumberNumber,
                   PhoneNumberType = p.PhoneNumberType,
                   ContactID = p.ContactID,
               }).ToList();

            if (phoneNumbers == null)
            {
                return HttpNotFound();
            }

            //var phoneNumbers = db.PhoneNumbers.Where(p => p.Contact.ContactID.Equals(id));
            return Json(phoneNumbers, JsonRequestBehavior.AllowGet);
        }

        //// GET: Contacts/Details/5
        //public ActionResult Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Contact contact = db.Contacts.Find(id);
        //    if (contact == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(contact);
        //}

        //// GET: Contacts/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        // POST: Contacts/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create([Bind(Include = "ContactID,ContactFirstName,ContactLastName,ContactAddress,ContactEmail,ContactDefaultNumber,ContactDefaultNumberType")] Contact contact)
        {
            if (ModelState.IsValid)
            {
                db.Contacts.Add(contact);
                db.SaveChanges();
                return Json(contact);
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();
            return Json(errors);
        }

        // GET: Contacts/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Contact contact = db.Contacts.Find(id);
            if (contact == null)
            {
                return HttpNotFound();
            }
            return View();
        }

        // POST: Contacts/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Edit([Bind(Include = "ContactID,ContactFirstName,ContactLastName,ContactAddress,ContactEmail,ContactDefaultNumber,ContactDefaultNumberType")] Contact contact)
        {
            if (ModelState.IsValid)
            {
                db.Entry(contact).State = EntityState.Modified;
                db.SaveChanges();
                return Content("Contact Updated");
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();
            return Json(errors);
        }

        //// GET: Contacts/Delete/5
        //public ActionResult Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Contact contact = db.Contacts.Find(id);
        //    if (contact == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(contact);
        //}

        // POST: Contacts/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Contact contact = db.Contacts.Find(id);
            db.Contacts.Remove(contact);
            db.SaveChanges();
            return Content("Contact Deleted");
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
