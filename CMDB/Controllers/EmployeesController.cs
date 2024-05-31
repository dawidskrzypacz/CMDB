using CMDB.DAL;
using CMDB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CMDB.Models.DBEntities;


namespace CMDB.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly EmployeesDbContext _context;
        public EmployeesController(CMDB.DAL.EmployeesDbContext context)
        {
            this._context = context;
        }
        // GET: EmployeesController
        [HttpGet]
        public IActionResult Index()
        {
            var employees = _context.Pracownicy.ToList();
            List<PracownicyViewModel> employeeList = new List<PracownicyViewModel>();
            if(employees != null)
            {
                foreach (var employee in employees)
                {
                    var EmployeeViewModel = new PracownicyViewModel()
                    {
						PracownikID = employee.PracownikID,
                        Imie = employee.Imie,
                        Nazwisko = employee.Nazwisko,
                        Stanowisko = employee.Stanowisko,
                        DataZatrudnienia = employee.DataZatrudnienia,
                        Telefon = employee.Telefon
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
        public IActionResult Create(PracownicyViewModel employeeData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var employee = new Pracownicy()
                    {
                        PracownikID = employeeData.PracownikID,
                        Imie = employeeData.Imie,
                        Nazwisko = employeeData.Nazwisko,
                        Stanowisko = employeeData.Stanowisko,
                        DataZatrudnienia = employeeData.DataZatrudnienia,
                        Telefon = employeeData.Telefon
                    };
                    _context.Pracownicy.Add(employee);
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
