using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiAungularWithPushNoti;

namespace WebApiAungularWithPushNoti.Controllers
{
    public class CUSTOMER_COMPLAINTSController : ApiController
    {
        private MyEntities db = new MyEntities();

        // GET: api/CUSTOMER_COMPLAINTS
        public IQueryable<CUSTOMER_COMPLAINTS> GetCUSTOMER_COMPLAINTS()
        {
            return db.CUSTOMER_COMPLAINTS;
        }

        // GET: api/CUSTOMER_COMPLAINTS/5
        [ResponseType(typeof(CUSTOMER_COMPLAINTS))]
        public IHttpActionResult GetCUSTOMER_COMPLAINTS(int id)
        {
            CUSTOMER_COMPLAINTS cUSTOMER_COMPLAINTS = db.CUSTOMER_COMPLAINTS.Find(id);
            if (cUSTOMER_COMPLAINTS == null)
            {
                return NotFound();
            }

            return Ok(cUSTOMER_COMPLAINTS);
        }

        // PUT: api/CUSTOMER_COMPLAINTS/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCUSTOMER_COMPLAINTS(int id, CUSTOMER_COMPLAINTS cUSTOMER_COMPLAINTS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cUSTOMER_COMPLAINTS.COMPLAINT_ID)
            {
                return BadRequest();
            }

            db.Entry(cUSTOMER_COMPLAINTS).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CUSTOMER_COMPLAINTSExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CUSTOMER_COMPLAINTS
        [ResponseType(typeof(CUSTOMER_COMPLAINTS))]
        public IHttpActionResult PostCUSTOMER_COMPLAINTS(CUSTOMER_COMPLAINTS cUSTOMER_COMPLAINTS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CUSTOMER_COMPLAINTS.Add(cUSTOMER_COMPLAINTS);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cUSTOMER_COMPLAINTS.COMPLAINT_ID }, cUSTOMER_COMPLAINTS);
        }

        // DELETE: api/CUSTOMER_COMPLAINTS/5
        [ResponseType(typeof(CUSTOMER_COMPLAINTS))]
        public IHttpActionResult DeleteCUSTOMER_COMPLAINTS(int id)
        {
            CUSTOMER_COMPLAINTS cUSTOMER_COMPLAINTS = db.CUSTOMER_COMPLAINTS.Find(id);
            if (cUSTOMER_COMPLAINTS == null)
            {
                return NotFound();
            }

            db.CUSTOMER_COMPLAINTS.Remove(cUSTOMER_COMPLAINTS);
            db.SaveChanges();

            return Ok(cUSTOMER_COMPLAINTS);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CUSTOMER_COMPLAINTSExists(int id)
        {
            return db.CUSTOMER_COMPLAINTS.Count(e => e.COMPLAINT_ID == id) > 0;
        }
    }
}