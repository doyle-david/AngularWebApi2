using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using AngularWebApi.Data;
using AngularWebApi.Data.Models;

namespace AngularWebApi.Api.Controllers
{
    public class PeopleController : ApiController
    {
        // GET: api/People
        public async Task<IHttpActionResult> Get()
        {
            // TODO: Move code to a service...
            // TODO: Use DI...
            try
            {
                using (var db = new DatabaseContext())
                {
                    var people = await db.People.ToListAsync();

                    return Ok(people);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError();
            }
        }

        // GET: api/People/5
        public async Task<IHttpActionResult> Get(int id)
        {
            try
            {
                using (var db = new DatabaseContext())
                {
                    var person = await db.People.Where(x=>x.Id == id).FirstOrDefaultAsync();

                    if (person == null)
                        return NotFound();

                    return Ok(person);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError();
            }
        }

        // POST: api/People
        public async Task<IHttpActionResult> Post(Person model)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            model.DateCreated = DateTime.Now;

            using (var db = new DatabaseContext())
            {
                db.People.Add(model);
                await db.SaveChangesAsync();
            }

            return Ok();
        }

        // PUT: api/People/5
        public async Task<IHttpActionResult> Put([FromUri]int id, Person person)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                using (var db = new DatabaseContext())
                {
                    // Note: Maybe sync properties... Instead of this.
                    // If we where to sync the properties then we would use this code.
                    //var databasePerson = await db.People.Where(x => x.Id == id).FirstOrDefaultAsync();

                    //if (databasePerson == null)
                    //    return NotFound();

                    db.Entry(person).State = EntityState.Modified;

                    await db.SaveChangesAsync();
                }

                return Ok();
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateConcurrencyException ce)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return InternalServerError();
            }
        }

        // DELETE: api/People/5
        public async Task<IHttpActionResult> Delete([FromUri]int id)
        {
            using (var db = new DatabaseContext())
            {
                var person = await db.People.FindAsync(id);

                if (person == null)
                    return NotFound();

                db.People.Remove(person);
                await db.SaveChangesAsync();

                return Ok();
            }
        }
    }
}
