namespace WebApiSignalRPush.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    [Table("Complaint")]
    public class Complaint
    {
        [Key, Column("Id")]
        public int COMPLAINT_ID { get; set; }
        [Column("CustomerId")]
        public string CUSTOMER_ID { get; set; }
        [Column("Description")]
        public string DESCRIPTION { get; set; }
    }
}