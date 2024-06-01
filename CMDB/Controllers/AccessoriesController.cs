using CMDB.Data;
using CMDB.Models.DBEntities;
using CMDB.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CMDB.Controllers
{
	public class AccessoriesController : Controller
	{
		private readonly AccesoriesDbContext _context;

		public AccessoriesController(CMDB.Data.AccesoriesDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public IActionResult Index()
		{
			var accessories = _context.AkcesoriaKomputerowe.ToList();
			var accessoryList = new List<AkcesoriaKomputeroweViewModel>();

			if (accessories != null)
			{
				foreach (var accessory in accessories)
				{
					var accessoryViewModel = new AkcesoriaKomputeroweViewModel()
					{
						AkcesoriumID = accessory.AkcesoriumID,
						Nazwa = accessory.Nazwa,
						Typ = accessory.Typ,
						Producent = accessory.Producent,
						DataZakupu = accessory.DataZakupu,
						PracownikID = accessory.PracownikID
					};

					accessoryList.Add(accessoryViewModel);
				}

				return View(accessoryList);
			}

			return View(accessoryList);
		}

		[HttpGet]
		public IActionResult Create()
		{
			return View();
		}

		[HttpPost]
		public IActionResult Create(AkcesoriaKomputeroweViewModel accessoryData)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var accessory = new AkcesoriaKomputerowe()
					{
						Nazwa = accessoryData.Nazwa,
						Typ = accessoryData.Typ,
						Producent = accessoryData.Producent,
						DataZakupu = accessoryData.DataZakupu,
						PracownikID = accessoryData.PracownikID
					};

					_context.AkcesoriaKomputerowe.Add(accessory);
					_context.SaveChanges();

					TempData["successMessage"] = "Accessory created successfully.";
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
