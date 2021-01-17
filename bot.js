const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Bot foi iniciado no servidor da Airsoft!`);
    client.user.setActivity('tua tia banguela na cama', { type: 'PLAYING' });(`Eu estou em ${client.guilds.cache.size} servidores`);
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor.`);
    client.user.setActivity(`Estou no servidor da Airsoft!`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor.`);
    client.user.setActivity(`Não estou no servidor da Airsoft!`);
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`🏓 | Pong!\nLatência do Server: *${m.createdTimestamp - message.createdTimestamp}ms.*\nLatência da API: *${Math.round(client.ws.ping)}ms.* `);
}
});

client.login(config.token);