namespace TournamentData.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial_Tournament_Data : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TournamentModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TournamentModels");
        }
    }
}
