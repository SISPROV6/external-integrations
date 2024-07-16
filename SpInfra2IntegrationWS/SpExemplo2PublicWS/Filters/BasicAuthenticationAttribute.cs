using System;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using SpInfra9Utils.Config;

namespace SpInfra2WebService.Filters
{
    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute
    {

        #region Override

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var authHeader = actionContext.Request.Headers.Authorization;

            if (authHeader != null)
            {
                //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: OnAuthorization: 'authHeader != null'."), System.Diagnostics.EventLogEntryType.Information);

                var authenticationToken = actionContext.Request.Headers.Authorization.Parameter;

                var decodedAuthenticationToken = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationToken));

                var usernamePasswordArray = decodedAuthenticationToken.Split(':');

                //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: OnAuthorization: usernamePasswordArray.Length: '{0}'.", usernamePasswordArray.Length.ToString()), System.Diagnostics.EventLogEntryType.Information);

                if (usernamePasswordArray.Length == 2)
                {
                    
                    var userName = usernamePasswordArray[0];
                    var password = usernamePasswordArray[1];

                    //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: OnAuthorization: username: '{0}', password: '{1}'.", userName, password), System.Diagnostics.EventLogEntryType.Information);

                    //Replace this with your own system of security / means of validating credentials
                    var isValid = this.ValidateAuthentication(userName,
                                                              password
                                                             );

                    if (isValid)
                    {
                        //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: OnAuthorization: Autenticação '{0}'.", true), System.Diagnostics.EventLogEntryType.Information);

                        var principal = new GenericPrincipal(new GenericIdentity(userName), null);

                        Thread.CurrentPrincipal = principal;

                        return;
                    }
                    else
                    {
                        //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: OnAuthorization: Autenticação '{0}'.", false), System.Diagnostics.EventLogEntryType.Information);
                    }

                }
                else
                {
                    //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: OnAuthorization: 'authHeader == null.'"), System.Diagnostics.EventLogEntryType.Information);
                }

            }

            //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: OnAuthorization: 'HandleUnathorized'."), System.Diagnostics.EventLogEntryType.Information);

            this.HandleUnathorized(actionContext);
        }

        #endregion Override

        #region Private Methods

        private void HandleUnathorized(HttpActionContext actionContext)
        {
            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);

            actionContext.Response.Headers.Add("WWW-Authenticate", "Basic Scheme='Data' location = 'http://localhost:");
        }

        private bool ValidateAuthentication(string userName,
                                            string password
                                           )
        {
            ConfigSection configSection = null;

            try
            {
                //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: ValidateAuthentication: Username: '{0}', Password: '{1}'.", userName, password), System.Diagnostics.EventLogEntryType.Information);

                configSection = Config.GetConfigSection("ConfigSection");

                //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: ValidateAuthentication: UsernameConfig: '{0}', PasswordConfig: '{1}.'", configRhSection.UserName, configRhSection.Password), System.Diagnostics.EventLogEntryType.Information);

                if (configSection.UserName == userName &&
                    configSection.Password == password)
                {
                    //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: ValidateAuthentication retornou '{0}'.", true), System.Diagnostics.EventLogEntryType.Information);
                    return true;
                }
                else
                {
                    //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: ValidateAuthentication retornou '{0}'.", false), System.Diagnostics.EventLogEntryType.Information);
                    return false;
                }

            }
            catch (Exception ex)
            {
                //EventViewLog.WriteEventLog("SpInfra2WebService", string.Format("BasicAuthenticationAttribute: ValidateAuthentication: Exception: {0}.", ex.Message.ToString()), System.Diagnostics.EventLogEntryType.Information);

                return false;
            }

        }

        #endregion Private Methods

    }
}