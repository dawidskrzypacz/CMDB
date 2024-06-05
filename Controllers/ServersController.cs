using CMDB.Data;
using CMDB.Models.DBEntities;
using CMDB.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CMDB.Controllers
{
	public class ServersController : Controller
	{
		private readonly ServersDbContext _context;

		public ServersController(ServersDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public IActionResult Index()
		{
			var servers = _context.Servers.ToList();
			var serverList = new List<ServersViewModel>();

			if (servers != null)
			{
				foreach (var server in servers)
				{
					var serverViewModel = new ServersViewModel()
					{
						ServerID = server.ServerID,
						Name = server.Name,
						Manufacturer = server.Manufacturer,
						Model = server.Model,
						OperatingSystem = server.OperatingSystem,
						IPAddress = server.IPAddress,
						RAM = server.RAM,
						CPU = server.CPU,
						Storage = server.Storage,
						PurchaseDate = server.PurchaseDate,
						Accessories = server.Accessories
					};

					serverList.Add(serverViewModel);
				}

				return View(serverList);
			}

			return View(serverList);
		}

		[HttpGet]
		public IActionResult Create()
		{
			return View();
		}

		[HttpPost]
		public IActionResult Create(ServersViewModel serverData)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var server = new Servers()
					{
						ServerID = serverData.ServerID,
						Name = serverData.Name,
						Manufacturer = serverData.Manufacturer,
						Model = serverData.Model,
						OperatingSystem = serverData.OperatingSystem,
						IPAddress = serverData.IPAddress,
						RAM = serverData.RAM,
						CPU = serverData.CPU,
						Storage = serverData.Storage,
						PurchaseDate = serverData.PurchaseDate,
						Accessories = serverData.Accessories
					};

					_context.Servers.Add(server);
					_context.SaveChanges();

					TempData["successMessage"] = "Server created successfully.";
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
