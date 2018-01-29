using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IntraVision.VendingMachine.Filters;
using IntraVision.VendingMachine.Models;

namespace IntraVision.VendingMachine.Controllers
{
    public class AdminController : Controller
    {

        private VendingMachineDb db = new VendingMachineDb();

        private const string DRINKS_IMG_PATH = "~/Content/img/Drinks";
        private static string[] validImageTypes = new string[]
        {
            "image/gif",
            "image/jpeg",
            "image/png"
        };

        [AuthorizeToken]
        public ActionResult Index()
        {
            ViewBag.Title = "Vending Machine - Admin";

            return View();
        }

        public ActionResult AddDrink()
        {
            return PartialView("_AddDrink");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddDrink(Drink model)
        {
            if (
                (model.PostedImage != null && model.PostedImage.ContentLength > 0)
                && !validImageTypes.Contains(model.PostedImage.ContentType)
            )
            {
                ModelState.AddModelError("PostedImage", "Допускаются изображения только форматов GIF, JPG или PNG.");
            }

            if (ModelState.IsValid)
            {
                if (model.PostedImage != null && model.PostedImage.ContentLength > 0)
                {
                    string saveFileName = Guid.NewGuid() + Path.GetExtension(model.PostedImage.FileName);
                    string saveFilePath = Path.Combine(Server.MapPath(DRINKS_IMG_PATH), saveFileName);
                    model.PostedImage.SaveAs(saveFilePath);

                    model.img = saveFileName;
                }

                db.Drink.Add(model);
                db.SaveChanges();

                return Content("success");
            }

            return PartialView("_AddDrink", model);
        }

        public ActionResult EditDrink(int id)
        {
            Drink drink = db.Drink.Find(id);
            if (drink == null)
            {
                return HttpNotFound();
            }

            return PartialView("_EditDrink", drink);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditDrink(Drink model)
        {
            Drink drink = db.Drink.Find(model.id);
            if (drink == null)
            {
                return HttpNotFound();
            }

            if (
                (model.PostedImage != null && model.PostedImage.ContentLength > 0)
                && !validImageTypes.Contains(model.PostedImage.ContentType)
            )
            {
                ModelState.AddModelError("PostedImage", "Допускаются изображения только форматов GIF, JPG или PNG.");
            }

            if (ModelState.IsValid)
            {
                if (model.PostedImage != null && model.PostedImage.ContentLength > 0)
                {
                    string saveFileName = Guid.NewGuid() + Path.GetExtension(model.PostedImage.FileName);
                    string saveFilePath = Path.Combine(Server.MapPath(DRINKS_IMG_PATH), saveFileName);
                    model.PostedImage.SaveAs(saveFilePath);

                    model.img = saveFileName;
                }

                if (drink.img != null && (drink.img != model.img || model.img == null))
                {
                    new FileInfo(Path.Combine(Server.MapPath(DRINKS_IMG_PATH), drink.img)).Delete();
                }

                drink.name = model.name;
                drink.price = model.price;
                drink.quantity = model.quantity;
                drink.img = model.img;

                db.SaveChanges();

                return Content("success");
            }

            return PartialView("_EditDrink", model);
        }

        public ActionResult DeleteDrink(int id)
        {
            Drink drink = db.Drink.Find(id);
            if (drink == null)
            {
                return HttpNotFound();
            }

            return PartialView("_DeleteDrink", drink);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteDrink(Drink model)
        {
            Drink drink = db.Drink.Find(model.id);
            if (drink == null)
            {
                return HttpNotFound();
            }
            else
            {

                if (drink.img != null)
                {
                    new FileInfo(Path.Combine(Server.MapPath(DRINKS_IMG_PATH), drink.img)).Delete();
                }
                db.Drink.Remove(drink);
                db.SaveChanges();

                return Content("success");

            }
        }

    }
}
