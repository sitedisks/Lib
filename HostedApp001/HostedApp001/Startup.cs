using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HostedApp001.Startup))]
namespace HostedApp001
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
