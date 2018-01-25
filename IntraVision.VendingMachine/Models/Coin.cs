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

        public int value { get; set; }

        public int quantity { get; set; }

        public bool allowed { get; set; }
    }
}
