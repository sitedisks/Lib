using Microsoft.AspNet.SignalR;
using System;

namespace Henriquatre.Integration.SignalR
{
    public class ServerTimeHub : Hub
    {
        public string GetServerTime()
        {
            return DateTime.UtcNow.ToString();
        }
    }
}