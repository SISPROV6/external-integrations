using System.Web.Mvc;

namespace SpExemplo2PublicWS.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Infra - Web Service";

            //return View();
            return new RedirectResult("~/swagger/ui/index");

        }

    }

}
