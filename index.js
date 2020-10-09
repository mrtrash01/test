const discord = require("discord.js");;
const fs = require("fs");


const client = new discord.Client();
client.commands = new discord.Collection();

client.on("message", async message => {
    var prefix = "!";
    var messageArray = message.content.split(" ");
var command = messageArray[0];
var arguments = messageArray.slice(1);
var commands = client.commands.get(command.slice(prefix.length));
if(commands) commands.run(client, message, arguments);
})
//commmand handler
//commmand handler

fs.readdir('./commands/', (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() == "js");

    if(jsFiles.length <=0) {
        console.log("I cannot find any file");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} has been loaded`);

        client.commands.set(fileGet.help.name, fileGet);
    })
});
//commmand handler
//commmand handler

client.on("ready", async () => {
    console.log(`${client.user.username} is online`) 
    client.user.setActivity('scripts', {type: "TESTING"})
})



client.on("guildMemberAdd", member =>{

    var role = member.guild.roles.cache.get('726787930483326978');

    if(!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('726841387282071577')

    if(!channel) return;

    channel.send(`${member} joined the server, Wecome!`)
})






client.login(process.env.token);