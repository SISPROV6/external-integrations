using System.Runtime.Serialization;
using SpInfra5WSUtils.Model;
using SpInfra7Db.Database;

namespace SpInfra2IntegrationWS.Models
{
    [DataContract]
    public class RetExemplo : ReturnModel<InfraUsuarioRecord>
    {
        [DataMember(Name = "InfraUsuario")]
        public override InfraUsuarioRecord Data
        {
            get;
            set;
        }

    }

}