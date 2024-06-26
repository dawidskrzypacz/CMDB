﻿using CMDB.Data;
using CMDB.Models.DBEntities;
using CMDB.ViewModels; // PAGINATION
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace CMDB.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly EmployeesDbContext _context;
        private readonly int[] pageSizeOptions = { 5, 10, 20 }; // PAGINATION

        public EmployeesController(EmployeesDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index(int page = 1, int pageSize = 5)
        {
            var employees = _context.Employees
                                    .Skip((page - 1) * pageSize)
                                    .Take(pageSize)
                                    .ToList();

            var totalCount = _context.Employees.Count();
            ViewData["Pager"] = new PagerViewModel(page, pageSize, totalCount, pageSizeOptions);

            return View(employees);
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
            {
                TempData["errorMessage"] = "Employee not found.";
                return RedirectToAction("Index");
            }
            return View(employee);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Create(Employees employee)
        {
            if (!ModelState.IsValid)
            {
                TempData["errorMessage"] = "Model data is not valid.";
                return View(employee);
            }

            try
            {
                _context.Employees.Add(employee);
                _context.SaveChanges();

                TempData["successMessage"] = "Employee created successfully.";
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(employee);
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Edit(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
            {
                TempData["errorMessage"] = "Employee not found.";
                return RedirectToAction("Index");
            }
            return View(employee);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult Edit(Employees employee)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Employees.Update(employee);
                    _context.SaveChanges();

                    TempData["successMessage"] = "Employee updated successfully.";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["errorMessage"] = "Model data is not valid.";
                    return View(employee);
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(employee);
            }
        }
        
        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                var employee = _context.Employees.Find(id);
                if (employee == null)
                {
                    TempData["errorMessage"] = "Employee not found.";
                    return RedirectToAction("Index");
                }

                _context.Employees.Remove(employee);
                _context.SaveChanges();

                TempData["successMessage"] = "Employee deleted successfully.";
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
