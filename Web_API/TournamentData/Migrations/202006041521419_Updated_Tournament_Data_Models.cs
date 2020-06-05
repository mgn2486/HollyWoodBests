namespace TournamentData.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Updated_Tournament_Data_Models : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.EventModels", "EventNumber", c => c.Int(nullable: false));
            AlterColumn("dbo.EventModels", "EventDateTime", c => c.DateTime(nullable: false));
            AlterColumn("dbo.EventModels", "EventEndDateTime", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.EventModels", "EventEndDateTime", c => c.String());
            AlterColumn("dbo.EventModels", "EventDateTime", c => c.String());
            AlterColumn("dbo.EventModels", "EventNumber", c => c.String());
        }
    }
}
