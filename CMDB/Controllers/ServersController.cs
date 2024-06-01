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
			var servers = _context.Serwery.ToList();
			var serverList = new List<SerweryViewModel>();

			if (servers != null)
			{
				foreach (var server in servers)
				{
					var serverViewModel = new SerweryViewModel()
					{
						SerwerID = server.SerwerID,
						Nazwa = server.Nazwa,
						TypSerwera = server.TypSerwera,
						Producent = server.Producent,
						DataZakupu = server.DataZakupu,
						PracownikID = server.PracownikID
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
		public IActionResult Create(SerweryViewModel serverData)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var server = new Serwery()
					{
						Nazwa = serverData.Nazwa,
						TypSerwera = serverData.TypSerwera,
						Producent = serverData.Producent,
						DataZakupu = serverData.DataZakupu,
						PracownikID = serverData.PracownikID
					};

					_context.Serwery.Add(server);
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
