using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;

namespace CMDB.Controllers
{
    [Authorize(Roles = "Admin,ADMIN")]
    public class UserController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public IActionResult Index()
        {
            var users = _userManager.Users.ToList();
            return View(users);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public async Task<IActionResult> Create(IdentityUser user, string password)
        {
            if (ModelState.IsValid)
            {
                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    // Set email as confirmed
                    user.EmailConfirmed = true;
                    await _userManager.UpdateAsync(user);

                    return RedirectToAction("Index");
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
            return View(user);
        }
        [HttpGet]
        [Authorize(Roles = "Admin,ADMIN")]
public async Task<IActionResult> Edit(string id)
{
    var user = await _userManager.FindByIdAsync(id);
    if (user == null)
    {
        return NotFound();
    }
    return View(user);
}

[HttpPost]
[Authorize(Roles = "Admin,ADMIN")]
public async Task<IActionResult> Edit(string id, IdentityUser updatedUser)
{
    try
    {
        if (ModelState.IsValid)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                TempData["errorMessage"] = "User not found.";
                return RedirectToAction("Index");
            }

            user.UserName = updatedUser.UserName;
            user.Email = updatedUser.Email;

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                TempData["successMessage"] = "User updated successfully.";
                return RedirectToAction("Index");
            }
            else
            {
                TempData["errorMessage"] = string.Join(", ", result.Errors.Select(e => e.Description));
            }
        }
        else
        {
            TempData["errorMessage"] = "Model data is not valid.";
        }
    }
    catch (Exception ex)
    {
        TempData["errorMessage"] = ex.Message;
    }

    return View(updatedUser);
}
                
[HttpPost]
[Authorize(Roles = "Admin,ADMIN")]
public async Task<IActionResult> DeleteConfirmed(string id)
{
    try
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            TempData["errorMessage"] = "User not found.";
            return RedirectToAction("Index");
        }

        var result = await _userManager.DeleteAsync(user);
        if (result.Succeeded)
        {
            TempData["successMessage"] = "User deleted successfully.";
            return RedirectToAction("Index");
        }
        else
        {
            TempData["errorMessage"] = string.Join(", ", result.Errors.Select(e => e.Description));
            return RedirectToAction("Index");
        }
    }
    catch (Exception ex)
    {
        TempData["errorMessage"] = ex.Message;
        return RedirectToAction("Index");
    }
}


        // Role management methods
        public IActionResult Roles()
        {
            var roles = _roleManager.Roles.ToList();
            return View(roles);
        }

        public IActionResult CreateRole()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            if (ModelState.IsValid)
            {
                var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
                if (result.Succeeded)
                {
                    return RedirectToAction("Roles");
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
            return View();
        }

        public async Task<IActionResult> AssignRole(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var roles = _roleManager.Roles.ToList();
            var model = new AssignRoleViewModel
            {
                UserId = user.Id,
                Roles = roles.Select(r => new SelectListItem
                {
                    Value = r.Name,
                    Text = r.Name
                }).ToList()
            };

            return View(model);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ADMIN")]
        public async Task<IActionResult> AssignRole(AssignRoleViewModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.AddToRoleAsync(user, model.SelectedRole);
            if (result.Succeeded)
            {
                return RedirectToAction("Index");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return View(model);
        }

        public async Task<IActionResult> UserRoles(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var roles = await _userManager.GetRolesAsync(user);
            var model = new UserRolesViewModel
            {
                UserId = user.Id,
                Roles = roles
            };

            return View(model);
        }
    }
[Authorize(Roles = "Admin,ADMIN")]
    public class AssignRoleViewModel
    {
        public string UserId { get; set; }
        public List<SelectListItem> Roles { get; set; }
        public string SelectedRole { get; set; }
    }

    public class UserRolesViewModel
    {
        public string UserId { get; set; }
        public IList<string> Roles { get; set; }
    }
}
