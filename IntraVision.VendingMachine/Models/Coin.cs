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

        [Range(0, int.MaxValue, ErrorMessage = "�������� ���� {0} ����� ���� ������ �������������.")]
        [Display(Name = "�������")]
        public int value { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "�������� ���� {0} ����� ���� ������ �������������.")]
        [Display(Name = "����������")]
        public int quantity { get; set; } = 0;

        [Display(Name = "�����������")]
        public bool allowed { get; set; } = true;
    }
}
