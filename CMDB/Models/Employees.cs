using Microsoft.AspNetCore.Mvc;

namespace CMDB.Models
{
    public class Employees 
    {
        public int PracownikID { get; set; }
        public string Imie {  get; set; }
        public string Nazwisko { get; set; }
        public string Stanowisko { get; set; }
        public DateTime DataZatrudnienia { get; set; }
        public string Telefon { get; set; }

    }
}
