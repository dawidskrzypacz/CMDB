using CMDB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CMDB.Models.DBEntities;
using CMDB.Data;


namespace CMDB.Controllers
{
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
            var phones = _context.Telefony.ToList();
            List<TelefonyViewModel> phoneList = new List<TelefonyViewModel>();
            if (phones != null)
            {
                foreach (var phone in phones)
                {
                    var TelefonyViewModel = new TelefonyViewModel()
                    {
                        TelefonID =  phone.TelefonID,
                        NumerTelefonu = phone.NumerTelefonu,
                        Typ= phone.Typ,
                        Producent = phone.Producent,
                        DataZakupu = phone.DataZakupu,
                        PracownikID = phone.PracownikID
                    };
                    phoneList.Add(TelefonyViewModel);

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
        public IActionResult Create(TelefonyViewModel phoneData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var phone = new Telefony()
                    {
                        TelefonID =  phoneData.TelefonID,
                        NumerTelefonu = phoneData.NumerTelefonu,
                        Typ= phoneData.Typ,
                        Producent = phoneData.Producent,
                        DataZakupu = phoneData.DataZakupu,
                        PracownikID = phoneData.PracownikID
                    };
                    _context.Telefony.Add(phone);
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
