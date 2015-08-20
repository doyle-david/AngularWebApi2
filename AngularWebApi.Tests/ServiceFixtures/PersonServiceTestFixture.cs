using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using AngularWebApi.Data;
using AngularWebApi.Data.Models;
using AngularWebApi.Services;
using NUnit.Framework;
using Moq;
using Should;

namespace AngularWebApi.Tests.ServiceFixtures
{
    
    public class PersonServiceTestFixture
    {
        [TestFixture]
        public class When_getting_people_from_the_PersonService : TestFixtureBase
        {
            private List<Person> actual;

            [SetUp]
            public void Setup()
            {
                var dbCtx = GetMockedDatabaseContext();

                var serviceToTest = new PersonService(dbCtx);

                actual = serviceToTest.GetAll().ToList();
            }

            protected DatabaseContext GetMockedDatabaseContext()
            {
                // Get the supplied data and mock the DbSet that we need for this test.
                var peopleDbSet = GetMockeDbSet(GetSuppliedData());

                var dbCtx = new Mock<DatabaseContext>();
                dbCtx.Setup(x => x.People).Returns(peopleDbSet);

                return dbCtx.Object;
            }

            protected List<Person> GetSuppliedData()
            {
                return new List<Person>
                {
                    new Person {Id = 1, FirstName = "John", LastName = "Doe"},
                    new Person {Id = 2, FirstName = "Anne", LastName = "Dane"},
                };
            }


            [Test]
            public void Should_return_right_number_of_people()
            {
                actual.Count().ShouldBeGreaterThan(0);
                actual.Count().ShouldEqual(GetSuppliedData().Count);
            }

            [Test]
            public void Should_return_people_sorted_alphabetically_by_first_name_and_last_name()
            {
                var orderedList = GetSuppliedData()
                    .OrderBy(x => x.FirstName)
                    .ThenBy(x => x.LastName).ToList();

                for (var i = 0; i < orderedList.Count(); i++)
                {
                    actual[i].FirstName.ShouldEqual(orderedList[i].FirstName);
                    actual[i].LastName.ShouldEqual(orderedList[i].LastName);
                }
            }
        }
    }
}
