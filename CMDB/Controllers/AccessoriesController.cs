using CMDB.Data;
using CMDB.Models.DBEntities;
using CMDB.ViewModels; // PAGINATION
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CMDB.Controllers
{
	public class AccessoriesController : Controller
	{
		private readonly AccesoriesDbContext _context;
		private readonly int[] pageSizeOptions = { 5, 10, 20 }; // PAGINATION

		public AccessoriesController(CMDB.Data.AccesoriesDbContext context)
		{
			_context = context;
		}

      [HttpGet]
		 public IActionResult Index(int page = 1, int pageSize = 5)
        {
            var accessories = _context.Accessories
                                    .Skip((page - 1) * pageSize)
                                    .Take(pageSize)
                                    .ToList();

            var totalCount = _context.Accessories.Count();
            ViewData["Pager"] = new PagerViewModel(page, pageSize, totalCount, pageSizeOptions);

            return View(accessories);
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            var accessory = _context.Accessories.Find(id);
            if (accessory == null)
            {
                TempData["errorMessage"] = "accessory not found.";
                return RedirectToAction("Index");
            }
            return View(accessory);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Accessories accessory)
        {
            if (!ModelState.IsValid)
            {
                TempData["errorMessage"] = "Model data is not valid.";
                return View(accessory);
            }

            try
            {
                _context.Accessories.Add(accessory);
                _context.SaveChanges();

                TempData["successMessage"] = "accessory created successfully.";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(accessory);
            }
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var accessory = _context.Accessories.Find(id);
            if (accessory == null)
            {
                TempData["errorMessage"] = "accessory not found.";
                return RedirectToAction("Index");
            }
            return View(accessory);
        }

        [HttpPost]
        public IActionResult Edit(Accessories accessory)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Accessories.Update(accessory);
                    _context.SaveChanges();

                    TempData["successMessage"] = "accessory updated successfully.";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["errorMessage"] = "Model data is not valid.";
                    return View(accessory);
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(accessory);
            }
        }
        
        [HttpPost]
        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                var accessory = _context.Accessories.Find(id);
                if (accessory == null)
                {
                    TempData["errorMessage"] = "accessory not found.";
                    return RedirectToAction("Index");
                }

                _context.Accessories.Remove(accessory);
                _context.SaveChanges();

                TempData["successMessage"] = "accessory deleted successfully.";
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
