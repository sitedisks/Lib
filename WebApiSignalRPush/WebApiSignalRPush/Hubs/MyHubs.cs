namespace WebApiSignalRPush.Hubs
{
    using Microsoft.AspNet.SignalR;
    using System.Threading.Tasks;

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
            //Clients.Group(customerId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="customerId"></param>
        public void Unsubscribe(string customerId)
        {
            Groups.Remove(Context.ConnectionId, customerId);
        }

        public override Task OnConnected()
        {
            // Add your own code here.
            // For example: in a chat application, record the association between
            // the current connection ID and user name, and mark the user as online.
            // After the code in this method completes, the client is informed that
            // the connection is established; for example, in a JavaScript client,
            // the start().done callback is executed.
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            // Add your own code here.
            // For example: in a chat application, mark the user as offline, 
            // delete the association between the current connection id and user name.
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            // Add your own code here.
            // For example: in a chat application, you might have marked the
            // user as offline after a period of inactivity; in that case 
            // mark the user as online again.
            return base.OnReconnected();
        }
    }
}