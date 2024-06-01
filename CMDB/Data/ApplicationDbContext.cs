using CMDB.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CMDB.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

    }
    public class EmployeesDbContext : DbContext
    {
        public EmployeesDbContext(DbContextOptions<EmployeesDbContext> options) : base(options)
        {
        }

        public DbSet<Models.DBEntities.Pracownicy> Pracownicy { get; set; }
    }
    public class PhonesDbContext : DbContext
    {
        public PhonesDbContext(DbContextOptions<PhonesDbContext> options) : base(options)
        {
        }

        public DbSet<Models.DBEntities.Telefony> Telefony { get; set; }
    }
	public class AccesoriesDbContext : DbContext
	{
		public AccesoriesDbContext(DbContextOptions<AccesoriesDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.AkcesoriaKomputerowe> AkcesoriaKomputerowe { get; set; }
	}
	public class IncydentsDbContext : DbContext
	{
		public IncydentsDbContext(DbContextOptions<IncydentsDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.IncydentyBezpieczenstwa> IncydentyBezpieczenstwa { get; set; }
	}
	public class ComputersDbContext : DbContext
	{
		public ComputersDbContext(DbContextOptions<ComputersDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.Komputery> Komputery { get; set; }
	}
	public class SoftwareDbContext : DbContext
	{
		public SoftwareDbContext(DbContextOptions<SoftwareDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.Oprogramowanie> Oprogramowanie { get; set; }
	}
	public class ServersDbContext : DbContext
	{
		public ServersDbContext(DbContextOptions<ServersDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.Serwery> Serwery { get; set; }
	}
	public class NetworkingDbContext : DbContext
	{
		public NetworkingDbContext(DbContextOptions<NetworkingDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.SieciKomputerowe> SieciKomputerowe { get; set; }
	}
	public class ServicesDbContext : DbContext
	{
		public ServicesDbContext(DbContextOptions<ServicesDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.UslugiIT> UslugiIT { get; set; }
	}
}
