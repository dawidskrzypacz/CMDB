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
}
