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
                new Contact {ContactFirstName = "Petar", ContactLastName = "Miličić", ContactAddress = "Betanija 15, Trogir", ContactEmail = "pmilicic@fesb.hr", ContactDefaultNumber = "+385957357271", ContactDefaultNumberType = "Mobile"},
                new Contact {ContactFirstName = "Antonio", ContactLastName = "Miličić", ContactAddress = "Betanija 15, Trogir", ContactEmail = "amilic00@fesb.hr", ContactDefaultNumber = "+385958902440", ContactDefaultNumberType = "Mobile"},
                new Contact {ContactFirstName = "Josip", ContactLastName = "Miličić", ContactAddress = "Betanija 15, Trogir", ContactEmail = "josip.milicic37@gmail.com", ContactDefaultNumber = "+385957415405", ContactDefaultNumberType = "Mobile"},
                new Contact {ContactFirstName = "Kristina", ContactLastName = "Miličić", ContactAddress = "Betanija 15, Trogir", ContactEmail = "kike.milicic@gmail.com", ContactDefaultNumber = "+385958616204", ContactDefaultNumberType = "Mobile"},
                new Contact {ContactFirstName = "Ružica", ContactLastName = "Kučić", ContactAddress = "Betanija 15, Trogir", ContactDefaultNumber = "+385915773831", ContactDefaultNumberType = "Mobile"},
            };
            contacts.ForEach(v => context.Contacts.Add(v));
            context.SaveChanges();

            var phoneNumbers = new List<PhoneNumber>
            {
                new PhoneNumber {PhoneNumberNumber = "+38521636802", PhoneNumberType = "Home", Contact = contacts.First(c => c.ContactID.Equals(1))},
                new PhoneNumber {PhoneNumberNumber = "+38521636802", PhoneNumberType = "Home", Contact = contacts.First(c => c.ContactID.Equals(2))},
                new PhoneNumber {PhoneNumberNumber = "+38521882001", PhoneNumberType = "Home", Contact = contacts.First(c => c.ContactID.Equals(3))},
                new PhoneNumber {PhoneNumberNumber = "+38521882001", PhoneNumberType = "Home", Contact = contacts.First(c => c.ContactID.Equals(4))},
                new PhoneNumber {PhoneNumberNumber = "+38521882001", PhoneNumberType = "Home", Contact = contacts.First(c => c.ContactID.Equals(5))},
            };
            phoneNumbers.ForEach(p => context.PhoneNumbers.Add(p));
            context.SaveChanges();
        }
    }
}