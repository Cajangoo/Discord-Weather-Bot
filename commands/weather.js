const axios = require('axios');
const fetch = require('node-fetch');

async function getWeather(city) {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Obtém a chave da API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Unidade em Celsius

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao acessar a API: ' + response.statusText);
        }
        const weatherData = await response.json();
        return weatherData; // Retorna os dados do clima
    } catch (error) {
        console.error(error.message); // Log do erro
        throw new Error('Não foi possível recuperar os dados do clima. Por favor, tente novamente.'); // Mensagem de erro
    }
}


module.exports = {
    name: 'weather',
    description: 'Get the current weather for a city',
    async execute(message, args) {
        const city = args.join(' '); // Concatena os argumentos para formar o nome da cidade
        
        try {
            const weatherData = await getWeather(city); // Obtém os dados do clima
            console.log(weatherData);
            
            // Extrai apenas os dados necessários
            const cityName = weatherData.name; // Nome da cidade
            const temperature = weatherData.main.temp; // Temperatura atual
            const description = weatherData.weather[0].description; // Descrição da condição climática
            const humidity = weatherData.main.humidity; // Umidade
            const windSpeed = weatherData.wind.speed; // Velocidade do vento

            // Formata a mensagem com as informações extraídas
            const weatherMessage = `**Clima atual em ${cityName}:**\n` +
                                   `Temperatura: ${temperature}°C\n` +
                                   `Condição: ${description}\n` +
                                   `Umidade: ${humidity}%\n` +
                                   `Vento: ${windSpeed} m/s`;
            
            message.channel.send(weatherMessage); // Envia a mensagem ao canal
        } catch (error) {
            console.error('Error fetching weather data:', error); // Log do erro
            message.channel.send('Não foi possível recuperar os dados do clima. Por favor, tente novamente.'); // Mensagem de erro
        }
    },
};
