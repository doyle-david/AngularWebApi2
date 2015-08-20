using System.Collections.Generic;
using System.Linq;
using AngularWebApi.Data;
using AngularWebApi.Data.Models;

namespace AngularWebApi.Services
{
    public interface IPersonService
    {
        IEnumerable<Person> GetAll();
    }

    public class PersonService : IPersonService
    {
        private readonly DatabaseContext db;


        public PersonService(DatabaseContext databaseContext)
        {
            this.db = databaseContext;
        }

        public IEnumerable<Person> GetAll()
        {
            var data = db.People.OrderBy(x => x.FirstName).ThenBy(x => x.LastName).ToList(); 

            return data;
        }
    }
}