const { CommandoClient } = require("discord.js-commando");
const BotData = require("./BotData.js");
const discord = require("discord.js");
const token = require("./Token.js");
const db = require("quick.db");
const path = require("path");

const bot = new CommandoClient({
	commandPrefix: '-',
});

var Owner = "TheMLGDude#2177 | theopcoder";//TODO move to BotData.js
var Version = "0.0.2";

bot.registry
	.registerDefaultTypes()
	.registerGroups([
        ['admin', 'Admin'],
        ['economy', 'Economy'],
        ['simple', 'Simple'],
        ['staffsignup', 'ApplicationCommands'],
        ['support', 'Support'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
//End of command registration

bot.login(key);

bot.on('ready', function(){
    console.log(`Successfully Signed Into: ${bot.user.tag}`);
    console.log(`Bot Developer: ${Owner}`);
    console.log(`Running Version: ${Version}`);
});
//---------------------------------------------------------------------------

//Message Responses
bot.on('message', function(message){
    if (message.content == "1234"){
        if (message.author.bot)return;
        message.reply("I declare a Ginger war!");
    }
    if (message.content == "4321"){
        if (message.author.bot)return;
        message.reply("Are you sure about that?");
    }
    if (message.content == "pizza"){
        if (message.author.bot)return;
        message.reply("Can I have a slice of pizza? Please?");
    }
    if (message.content == "test"){//TODO make sure this is not added
        message.reply(Error1)
        message.reply(Error2)
        message.reply(Error3)
        message.reply(Error4)
    }
});