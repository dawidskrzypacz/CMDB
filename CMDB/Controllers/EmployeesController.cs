using CMDB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CMDB.Models.DBEntities;
using CMDB.Data;


namespace CMDB.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly EmployeesDbContext _context;
        public EmployeesController(CMDB.Data.EmployeesDbContext context)
        {
            this._context = context;
        }
        // GET: EmployeesController
        [HttpGet]
        public IActionResult Index()
        {
            var employees = _context.Employees.ToList();
            List<EmployeesViewModel> employeeList = new List<EmployeesViewModel>();
            if(employees != null)
            {
                foreach (var employee in employees)
                {
                    var EmployeeViewModel = new EmployeesViewModel()
                    {
						EmployeeID  = employee.EmployeeID,
						FirstName  = employee.FirstName,
						LastName = employee.LastName,
						Email = employee.Email,
						Department  = employee.Department,
						Position  = employee.Position,
						PhoneNumber  = employee.PhoneNumber,
						OfficeLocation  = employee.OfficeLocation,
						Computers  = employee.Computers,
						Phones  = employee.Phones,
						Accessories = employee.Accessories
					};
                    employeeList.Add(EmployeeViewModel);

				}
                return View(employeeList);
            }
            return View(employeeList);
        }


        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
            // GET: EmployeesController/Create
            [HttpPost]
        public IActionResult Create(EmployeesViewModel employeeData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var employee = new Employees()
                    {
						EmployeeID  = employeeData.EmployeeID,
						FirstName  = employeeData.FirstName,
						LastName = employeeData.LastName,
						Email = employeeData.Email,
						Department  = employeeData.Department,
						Position  = employeeData.Position,
						PhoneNumber  = employeeData.PhoneNumber,
						OfficeLocation  = employeeData.OfficeLocation,
						Computers  = employeeData.Computers,
						Phones  = employeeData.Phones,
						Accessories = employeeData.Accessories
					};
                    _context.Employees.Add(employee);
                    _context.SaveChanges();
                    TempData["successMessage"] = "Employee created";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["errorMessage"] = "Model data is not valid.";
                    return View();
                }
            }
            catch (Exception ex)
            {

                TempData["errorMessage"] = ex.Message;
                return View();
            }
        }
     
        
    }
}
