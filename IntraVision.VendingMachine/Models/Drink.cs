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
        [Display(Name = "Наименование")]
        public string name { get; set; }

        [Column(TypeName = "money")]
        [Display(Name = "Цена")]
        [DataType(DataType.Currency)]
        public decimal price { get; set; } = 0.00m;

        [StringLength(255)]
        [Display(Name = "Изображение")]
        public string img { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Значение поля {0} может быть только положительным.")]
        [Display(Name = "Количество")]
        public int quantity { get; set; } = 0;

        [NotMapped]
        [Display(Name = "Изображение")]
        public HttpPostedFileBase PostedImage { get; set; }
    }
}
