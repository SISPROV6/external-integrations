// OBS.: Código gerado com ajuda do ChatGPT (já foi alterado manulmente, testado e está 100% funcional)

const fs = require('fs');
const path = require('path');

const { exec } = require("child_process");
const yargs = require("yargs");

// Use o pacote yargs para analisar os argumentos da linha de comando
const argvMensagem = yargs
  .option("message", {
    alias: "m",         // Na linha de comando o que definirmos como por exemplo "-m <parâmetro>" será interpretado e lido aqui como a "Mensagem de parâmetro"
    describe: "Mensagem de parâmetro",
    type: "string",
    demandOption: true, // Isso torna o argumento obrigatório
  })
  .argv;

const argvProduto = yargs
  .option("product", {
    alias: "p",         // Na linha de comando o que definirmos como por exemplo "-p <parâmetro>" será interpretado e lido aqui como o "Nome do produto"
    describe: "Nome do produto",
    type: "string",
    demandOption: true, // Isso torna o argumento obrigatório
  })
  .argv;

const argvAplicacao = yargs
  .option("application", {
    alias: "a",         // Na linha de comando o que definirmos como por exemplo "-a <parâmetro>" será interpretado e lido aqui como a "Aplicação do projeto"
    describe: "Aplicação do projeto",
    type: "string",
    demandOption: true, // Isso torna o argumento obrigatório
  })
  .argv;

// Obtém a mensagem (-m) e nome do produto (-p) passados como argumentos
const mensagem = argvMensagem.message;
const produto = argvProduto.product;
const aplicacao = argvAplicacao.application;

const executable = "C:/SisproCloud/INFRA/Utils/SpInfraUtl1BuildLogs/SpInfraUtl1BuildLogs.exe";

// Carrega o arquivo de configuração e define a versão atual como a lida no arquivo
const versionFilePath = path.join("D:/SisproCloud/SpInfra1Integration/Modelos/SpInfra1Integration/Fontes/SpInfra1Integration/src/app/project/utils/version", 'version.config.json');
const config = JSON.parse(fs.readFileSync(versionFilePath, 'utf-8'));

const versao = config.version;


// Comando para executar o arquivo .exe com os argumentos definidos
const command = `${executable} "${mensagem}" "${versao}" "${produto}" "${aplicacao}"`;   // Usamos aspas para tratar a mensagem como uma única entrada

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao executar ${executable}: ${error}`);
    return;
  }
  
  console.log(`Saída do ${executable}: ${stdout}`);
});
