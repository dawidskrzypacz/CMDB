using Microsoft.AspNetCore.Mvc;

namespace CMDB.Controllers
{
    public class ReportsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
