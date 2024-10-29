const fs = require('fs');
const path = require('path');

const commands = [];

// Lê todos os arquivos de comandos na pasta commands
fs.readdirSync(__dirname).forEach(file => {
    if (file.endsWith('.js') && file !== 'index.js') {
        const command = require(path.join(__dirname, file));
        commands.push(command);
    }
});

module.exports = { commands };
