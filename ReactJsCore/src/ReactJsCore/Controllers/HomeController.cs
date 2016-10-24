namespace ReactJsCore.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Models;

    public class HomeController : Controller
    {
        private readonly IList<CommentModel> _comments;

        public HomeController()
        {
            _comments = new List<CommentModel>
            {
                new CommentModel
                {
                    Id = 1,
                    Author = "Daniel Lo Nigro",
                    Text = "Hello ReactJS.NET World!"
                },
                new CommentModel
                {
                    Id = 2,
                    Author = "Pete Hunt",
                    Text = "This is one comment"
                },
                new CommentModel
                {
                    Id = 3,
                    Author = "Jordan Walke",
                    Text = "This is *another* comment"
                },
                new CommentModel {
                    Id =4,
                    Author = "Peter Wang",
                    Text = "This is Pin.IO"
                }
            };
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [Route("comments")]
        [System.Web.Mvc.OutputCache(Location = System.Web.UI.OutputCacheLocation.None)]
        public IActionResult Comments()
        {
            return Json(_comments);
        }
    }
}
