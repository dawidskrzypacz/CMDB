using CMDB.Models;
using CMDB.Models.DBEntities;
namespace CMDB.ViewModels
{
    public class EmployeesPhonesViewModel
{
    public IEnumerable<Employees> Employees { get; set; }
    public IEnumerable<Phones> Phones { get; set; }
    public PagerViewModel Pager { get; set; }
}

}
