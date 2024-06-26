﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMDB.Models.DBEntities
{
    public class Employees
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Department { get; set; }

        public string Position { get; set; }

        public string PhoneNumber { get; set; }

        public string OfficeLocation { get; set; }


    }

    public class Servers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ServerID { get; set; }

        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public string Model { get; set; }

        public string OperatingSystem { get; set; }

        public string IPAddress { get; set; }

        public int RAM { get; set; }

        public int CPU { get; set; }

        public int Storage { get; set; }

        public DateTime PurchaseDate { get; set; }


    }

    public class Computers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ComputerID { get; set; }

        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public string Model { get; set; }

        public string OperatingSystem { get; set; }

        public string IPAddress { get; set; }

        public int RAM { get; set; }

        public int CPU { get; set; }

        public int Storage { get; set; }

        public DateTime PurchaseDate { get; set; }


    }

    public class Phones
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PhoneID { get; set; }

        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public string Model { get; set; }

        public string OperatingSystem { get; set; }

        public string PhoneNumber { get; set; }

        public int Storage { get; set; }

        public int ScreenSize { get; set; }

        public DateTime PurchaseDate { get; set; }

    }

    public class Accessories
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccessoryID { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public string Manufacturer { get; set; }

        public string SerialNumber { get; set; }

        public DateTime PurchaseDate { get; set; }

        public DateTime WarrantyExpiration { get; set; }
    }

    public class ResourceRelationship
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RelationshipID { get; set; }

        public int ParentResourceID { get; set; }

        public int ChildResourceID { get; set; }

        [ForeignKey("ParentResourceID")]
        public virtual ResourceRelationship ParentResource { get; set; }

        [ForeignKey("ChildResourceID")]
        public virtual ResourceRelationship ChildResource { get; set; }
    }
    public class NetworkDevices
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DeviceID { get; set; }

        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public string Model { get; set; }

        public string IPAddress { get; set; }

        public string MACAddress { get; set; }

        public int PortCount { get; set; }

        public DateTime PurchaseDate { get; set; }

    }

    public class Softwares
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SoftwareID { get; set; }

        public string Name { get; set; }

        public string Version { get; set; }

        public string Publisher { get; set; }

        public DateTime InstallationDate { get; set; }



    }

    public class Services
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ServiceID { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

    }
    public class PagerOptions
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int PageCount => (int)Math.Ceiling((double)TotalItems / PageSize);
    }
}