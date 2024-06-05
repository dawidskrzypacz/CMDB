using CMDB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CMDB.Models.DBEntities;
using CMDB.Data;


namespace CMDB.Controllers
{
    public class ServicesController : Controller
    {
        private readonly ServicesDbContext _context;
        public ServicesController(CMDB.Data.ServicesDbContext context)
        {
            this._context = context;
        }
        // GET: EmployeesController
        [HttpGet]

        public IActionResult Index()
        {
            var services = _context.Services.ToList();
            List<ServicesViewModel> serviceList = new List<ServicesViewModel>();
            if (services != null)
            {
                foreach (var service in services)
                {
                    var ServicesViewModel = new ServicesViewModel()
                    {

                        ServiceID = service.ServiceID,
                        Name = service.Name,
                        Description = service.Description,
                        Servers = service.Servers
                    };
                    serviceList.Add(ServicesViewModel);

                }
                return View(serviceList);
            }
            return View(serviceList);
        }


        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        // GET: EmployeesController/Create
        [HttpPost]
        public IActionResult Create(ServicesViewModel serviceData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var service = new Services()
                    {
                        ServiceID = serviceData.ServiceID,
                        Name = serviceData.Name,
                        Description = serviceData.Description,
                        Servers = serviceData.Servers
                    };
                    _context.Services.Add(service);
                    _context.SaveChanges();
                    TempData["successMessage"] = "Service created";
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
