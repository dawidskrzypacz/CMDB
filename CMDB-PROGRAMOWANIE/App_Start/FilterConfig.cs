using System.Web;
using System.Web.Mvc;

namespace CMDB_PROGRAMOWANIE
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
