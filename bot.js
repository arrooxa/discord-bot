const Discord = require("discord.js"); // Requerimento de biblioteca
const puppeteer = require('puppeteer');
const client = new Discord.Client();
const config = require("./config.json");


client.on("ready", () => {
    console.log(`Bot foi iniciado no servidor da Airsoft!`); // Mensagem no terminal ao iniciar o bot.
    client.user.setActivity('tua tia banguela na cama', { type: 'PLAYING' });(`Eu estou em ${client.guilds.cache.size} servidores`);
});

client.on("guildCreate", guild => { // Mensagem no terminal ao entrar em um servidor.
    console.log(`O bot entrou no servidor.`);
    client.user.setActivity(`Estou no servidor da Airsoft!`);
});

client.on("guildDelete", guild => { // Mensagem no terminal ao sair em um servidor.
    console.log(`O bot foi removido do servidor.`);
    client.user.setActivity(`Não estou no servidor da Airsoft!`);
});

client.on("message", message => {
    if (message.author.bot) return; // Não retornar mensagens de BOT
    if (message.channel.type === "dm") return; // Não retornar mensagens da DM

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase(); // Definição de variável para efetuar os comandos no bot

if(comando === "cotação") {
    let filter = m => m.author.id === message.author.id
    message.channel.send(`Qual moeda quer verificar a cotação? Responda em 30 segundos.`).then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(message => {
          message = message.first();
          async function robo(moeda) {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            const moedaBase = `${moeda}`;
            const moedaFinal = 'real';
          
            const qualquerUrl = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome.0.69i59j0l7.1726j0j4&sourceid=chrome&ie=UTF-8`;
            await page.goto(qualquerUrl);
            // await page.screenshot({path: 'example.png'});
          
            const resultado = await page.evaluate(() => {
              return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
            });
          
            message.channel.send(`O valor de 1 ${moedaBase} em ${moedaFinal} é R$${resultado}`)
            await browser.close();
          }
          robo(message.content);
        })
        .catch(collected => {
            message.channel.send('Tempo esgotado! Responda em 30 segundos da próxima vez...');
        });
    })

}});

client.login(config.token);