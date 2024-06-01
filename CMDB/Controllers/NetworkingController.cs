using CMDB.Data;
using CMDB.Models.DBEntities;
using CMDB.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CMDB.Controllers
{
	public class NetworkingController : Controller
	{
		private readonly NetworkingDbContext _context;

		public NetworkingController(NetworkingDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public IActionResult Index()
		{
			var networkingDevices = _context.SieciKomputerowe.ToList();
			var networkingDeviceList = new List<SieciKomputeroweViewModel>();

			if (networkingDevices != null)
			{
				foreach (var device in networkingDevices)
				{
					var deviceViewModel = new SieciKomputeroweViewModel()
					{
						UrzadzenieID = device.UrzadzenieID,
						Nazwa = device.Nazwa,
						Typ = device.Typ,
						AdresIP = device.AdresIP,
						PracownikID = device.PracownikID
					};

					networkingDeviceList.Add(deviceViewModel);
				}

				return View(networkingDeviceList);
			}

			return View(networkingDeviceList);
		}

		[HttpGet]
		public IActionResult Create()
		{
			return View();
		}

		[HttpPost]
		public IActionResult Create(SieciKomputeroweViewModel deviceData)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var device = new SieciKomputerowe()
					{
						Nazwa = deviceData.Nazwa,
						Typ = deviceData.Typ,
						AdresIP = deviceData.AdresIP,
						PracownikID = deviceData.PracownikID
					};

					_context.SieciKomputerowe.Add(device);
					_context.SaveChanges();

					TempData["successMessage"] = "Networking device created successfully.";
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
