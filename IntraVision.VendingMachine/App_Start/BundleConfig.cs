using System.Web;
using System.Web.Optimization;

namespace IntraVision.VendingMachine
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. на странице https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                    "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                    "~/Scripts/jquery.validate.js",
                    "~/Scripts/jquery.validate.unobtrusive.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                    "~/Scripts/bootstrap.js",
                    "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/custom").Include(
                    "~/Scripts/custom.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables").Include(
                    "~/Scripts/DataTables/jquery.dataTables.min.js",
                    "~/Scripts/DataTables/dataTables.bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryfileupload").Include(
                    "~/Scripts/jquery-ui-{version}.js",
                    "~/Scripts/jQuery.FileUpload/jquery.iframe-transport.js",
                    "~/Scripts/jQuery.FileUpload/jquery.fileupload.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                    "~/Content/bootstrap.css",
                    "~/Content/fonts.css",
                    "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/datatables").Include(
                    "~/Content/DataTables/css/dataTables.bootstrap.css"));
        }
    }
}
