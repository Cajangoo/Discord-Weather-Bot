const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

// Crie uma instância de cliente com as intents necessárias
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds, // Para eventos relacionados a servidores
        Discord.GatewayIntentBits.GuildMessages, // Para receber mensagens em servidores
        Discord.GatewayIntentBits.MessageContent // Para acessar o conteúdo das mensagens
    ],
});

// Carregando comandos
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); // Verifique se essa mensagem aparece
});

// Responde a mensagens
client.on('messageCreate', message => { // 'messageCreate' ao invés de 'message'
    if (!message.content.startsWith('!') || message.author.bot) return; // Verifica o prefixo

    const args = message.content.slice(1).trim().split(/ +/); // Remove o prefixo
    const commandName = args.shift().toLowerCase(); // Obtém o nome do comando

    const command = client.commands.get(commandName); // Obtém o comando da coleção

    if (command) {
        command.execute(message, args); // Executa o comando
    }
});

client.login(process.env.DISCORD_TOKEN); // Usa a variável de ambiente para o token
