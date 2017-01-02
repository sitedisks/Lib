namespace AngularJsSignalR.Controllers
{
    using Microsoft.AspNet.SignalR;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    public class MessageController : ApiController
    {

        protected static IHubContext ZmHubContext = GlobalHost.ConnectionManager.GetHubContext<MsgHub>();
        //public IHttpActionResult SaveMessage()
        //{
        //    ZmHubContext.Clients.Groups();

        //}
    }
}
