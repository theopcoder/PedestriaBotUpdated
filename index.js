const { CommandoClient } = require("discord.js-commando"); //Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help.
const BotData = require("./BotData.js");
const discord = require("discord.js"); //Refer to https://discord.js.org/#/docs/main/12.3.1/general/welcome for help.
const token = require("./Token.js");
const db = require("quick.db"); //Refer to https://quickdb.js.org/overview/docs for help.
const path = require("path");

const bot = new CommandoClient({
	commandPrefix: '-',
});

var Owner = "TheMLGDude#2177 | theopcoder";//TODO move to BotData.js
var Version = "0.0.5";

bot.registry
	.registerDefaultTypes()
	.registerGroups([
        ['admin', 'Admin'],
        ['economy', 'Economy'],
        ['simple', 'Simple'],
        //['staffsignup', 'ApplicationCommands'],
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
});

//Auto Moderation


//Level Up System
bot.on('message', function(message){
    if (message.author.bot)return;
    //if (db.get("Bot.Settings.MLS")== 0)return;//TODO Add Level Up System to settings
    db.add(`${message.author.id}.basic.xp`, 1)
    //TODO add randomized xp?

    if (db.get(`${message.author.id}.basic.xp`)== 5){//TODO replace 5 with 60
        db.subtract(`${message.author.id}.basic.xp`, 5);//TODO Replace 5 with 60
        db.add(`${message.author.id}.basic.level`, 1);
        db.add(`${message.author.id}.basic.money`, 200);

        const LevelUpMessage = new discord.MessageEmbed()
            .setColor('0x0000FF')
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setTitle("Level Up!")//TODO define the levels
            .setDescription(`
                **User:** ${message.author}
                **Level:** ${db.get(`${message.author.id}.basic.level`)}
            `)
            .setFooter("You have recieved $200! Nice job!")
        let LevelUpChannel = message.guild.channels.cache.get('765786737859231754');//TODO Replace this with the proper channel id for pedestia before the official update
        LevelUpChannel.send(LevelUpMessage);
    }
});