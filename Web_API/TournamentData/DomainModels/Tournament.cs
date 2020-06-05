using TournamentData.ApplicationTypes;

namespace TournamentData.ApplicationModels
{
  public class Tournament : IDataModel
  {
    public int Id { get; set; }

    public string Name { get; set; }
  }
}
