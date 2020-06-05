namespace TournamentData.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Tournament_Data_Models : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EventModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        EventNumber = c.String(),
                        EventDateTime = c.String(),
                        EventEndDateTime = c.String(),
                        AutoClose = c.Int(nullable: false),
                        Tournament_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TournamentModels", t => t.Tournament_Id)
                .Index(t => t.Tournament_Id);
            
            CreateTable(
                "dbo.EventDetailModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EventDetailName = c.String(),
                        EventDetailNumber = c.String(),
                        EventDateTime = c.DateTime(nullable: false),
                        EventEndDateTime = c.DateTime(nullable: false),
                        EventDetailOdd = c.Decimal(nullable: false, precision: 18, scale: 2),
                        AutoClose = c.Int(nullable: false),
                        EventDetailStatus = c.Int(nullable: false),
                        FirstTime = c.Int(nullable: false),
                        EventModel_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.EventModels", t => t.EventModel_Id)
                .Index(t => t.EventModel_Id);
            
            CreateTable(
                "dbo.EventDetailStatusModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EventDetailStatusName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EventModels", "Tournament_Id", "dbo.TournamentModels");
            DropForeignKey("dbo.EventDetailModels", "EventModel_Id", "dbo.EventModels");
            DropIndex("dbo.EventDetailModels", new[] { "EventModel_Id" });
            DropIndex("dbo.EventModels", new[] { "Tournament_Id" });
            DropTable("dbo.EventDetailStatusModels");
            DropTable("dbo.EventDetailModels");
            DropTable("dbo.EventModels");
        }
    }
}
