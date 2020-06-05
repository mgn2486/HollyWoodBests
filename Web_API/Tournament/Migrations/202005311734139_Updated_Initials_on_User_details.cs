namespace Tournament.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Updated_Initials_on_User_details : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "Intials", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "Intials");
        }
    }
}
