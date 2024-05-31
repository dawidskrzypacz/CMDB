﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMDB.Controllers
{
    public class ServersController : Controller
    {
        // GET: ServersController
        public ActionResult Index()
        {
            return View();
        }

        // GET: ServersController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ServersController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ServersController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ServersController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ServersController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ServersController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ServersController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
