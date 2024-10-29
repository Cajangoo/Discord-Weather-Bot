const { commands } = require('../commands');

function handleMessages(message) {
    if (message.author.bot) return; // Ignorar mensagens de bots

    console.log(`Mensagem recebida: ${message.content}`); // Log da mensagem recebida

    const args = message.content.trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.find(cmd => cmd.name === commandName);
    
    if (command) {
        console.log(`Executando o comando: ${commandName}`); // Log do comando executado
        command.execute(message, args);
    }
}

module.exports = { handleMessages };
