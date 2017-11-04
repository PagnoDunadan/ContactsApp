using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactsApp.Models
{
    public class ContactsAppInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<ContactsAppContext>
    {
        protected override void Seed(ContactsAppContext context)
        {
            var contacts = new List<Contact>
            {
                new Contact {ContactFirstName = "Petar", ContactLastName = "Miličić", ContactAddress = "Betanija 15, Trogir", ContactEmail = "pmilicic@fesb.hr", ContactDefaultNumber = 00385957357271, ContactDefaultNumberType = "Mobile"},
            };
            contacts.ForEach(v => context.Contacts.Add(v));
            context.SaveChanges();

            var phoneNumbers = new List<PhoneNumber>
            {
                new PhoneNumber {PhoneNumberNumber = 0038521636802, PhoneNumberType = "Home", Contact = contacts.First(c => c.ContactID.Equals(1))},
            };
            phoneNumbers.ForEach(p => context.PhoneNumbers.Add(p));
            context.SaveChanges();
        }
    }
}