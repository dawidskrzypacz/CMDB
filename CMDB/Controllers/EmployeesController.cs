using Microsoft.AspNetCore.Mvc;

namespace CMDB.Controllers
{
    public class EmployeesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
