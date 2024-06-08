using CMDB.Data;
using CMDB.Models.DBEntities;
using CMDB.ViewModels; // PAGINATION
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace CMDB.Controllers
{
    public class ComputersController : Controller
    {
        private readonly ComputersDbContext _context;
        private readonly int[] pageSizeOptions = { 5, 10, 20 }; // PAGINATION

        public ComputersController(ComputersDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index(int page = 1, int pageSize = 5)
        {
            var computer = _context.Computers
                                    .Skip((page - 1) * pageSize)
                                    .Take(pageSize)
                                    .ToList();

            var totalCount = _context.Computers.Count();
            ViewData["Pager"] = new PagerViewModel(page, pageSize, totalCount, pageSizeOptions);

            return View(computer);
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            var computer = _context.Computers.Find(id);
            if (computer == null)
            {
                TempData["errorMessage"] = "Computer not found.";
                return RedirectToAction("Index");
            }
            return View(computer);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Create(Computers computer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Computers.Add(computer);
                    _context.SaveChanges();

                    TempData["successMessage"] = "Computer created successfully.";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["errorMessage"] = "Model data is not valid.";
                    return View(computer);
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(computer);
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Edit(int id)
        {
            var computer = _context.Computers.Find(id);
            if (computer == null)
            {
                TempData["errorMessage"] = "Computer not found.";
                return RedirectToAction("Index");
            }
            return View(computer);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Edit(Computers computer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Computers.Update(computer);
                    _context.SaveChanges();

                    TempData["successMessage"] = "Computer updated successfully.";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["errorMessage"] = "Model data is not valid.";
                    return View(computer);
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(computer);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                var computer = _context.Computers.Find(id);
                if (computer == null)
                {
                    TempData["errorMessage"] = "Computer not found.";
                    return RedirectToAction("Index");
                }

                _context.Computers.Remove(computer);
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
