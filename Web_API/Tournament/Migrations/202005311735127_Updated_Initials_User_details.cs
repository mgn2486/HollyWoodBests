namespace Tournament.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Updated_Initials_User_details : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "Initials", c => c.String());
            DropColumn("dbo.User", "Intials");
        }
        
        public override void Down()
        {
            AddColumn("dbo.User", "Intials", c => c.String());
            DropColumn("dbo.User", "Initials");
        }
    }
}
