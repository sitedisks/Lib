namespace WebApiSignalRPush.Hubs
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using Microsoft.AspNet.SignalR;
    public class MyHubs : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        /// <summary>
        /// Called from JavaScript on client broswer when user searches a certain curstomer id
        /// to get real time notifications
        /// </summary>
        /// <param name="customerId"></param>
        public void Subscribe(string customerId)
        {
            Groups.Add(Context.ConnectionId, customerId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="customerId"></param>
        public void Unsubscribe(string customerId)
        {
            Groups.Remove(Context.ConnectionId, customerId);
        }
    }
}