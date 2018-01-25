namespace IntraVision.VendingMachine.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class VendingMachineDb : DbContext
    {
        public VendingMachineDb()
            : base("name=VendingMachine")
        {
            Database.CommandTimeout = 180;
        }

        public virtual DbSet<Coin> Coin { get; set; }
        public virtual DbSet<Drink> Drink { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Drink>()
                .Property(e => e.price)
                .HasPrecision(19, 4);
        }
    }
}
