namespace IntraVision.VendingMachine.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Web;

    public partial class Drink
    {
        public int id { get; set; }

        [Required]
        [StringLength(255)]
        [Display(Name = "������������")]
        public string name { get; set; }

        [Column(TypeName = "money")]
        [Display(Name = "����")]
        public decimal price { get; set; }

        [StringLength(255)]
        [Display(Name = "�����������")]
        public string img { get; set; }

        [Display(Name = "����������")]
        public int quantity { get; set; }

        [NotMapped]
        [Display(Name = "�����������")]
        public HttpPostedFileBase PostedImage { get; set; }
    }
}
