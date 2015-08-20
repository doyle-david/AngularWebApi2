using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Moq;

namespace AngularWebApi.Tests
{
    public abstract class TestFixtureBase
    {

        protected TestFixtureBase()
        {
        }

        protected DbSet<T> GetMockeDbSet<T>(List<T> data) where T : class
        {
            var queryableData = data.AsQueryable();

            var mockDbSet = new Mock<DbSet<T>>();
            mockDbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryableData.Provider);
            mockDbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryableData.Expression);
            mockDbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryableData.ElementType);
            mockDbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(queryableData.GetEnumerator());

            return mockDbSet.Object;
        }
    }
}
