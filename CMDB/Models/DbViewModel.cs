using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMDB.Models
{
	public class AkcesoriaKomputeroweViewModel
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int AkcesoriumID { get; set; }
		public string? Nazwa { get; set; }
		public string? Typ { get; set; }
		public string? Producent { get; set; }
		public DateTime? DataZakupu { get; set; }
		public virtual int PracownikID { get; set; }
	}
	public class IncydentyBezpieczenstwaViewModel
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int IncydentID { get; set; }
		public string? Typ { get; set; }
		public string? Opis { get; set; }
		public DateTime? DataZgloszenia { get; set; }
		public int? Priorytet { get; set; }
		public string? Status { get; set; }
	}
	public class KomputeryViewModel
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int KomputerID { get; set; }
		public string? Nazwa { get; set; }
		public string? TypKomputera { get; set; }
		public string? Model { get; set; }
		public DateTime? DataZakupu { get; set; }
		public virtual int PracownikID { get; set; }
	}
	public class OprogramowanieViewModel
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int OprogramowanieID { get; set; }
		public string? Nazwa { get; set; }
		public string? Wersja { get; set; }
		public string? Producent { get; set; }
		public string? Licencja { get; set; }
		public DateTime? DataZakupu { get; set; }
		public virtual int PracownikID { get; set; }
	}
	public class PracownicyViewModel
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int PracownikID { get; set; }
		public string? Imie { get; set; }
		public string? Nazwisko { get; set; }
		public string? Stanowisko { get; set; }
		public DateTime? DataZatrudnienia { get; set; }
		public string? Telefon { get; set; }
	}
	public class SerweryViewModel
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int SerwerID { get; set; }
		public string? Nazwa { get; set; }
		public string? TypSerwera { get; set; }
		public string? Producent { get; set; }
		public DateTime? DataZakupu { get; set; }
		public virtual int PracownikID { get; set; }
	}
	public class SieciKomputeroweViewModel
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int UrzadzenieID { get; set; }
		public string? Nazwa { get; set; }
		public string? Typ { get; set; }
		public string? AdresIP { get; set; }
		public virtual int PracownikID { get; set; }
	}
	public class TelefonyViewModel
    {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int TelefonID { get; set; }
        public string? NumerTelefonu { get; set; }
        public string? Typ { get; set; }
        public string? Producent { get; set; }
        public DateTime? DataZakupu { get; set; }
        public virtual int PracownikID { get; set; }
    }
	public class UslugiITViewModel
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int UslugaID { get; set; }
        public string? Nazwa { get; set; }
		public string? Opis { get; set; }
		public DateTime? DataRozpoczecia { get; set; }
		public DateTime? DataZakonczenia { get; set; }
	}
}
