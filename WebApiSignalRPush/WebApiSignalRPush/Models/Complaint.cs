namespace WebApiSignalRPush.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    [Table("Complaint")]
    public class Complaint
    {
        [Key, Column("Id")]
        public int ComplaintID { get; set; }
        public string CustomerId { get; set; }
        public string Description { get; set; }
    }
}