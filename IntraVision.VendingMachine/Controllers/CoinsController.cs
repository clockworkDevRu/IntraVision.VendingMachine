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
        public Coin Get(int value)
        {
            Coin coin = db.Coin.Where(c => c.value == value).Single();

            return coin;
        }

        // POST api/coins
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/coins/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/coins/5
        //public void Delete(int id)
        //{
        //}
    }
}
