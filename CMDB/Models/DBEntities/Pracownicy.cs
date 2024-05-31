using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMDB.Models.DBEntities
{
    public class Pracownicy
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int PracownikID { get; set; }
		public string Imie { get; set; }
		public string Nazwisko { get; set; }
		public string Stanowisko { get; set; }
		public DateTime DataZatrudnienia { get; set; }
		public string Telefon { get; set; }
	}
}
