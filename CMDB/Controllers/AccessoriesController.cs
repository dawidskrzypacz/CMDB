using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMDB.Controllers
{
    public class AccessoriesController : Controller
    {
        // GET: AccessoriesController
        public ActionResult Index()
        {
            return View();
        }

        // GET: AccessoriesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: AccessoriesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AccessoriesController/Create
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

        // GET: AccessoriesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: AccessoriesController/Edit/5
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

        // GET: AccessoriesController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: AccessoriesController/Delete/5
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
