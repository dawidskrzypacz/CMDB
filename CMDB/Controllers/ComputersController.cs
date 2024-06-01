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
			var computers = _context.Komputery.ToList();
			var computerList = new List<KomputeryViewModel>();

			if (computers != null)
			{
				foreach (var computer in computers)
				{
					var computerViewModel = new KomputeryViewModel()
					{
						KomputerID = computer.KomputerID,
						Nazwa = computer.Nazwa,
						TypKomputera = computer.TypKomputera,
						Model = computer.Model,
						DataZakupu = computer.DataZakupu,
						PracownikID = computer.PracownikID
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
		public IActionResult Create(KomputeryViewModel computerData)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var computer = new Komputery()
					{
						Nazwa = computerData.Nazwa,
						TypKomputera = computerData.TypKomputera,
						Model = computerData.Model,
						DataZakupu = computerData.DataZakupu,
						PracownikID = computerData.PracownikID
					};

					_context.Komputery.Add(computer);
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
