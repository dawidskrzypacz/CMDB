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
			var accessories = _context.Accessories.ToList();
			var accessoryList = new List<AccessoriesViewModel>();

			if (accessories != null)
			{
				foreach (var accessory in accessories)
				{
					var accessoryViewModel = new AccessoriesViewModel()
					{
						AccessoryID  = accessory.AccessoryID,
						Name  = accessory.Name,
						Type = accessory.Type,
						Manufacturer  = accessory.Manufacturer,
						SerialNumber   = accessory.SerialNumber,
						PurchaseDate  = accessory.PurchaseDate,
						WarrantyExpiration  = accessory.WarrantyExpiration,
						Employees   = accessory.Employees
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
		public IActionResult Create(AccessoriesViewModel accessoryData)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var accessory = new Accessories()
					{
						AccessoryID  = accessoryData.AccessoryID,
						Name  = accessoryData.Name,
						Type = accessoryData.Type,
						Manufacturer  = accessoryData.Manufacturer,
						SerialNumber   = accessoryData.SerialNumber,
						PurchaseDate  = accessoryData.PurchaseDate,
						WarrantyExpiration  = accessoryData.WarrantyExpiration,
						Employees   = accessoryData.Employees
					};

					_context.Accessories.Add(accessory);
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
