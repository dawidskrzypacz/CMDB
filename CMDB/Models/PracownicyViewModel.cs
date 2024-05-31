﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMDB.Models
{
    public class PracownicyViewModel
    {
        public int PracownikID { get; set; }
        public string Imie { get; set; }
        public string Nazwisko { get; set; }
        public string Stanowisko { get; set; }
        public DateTime DataZatrudnienia { get; set; }
        public string Telefon { get; set; }
    }
}