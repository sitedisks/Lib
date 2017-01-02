namespace AngularJsSignalR
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;

    [HubName("ThrivorHub")]
    public class MsgHub : Hub
    {
        public void SendMessage(string name, string message)
        {
            //Clients.Client(id).myClientFunc();
            //Server invocation of client method myClientFunc();
            //'Server Push' - server code call out to client code 
            //using Remote Procedure Calls (RPC)
            Clients.All.broadcastMessage(name, message); // all client or group them
        }

        public override System.Threading.Tasks.Task OnConnected() {
            Groups.Add(Context.ConnectionId, Context.User.Identity.Name);
            return base.OnConnected();
        }

        public override System.Threading.Tasks.Task OnReconnected()
        {
            Groups.Add(Context.ConnectionId, Context.User.Identity.Name);
            return base.OnReconnected();
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            Groups.Remove(Context.ConnectionId, Context.User.Identity.Name);
            return base.OnDisconnected(stopCalled);
        }
    }
}