﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMDB.Controllers
{
    public class ComputersController : Controller
    {
        // GET: ComputersController
        public ActionResult Index()
        {
            return View();
        }

        // GET: ComputersController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ComputersController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ComputersController/Create
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

        // GET: ComputersController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ComputersController/Edit/5
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

        // GET: ComputersController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ComputersController/Delete/5
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
