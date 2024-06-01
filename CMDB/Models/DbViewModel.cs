using Microsoft.EntityFrameworkCore.Metadata.Internal;
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

    public class TelefonyViewModel
    {
        public int TelefonID { get; set; }
        public string NumerTelefonu { get; set; }
        public string Typ { get; set; }
        public string Producent { get; set; }
        public DateTime DataZakupu { get; set; }
        public virtual int PracownikID { get; set; }
    }
}
