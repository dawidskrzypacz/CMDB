using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CMDB_PROGRAMOWANIE.Startup))]
namespace CMDB_PROGRAMOWANIE
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
