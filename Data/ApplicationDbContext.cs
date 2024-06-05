using CMDB.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CMDB.Models.DBEntities;

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

        public DbSet<Models.DBEntities.Employees> Employees { get; set; }
        public DbSet<CMDB.Models.DBEntities.EmployeesViewModel> EmployeesViewModel { get; set; } = default!;
    }
    public class PhonesDbContext : DbContext
    {
        public PhonesDbContext(DbContextOptions<PhonesDbContext> options) : base(options)
        {
        }

        public DbSet<Models.DBEntities.Phones> Phones { get; set; }
    }
	public class AccesoriesDbContext : DbContext
	{
		public AccesoriesDbContext(DbContextOptions<AccesoriesDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.Accessories> Accessories { get; set; }
	}
	public class ComputersDbContext : DbContext
	{
		public ComputersDbContext(DbContextOptions<ComputersDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.Computers> Computers { get; set; }
	}

	public class ServersDbContext : DbContext
	{
		public ServersDbContext(DbContextOptions<ServersDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.Servers> Servers { get; set; }
	}
	public class ResourceRelationshipDbContext : DbContext
	{
		public ResourceRelationshipDbContext(DbContextOptions<ResourceRelationshipDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.ResourceRelationship> ResourceRelationship { get; set; }
	}
	public class NetworkDevicesDbContext : DbContext
	{
		public NetworkDevicesDbContext(DbContextOptions<NetworkDevicesDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.NetworkDevices> NetworkDevices { get; set; }
	}
	public class SoftwaresDbContext : DbContext
	{
		public SoftwaresDbContext(DbContextOptions<SoftwaresDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.Softwares> Softwares { get; set; }
	}
	public class ServicesDbContext : DbContext
	{
		public ServicesDbContext(DbContextOptions<ServicesDbContext> options) : base(options)
		{
		}

		public DbSet<Models.DBEntities.Services> Services { get; set; }
	}
	
}
