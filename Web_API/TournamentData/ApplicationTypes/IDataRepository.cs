using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TournamentData.ApplicationTypes
{
  public interface IDataRepository<T> where T : IDataModel
  {
    IEnumerable<T> GetAll();
    T GetById(int Id);
    void Create(T DataModel);
    void Update(T DataModel);
    void Delete(int Id);
    void Save();
  }
}
