namespace URF.Models.Domain
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    [Table("Survey")]
    public class tbSurvey
    {
        [Key, Column("Id")]
        public int SurveyId { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string URLToken { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public Guid? UserId { get; set; }
        public bool? ShowReport { get; set; }
        public Guid? BannerId { get; set; }
        public Guid? LogoId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsActive { get; set; }
    }
}