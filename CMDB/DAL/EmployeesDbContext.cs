using Microsoft.EntityFrameworkCore;

namespace CMDB.DAL
{
    public class EmployeesDbContext : DbContext
    {
        public EmployeesDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Models.DBEntities.Pracownicy> Pracownicy { get; set; }
    }
}
