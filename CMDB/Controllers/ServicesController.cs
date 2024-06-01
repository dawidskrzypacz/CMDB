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
            var services = _context.UslugiIT.ToList();
            List<UslugiITViewModel> serviceList = new List<UslugiITViewModel>();
            if (services != null)
            {
                foreach (var service in services)
                {
                    var UslugiITViewModel = new UslugiITViewModel()
                    {

                        UslugaID =  service.UslugaID,
                        Nazwa = service.Nazwa,
                        Opis= service.Opis,
                        DataRozpoczecia = service.DataRozpoczecia,
                        DataZakonczenia = service.DataZakonczenia
                    };
                    serviceList.Add(UslugiITViewModel);

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
        public IActionResult Create(UslugiITViewModel serviceData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var service = new UslugiIT()
                    {
                        UslugaID =  serviceData.UslugaID,
                        Nazwa = serviceData.Nazwa,
                        Opis= serviceData.Opis,
                        DataRozpoczecia = serviceData.DataRozpoczecia,
                        DataZakonczenia = serviceData.DataZakonczenia
                    };
                    _context.UslugiIT.Add(service);
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
