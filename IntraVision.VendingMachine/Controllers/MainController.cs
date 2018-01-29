using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IntraVision.VendingMachine.Models;

namespace IntraVision.VendingMachine.Controllers
{
    public class MainController : Controller
    {

        private VendingMachineDb db = new VendingMachineDb();

        public ActionResult Index()
        {
            ViewBag.Title = "Vending Machine";

            if (Session["InsertedCoins"] == null)
            {
                Session["InsertedCoins"] = (decimal)0;
            }
            ViewBag.InsertedCoins = Session["InsertedCoins"];

            return View();
        }

        [HttpPost]
        public ActionResult BuyDrink(int id)
        {
            decimal insertedCoins = (decimal)Session["InsertedCoins"];

            Drink drink = db.Drink.Find(id);
            if (drink == null)
            {
                return HttpNotFound();
            }

            if ((decimal)Session["InsertedCoins"] >= drink.price && drink.quantity > 0)
            {
                drink.quantity = drink.quantity - 1;
                db.SaveChanges();
            }

            insertedCoins = insertedCoins - drink.price;
            Session["InsertedCoins"] = insertedCoins;

            return Json(insertedCoins);
        }

        [HttpPost]
        public ActionResult GetInsertedCoins()
        {
            decimal insertedCoins = (decimal)Session["InsertedCoins"];
            
            return Json(insertedCoins);
        }

        [HttpPost]
        public ActionResult InsertCoin(int value)
        {
            decimal insertedCoins = (decimal)Session["InsertedCoins"];

            Coin coin = db.Coin.Where(c => c.value == value).Single();
            if (coin == null)
            {
                return HttpNotFound();
            }

            if (coin.allowed)
            {
                coin.quantity = coin.quantity + 1;
                db.SaveChanges();

                insertedCoins = insertedCoins + value;
                Session["InsertedCoins"] = insertedCoins;
            }

            return Json(insertedCoins);
        }

        [HttpPost]
        public ActionResult GetChange()
        {
            IQueryable<Coin> coins = db.Coin.OrderByDescending(c => c.value);

            List<Coin> change = new List<Coin> {};
            int insertedCoins = Decimal.ToInt32((decimal)Session["InsertedCoins"]);
            foreach (Coin coin in coins)
            {
                int quantity = insertedCoins / coin.value;
                if (quantity > 0 && coin.quantity > 0)
                {
                    quantity = (quantity > coin.quantity) ? coin.quantity : quantity;
                    insertedCoins = insertedCoins - coin.value * quantity;
                    coin.quantity = coin.quantity - quantity;

                    Coin changeCoin = new Coin
                    {
                        value = coin.value,
                        quantity = quantity
                    };
                    change.Add(changeCoin);
                }

            }
            db.SaveChanges();
            Session["InsertedCoins"] = (decimal)insertedCoins;

            return Json(change);
        }

    }
}
