using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMDB.Controllers
{
    public class InfrastructureController : Controller
    {
        // GET: InfrastructureController
        public ActionResult Index()
        {
            return View();
        }

        // GET: InfrastructureController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: InfrastructureController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: InfrastructureController/Create
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

        // GET: InfrastructureController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: InfrastructureController/Edit/5
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

        // GET: InfrastructureController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: InfrastructureController/Delete/5
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
