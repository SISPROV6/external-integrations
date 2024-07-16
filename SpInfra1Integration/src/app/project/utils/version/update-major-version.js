const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, 'version.config.json');

// Carrega o arquivo de configuração
const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

// Incrementa a versão (pode ser adaptado para incrementar conforme sua preferência)
const versionParts = config.version.split('.').map(Number);
versionParts[0]++; // Incrementa o número da Major-version (primeiro elemento)

// Verifica se há um rótulo de pré-lançamento definido
if (config.preReleaseLabel) {
  config.version = `${versionParts.join('.')}-${config.preReleaseLabel}`;
} else {
  config.version = versionParts.join('.');
}

// Atualiza a versão no arquivo de configuração
config.version = versionParts.join('.');

// Salva o arquivo de configuração atualizado
fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
