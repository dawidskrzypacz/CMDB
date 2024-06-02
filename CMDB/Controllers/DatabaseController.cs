using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace CMDB.Controllers
{
    public class DatabaseController : Controller
    {
        private readonly string connectionString; // Your Azure SQL Server connection string

        public DatabaseController(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet]
        public IActionResult CheckConnection()
        {
            using (var connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();

                    return Ok("Connection successful");
                }
                catch (SqlException)
                {
                    return StatusCode(500, "Database connection failed");
                }
            }
        }
    }
}
