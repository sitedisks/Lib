using System;
using WebApiSignalRPush.Hubs;

namespace WebApiSignalRPush.Controllers
{
    using Models;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Description;
    using WebApiSignalRPush;

    public class ComplaintsController : ApiControllerWithHub<MyHubs>
    {
        private SitedisksDBContext db = new SitedisksDBContext();

        // GET: api/Complaints
        public IQueryable<Complaint> GetComplaints()
        {
            return db.Complaints;
        }

        // GET: api/Complaints/5
        [Route("api/complaints/{customerId}")]
        [ResponseType(typeof(Complaint))]
        public async Task<IHttpActionResult> GetComplaint(string customerId)
        {
            var complaints = await db.Complaints.Where(x => x.CUSTOMER_ID == customerId).ToListAsync();
            if (complaints == null)
            {
                return NotFound();
            }

            return Ok(complaints);
        }

        // PUT: api/Complaints/5
        [ResponseType(typeof(void))]
        [HttpPost]
        [Route("api/complaints/edit/{id}")]
        public async Task<IHttpActionResult> PutComplaint(int id, Complaint complaint)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != complaint.COMPLAINT_ID)
            {
                return BadRequest();
            }

            db.Entry(complaint).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComplaintExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var subscribed = Hub.Clients.Group(complaint.CUSTOMER_ID);
            subscribed.updateItem(complaint);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Complaints
        [ResponseType(typeof(Complaint))]
        public async Task<IHttpActionResult> PostComplaint(Complaint complaint)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Complaints.Add(complaint);
                await db.SaveChangesAsync();

                var subscribed = Hub.Clients.Group(complaint.CUSTOMER_ID);
                subscribed.addItem(complaint);

                return CreatedAtRoute("DefaultApi", new { id = complaint.COMPLAINT_ID }, complaint);
            }
            catch (Exception ex)
            {
                var error = ex;
            }

            return null;
        }

        // DELETE: api/Complaints/5
        [ResponseType(typeof(Complaint))]
        public async Task<IHttpActionResult> DeleteComplaint(int id)
        {
            Complaint complaint = await db.Complaints.FindAsync(id);
            if (complaint == null)
            {
                return NotFound();
            }

            db.Complaints.Remove(complaint);
            await db.SaveChangesAsync();

            var subscribed = Hub.Clients.Group(complaint.CUSTOMER_ID);
            subscribed.deleteItem(complaint);

            return Ok(complaint);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ComplaintExists(int id)
        {
            return db.Complaints.Count(e => e.COMPLAINT_ID == id) > 0;
        }
    }
}