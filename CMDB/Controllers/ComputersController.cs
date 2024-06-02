using CMDB.Data;
using CMDB.Models.DBEntities;
using CMDB.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
			var computerList = new List<ComputersViewModel>();

			if (computers != null)
			{
				foreach (var computer in computers)
				{
					var computerViewModel = new ComputersViewModel()
					{
						ComputerID  = computer.ComputerID,
						Name  = computer.Name,
						Manufacturer  = computer.Manufacturer,
						Model = computer.Model,
						OperatingSystem = computer.OperatingSystem,
						IPAddress = computer.IPAddress,
						RAM = computer.RAM,
						CPU = computer.CPU,
						Storage = computer.Storage,
						PurchaseDate = computer.PurchaseDate,
						Accessories = computer.Accessories
					};

					computerList.Add(computerViewModel);
				}

				return View(computerList);
			}

			return View(computerList);
		}

		[HttpGet]
		public IActionResult Create()
		{
			return View();
		}

		[HttpPost]
		public IActionResult Create(ComputersViewModel computerData)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var computer = new Computers()
					{
						ComputerID  = computerData.ComputerID,
						Name  = computerData.Name,
						Manufacturer  = computerData.Manufacturer,
						Model = computerData.Model,
						OperatingSystem = computerData.OperatingSystem,
						IPAddress = computerData.IPAddress,
						RAM = computerData.RAM,
						CPU = computerData.CPU,
						Storage = computerData.Storage,
						PurchaseDate = computerData.PurchaseDate,
						Accessories = computerData.Accessories
					};

					_context.Computers.Add(computer);
					_context.SaveChanges();

					TempData["successMessage"] = "Computer created successfully.";
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
