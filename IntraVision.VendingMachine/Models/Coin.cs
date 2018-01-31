namespace IntraVision.VendingMachine.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Coin
    {
        public int id { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Значение поля {0} может быть только положительным.")]
        [Display(Name = "Номинал")]
        public int value { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Значение поля {0} может быть только положительным.")]
        [Display(Name = "Количество")]
        public int quantity { get; set; } = 0;

        [Display(Name = "Принимается")]
        public bool allowed { get; set; } = true;
    }
}
