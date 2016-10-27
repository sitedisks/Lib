using ReactJsMvc4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactJsMvc4.Controllers
{
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
                    Text = "Hello ReactJS.NET World!",
                    Key = 1
                },
                new CommentModel
                {
                    Id = 2,
                    Author = "Pete Hunt",
                    Text = "This is one comment",
                    Key = 2
                },
                new CommentModel
                {
                    Id = 3,
                    Author = "Jordan Walke",
                    Text = "This is *another* comment",
                    Key =3
                },
                new CommentModel {
                    Id =4,
                    Author = "Peter Wang",
                    Text = "This is Pin.IO",
                    Key=4
                }
            };
        }
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [Route("comments")]
        [HttpGet]
        [System.Web.Mvc.OutputCache(Location = System.Web.UI.OutputCacheLocation.None)]
        public ActionResult Comments()
        {
            return Json(_comments, JsonRequestBehavior.AllowGet);
        }

        [Route("comments")]
        [HttpPost]
        public ActionResult AddComment(CommentModel comment)
        {
            comment.Id = _comments.Count + 1;
            comment.Key = _comments.Count + 1;
            _comments.Add(comment);
            return Json(_comments);
        }
    }
}