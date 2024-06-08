using CMDB.Data;
using CMDB.Models.DBEntities;
using CMDB.Models;
using CMDB.ViewModels; // PAGINATION
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace CMDB.Controllers
{
	public class ServersController : Controller
	{
		private readonly ServersDbContext _context;
			private readonly int[] pageSizeOptions = { 5, 10, 20 }; // PAGINATION

		public ServersController(ServersDbContext context)
		{
			_context = context;
		}

      [HttpGet]
		 public IActionResult Index(int page = 1, int pageSize = 5)
        {
            var servers = _context.Servers
                                    .Skip((page - 1) * pageSize)
                                    .Take(pageSize)
                                    .ToList();

            var totalCount = _context.Servers.Count();
            ViewData["Pager"] = new PagerViewModel(page, pageSize, totalCount, pageSizeOptions);

            return View(servers);
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            var server = _context.Servers.Find(id);
            if (server == null)
            {
                TempData["errorMessage"] = "server not found.";
                return RedirectToAction("Index");
            }
            return View(server);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Create(Servers server)
        {
            if (!ModelState.IsValid)
            {
                TempData["errorMessage"] = "Model data is not valid.";
                return View(server);
            }

            try
            {
                _context.Servers.Add(server);
                _context.SaveChanges();

                TempData["successMessage"] = "server created successfully.";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(server);
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Edit(int id)
        {
            var server = _context.Servers.Find(id);
            if (server == null)
            {
                TempData["errorMessage"] = "server not found.";
                return RedirectToAction("Index");
            }
            return View(server);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Edit(Servers server)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Servers.Update(server);
                    _context.SaveChanges();

                    TempData["successMessage"] = "server updated successfully.";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["errorMessage"] = "Model data is not valid.";
                    return View(server);
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(server);
            }
        }
        
        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                var server = _context.Servers.Find(id);
                if (server == null)
                {
                    TempData["errorMessage"] = "server not found.";
                    return RedirectToAction("Index");
                }

                _context.Servers.Remove(server);
                _context.SaveChanges();

                TempData["successMessage"] = "server deleted successfully.";
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
