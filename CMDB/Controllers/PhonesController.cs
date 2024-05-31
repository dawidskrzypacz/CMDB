using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMDB.Controllers
{
    public class PhonesController : Controller
    {
        // GET: PhonesController
        public ActionResult Index()
        {
            return View();
        }

        // GET: PhonesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PhonesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PhonesController/Create
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

        // GET: PhonesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PhonesController/Edit/5
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

        // GET: PhonesController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PhonesController/Delete/5
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
