namespace WebApiSignalRPush
{
    using Models;
    using System.Data.Entity;

    public class SitedisksDBContext: DbContext
    {
        public SitedisksDBContext() : base("SitedisksDBContext") { }
        public SitedisksDBContext(string connectionString) : base(connectionString) { }

        public DbSet<Complaint> Complaints { get; set; }
    }
}