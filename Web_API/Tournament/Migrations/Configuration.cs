using System.Collections.Generic;
using Microsoft.AspNet.Identity.EntityFramework;
using Tournament.Models;

namespace Tournament.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Tournament.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Tournament.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Roles.AddOrUpdate(x => x.Id,
              new IdentityRole() { Id = "1", Name = "SuperAdmin" },
              new IdentityRole() { Id = "2", Name = "Admin" },
              new IdentityRole() { Id = "3", Name = "Member" }
            );

        }
    }
}
