using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IntraVision.VendingMachine.Models;

namespace IntraVision.VendingMachine.Controllers
{
    public class CoinsController : ApiController
    {

        private VendingMachineDb db = new VendingMachineDb();

        // GET api/coins
        public List<Coin> Get()
        {
            List<Coin> coins = db.Coin.OrderBy(c => c.value).ToList();

            return coins;
        }

        // GET api/coins/?value=5
        public HttpResponseMessage Get(int value)
        {
            Coin coin = db.Coin.Where(c => c.value == value).Single();

            if (coin == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new HttpError("ОШИБКА: Монета не найдена."));
            }

            return Request.CreateResponse(HttpStatusCode.OK, coin);
        }

        // PUT api/coins/
        public HttpResponseMessage Put([FromBody]Coin coin)
        {
            Coin _coin = db.Coin.Find(coin.id);
            if (_coin == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new HttpError("ОШИБКА: Монета не найдена."));
            }

            if (ModelState.IsValid)
            {
                _coin.quantity = coin.quantity;
                _coin.allowed = coin.allowed;
                db.SaveChanges();
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new HttpError("ОШИБКА: Недопустимое значение."));
            }

            return Request.CreateResponse(HttpStatusCode.OK, _coin); ;
        }

    }
}
