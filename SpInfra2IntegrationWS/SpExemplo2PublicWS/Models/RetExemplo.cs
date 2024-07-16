using System.Runtime.Serialization;
using SpInfra5WSUtils.Model;
using SpInfra7Db.Database;

namespace SpExemplo2PublicWS.Models
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