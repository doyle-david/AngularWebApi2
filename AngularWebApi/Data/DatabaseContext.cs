using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace AngularWebApi.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() : base("App_Db")
        {
            
        }

        public virtual DbSet<Data.Models.Person> People { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}