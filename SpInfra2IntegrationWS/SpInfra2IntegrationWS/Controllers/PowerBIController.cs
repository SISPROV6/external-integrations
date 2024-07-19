using System;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

using Swashbuckle.Swagger.Annotations;

using SpInfra5WSUtils.Model;
using SpInfra5WSUtils.Filters;
using SpInfra5WSUtils.Session;
using SpInfra8Log;
using SpInfra9Utils.Exceptions.WebServicesException;
using SpInfra2IntegrationWS.Models;

namespace SpInfra2IntegrationWS.Controllers
{
    //  Rota da API
    [RoutePrefix("api/PowerBIServices")]
    [UserAuthentication]
    public class PowerBIController : ApiController
    {

        #region Public Methods

        #region Exemplo

        [Route("Exemplo")]
        [HttpGet]
        [ResponseType(typeof(RetExemplo))]
        [SwaggerResponse(HttpStatusCode.OK, "Execução com sucesso.")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Erro de parâmetros.")]
        [SwaggerResponse(HttpStatusCode.InternalServerError, "Erro de servidor.")]
        public IHttpActionResult Exemplo()
        {
            long idLog = 0;

            RetExemplo ret = new RetExemplo()
            {
                Error = false,
                ErrorMessage = string.Empty
            };

            try
            {
                idLog = Log.LogWs.WriteLog(Session.DalConnections.DalBaseLog, System.Reflection.MethodBase.GetCurrentMethod());

                //Lógica

                Log.LogWs.WriteLogOk(Session.DalConnections.DalBaseLog, idLog);
            }
            catch (WebServiceException ex)
            {
                Log.LogWs.WriteLogError(Session.DalConnections.DalBaseLog, idLog, ex);

                ret.Error = true;
                ret.ErrorMessage = ex.Message;

                // Erro de usuário recebe mensagem com status 200 (erro tratado)
                if (ex.ErrorType == WebServiceExceptionType.USER_OK)
                {
                    return Content(HttpStatusCode.OK, ret);
                }
                // Erro de usuário recebe mensagem com status 400
                if (ex.ErrorType == WebServiceExceptionType.USER_ERROR)
                {
                    return Content(HttpStatusCode.BadRequest, ret);
                }
                // Senão considera-se erro de servidor.
                return Content(HttpStatusCode.InternalServerError, ret);
            }
            catch (Exception ex)
            {
                Log.LogWs.WriteLogError(Session.DalConnections.DalBaseLog, idLog, ex);

                ret.Error = true;
                ret.ErrorMessage = ex.Message;

                // Erro tratado
                return Content(HttpStatusCode.OK, ret);
            }

            return Ok(ret);
        }

        #endregion Exemplo

        #endregion Public Methods

    }
}
