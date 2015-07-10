using System.Web.Optimization;

namespace AngularWebApi.App_Start
{
    public class BundlesConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterScriptBundles(bundles);
            RegisterStylesBundles(bundles);
        }

        public static void RegisterScriptBundles(BundleCollection bundles)
        {
            // Scripts
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-2.6.2.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularApp").Include(
                "~/app/app.js",
                "~/app/routes.js",
                "~/app/directives.js",
                "~/app/components/home/homeController.js",
                "~/app/components/other/otherController.js",
                "~/app/components/people/peopleController.js",
                "~/app/components/people/personDetailController.js",
                "~/app/components/people/peopleServices.js",
                "~/app/components/errorService.js"));
    

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include("~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables").Include(
                "~/Scripts/datatables/jquery.dataTables.js", 
                "~/Scripts/datatables/dataTables.bootstrap.js",
                "~/Scripts/datatables/angular-datatables.js"));
        }

        public static void RegisterStylesBundles(BundleCollection bundles)
        {
            // Stylesheets
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/dataTables.bootstrap.css",
                "~/Content/Site.css"));
        }
    }
}