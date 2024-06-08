using CMDB.Data;
using CMDB.Models.DBEntities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace CMDB.Controllers
{
    public class ReportsController : Controller
    {
        private readonly EmployeesDbContext _context;

        // Ensure there is only one constructor
        public ReportsController(EmployeesDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var officeLocations = await _context.Employees
                                                .Select(e => e.OfficeLocation)
                                                .ToListAsync();
            return View(officeLocations);
        }
    }
}
