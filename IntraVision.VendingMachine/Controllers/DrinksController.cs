using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IntraVision.VendingMachine.Models;

namespace IntraVision.VendingMachine.Controllers
{
    public class DrinksController : ApiController
    {

        private VendingMachineDb db = new VendingMachineDb();

        // GET api/drinks
        public List<Drink> Get()
        {
            List<Drink> drinks = db.Drink.OrderBy(d => d.name).ToList();

            return drinks;
        }

        // GET api/values/5
        public Drink Get(int id)
        {
            Drink drink = db.Drink.Where(d => d.id == id).Single();

            return drink;
        }

        // POST api/values
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/values/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/values/5
        //public void Delete(int id)
        //{
        //}
    }
}
