module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot',
    execute(message) {
        // Checa se o usuário que enviou a mensagem tem permissão para executar o comando
        if (message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('Desligando o bot...')
                .then(() => {
                    process.exit(); // Finaliza o processo do bot
                });
        } else {
            message.channel.send('Você não tem permissão para desligar o bot.');
        }
    },
};
