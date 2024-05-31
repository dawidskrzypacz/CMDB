using CMDB.DAL;
using CMDB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        // GET: EmployeesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: EmployeesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: EmployeesController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: EmployeesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: EmployeesController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: EmployeesController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: EmployeesController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
