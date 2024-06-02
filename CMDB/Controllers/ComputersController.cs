using CMDB.Data;
using CMDB.Models.DBEntities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace CMDB.Controllers
{
    public class ComputersController : Controller
    {
        private readonly ComputersDbContext _context;

        public ComputersController(ComputersDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var computers = _context.Computers.ToList();
            return View(computers);
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
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
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
