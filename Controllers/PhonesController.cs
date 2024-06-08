using CMDB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CMDB.Models.DBEntities;
using CMDB.Data;
using CMDB.ViewModels; // PAGINATION
using Microsoft.AspNetCore.Authorization;


namespace CMDB.Controllers
{
    public class PhonesController : Controller
    {
        private readonly PhonesDbContext _context;
                private readonly int[] pageSizeOptions = { 5, 10, 20 }; // PAGINATION
        public PhonesController(CMDB.Data.PhonesDbContext context)
        {
            this._context = context;
        }
        [HttpGet]
        public IActionResult Index(int page = 1, int pageSize = 5)
        {
            var phones = _context.Phones
                                    .Skip((page - 1) * pageSize)
                                    .Take(pageSize)
                                    .ToList();

            var totalCount = _context.Phones.Count();
            ViewData["Pager"] = new PagerViewModel(page, pageSize, totalCount, pageSizeOptions);

            return View(phones);
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            var phone = _context.Phones.Find(id);
            if (phone == null)
            {
                TempData["errorMessage"] = "Computer not found.";
                return RedirectToAction("Index");
            }
            return View(phone);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Create(Phones phone)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Phones.Add(phone);
                    _context.SaveChanges();

                    TempData["successMessage"] = "Computer created successfully.";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["errorMessage"] = "Model data is not valid.";
                    return View(phone);
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(phone);
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Edit(int id)
        {
            var phone = _context.Phones.Find(id);
            if (phone == null)
            {
                TempData["errorMessage"] = "Computer not found.";
                return RedirectToAction("Index");
            }
            return View(phone);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Edit(Phones phone)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Phones.Update(phone);
                    _context.SaveChanges();

                    TempData["successMessage"] = "Computer updated successfully.";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["errorMessage"] = "Model data is not valid.";
                    return View(phone);
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(phone);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                var phone = _context.Phones.Find(id);
                if (phone == null)
                {
                    TempData["errorMessage"] = "Computer not found.";
                    return RedirectToAction("Index");
                }

                _context.Phones.Remove(phone);
                _context.SaveChanges();

                TempData["successMessage"] = "Computer deleted successfully.";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return RedirectToAction("Index");
            }
        }

    }
}
