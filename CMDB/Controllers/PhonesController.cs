using CMDB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CMDB.Models.DBEntities;
using CMDB.Data;
using Microsoft.AspNetCore.Authorization;


namespace CMDB.Controllers
{
    [Authorize(Roles = "Admin")]
    public class PhonesController : Controller
    {
        private readonly PhonesDbContext _context;
        public PhonesController(CMDB.Data.PhonesDbContext context)
        {
            this._context = context;
        }
        // GET: EmployeesController
        [HttpGet]
        public IActionResult Index()
        {
            var phones = _context.Phones.ToList();
            List<PhonesViewModel> phoneList = new List<PhonesViewModel>();
            if (phones != null)
            {
                foreach (var phone in phones)
                {
                    var PhonesViewModel = new PhonesViewModel()
                    {
                        PhoneID =  phone.PhoneID,
                        Name = phone.Name,
                        Manufacturer= phone.Manufacturer,
                        Model = phone.Model,
                        OperatingSystem = phone.OperatingSystem,
                        PhoneNumber = phone.PhoneNumber,
                        Storage = phone.Storage,
                        ScreenSize = phone.ScreenSize,
                        PurchaseDate = phone.PurchaseDate,
                        Accessories = phone.Accessories
					};
                    phoneList.Add(PhonesViewModel);

                }
                return View(phoneList);
            }
            return View(phoneList);
        }


        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        // GET: EmployeesController/Create
        [HttpPost]
        public IActionResult Create(PhonesViewModel phoneData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var phone = new Phones()
                    {
						PhoneID =  phoneData.PhoneID,
						Name = phoneData.Name,
						Manufacturer= phoneData.Manufacturer,
						Model = phoneData.Model,
						OperatingSystem = phoneData.OperatingSystem,
						PhoneNumber = phoneData.PhoneNumber,
						Storage = phoneData.Storage,
						ScreenSize = phoneData.ScreenSize,
						PurchaseDate = phoneData.PurchaseDate,
						Accessories = phoneData.Accessories
					};
                    _context.Phones.Add(phone);
                    _context.SaveChanges();
                    TempData["successMessage"] = "Phone created";
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
