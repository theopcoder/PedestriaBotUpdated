const { CommandoClient } = require("discord.js-commando"); //Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help.
const BotData = require("./BotData.js");//Imports custom BotData information for the bot.
const discord = require("discord.js"); //Refer to https://discord.js.org/#/docs/main/12.3.1/general/welcome for help.
const token = require("./Token.js"); //Imports the token key for the bot to launch.
const db = require("quick.db"); //Refer to https://quickdb.js.org/overview/docs for help.
const path = require("path"); //

const bot = new CommandoClient({
	commandPrefix: '-',
});

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
    console.log(`Bot Developer: ${Developer}`);
    console.log(`Running Version: ${Version}`);
});
//---------------------------------------------------------------------------

//Message Responses
bot.on('message', function(message){
    if (db.get(`${message.author.id}.DataTransferComplete`)== 1){
        return;
    }else{
        let Money = db.get(`{money}_${message.author.id}`); if (Money == null)Money = "0";
        db.add(`${message.author.id}.basic.money`, Money);
    }
    
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
        db.add(`${message.author.id}.basic.money`, 1000)
    }
    if (message.content == "-flip"){//TODO add a check for commands not in the right channel?
        message.reply("YEET")
    }
    if (message.content == "restart"){
        message.reply("Restarting...")
        console.log("1");
        bot.destroy().then(() => {
            console.log("2");
            bot.login(key);
            console.log("3");
            message.reply("Bot is back on!");
            console.log("4");
        });
        //console.log("5");
    }
});

//Auto Moderation
bot.on('message', function(message){
    if (db.get(`placeholder`)== 0){
        return;
    }else{
        if (message.author.bot)return;
        if (message.guild === null)return;
        //Mute Bypass Protection
        if (db.get(`${message.author.id}.admin.Mutes.CurrentlyMuted`)== 1){
            message.delete();
            let MuteRole = message.guild.roles.cache.get("773064107993071617");
            message.member.roles.add(MuteRole);

            const MuteBypassMessage = new discord.MessageEmbed()
                .setColor("#4b5054")
                .setThumbnail(message.author.displayAvatarURL())
                .setTitle("Mute Bypass")
                .setDescription(`
                    **User:** ${message.author}
                    **Time Bypassed Mute:** 
                `)
            message.channel.send(MuteBypassMessage);
        }
        //Chat Filter
        var profanities =                                                                                                                                                                                           ["bitch", "fuck", "shit", "sex", "porn", "dick", "penis", "scum", "cum", "yee"];
        let msg = message.content.toLowerCase();
        for (x = 0; x < profanities.length; x++){
            if (msg.includes(profanities[x])){
                message.delete();
                db.add(`{AMPSChatFilter}_${message.author.id}`, 1);
                const ChatFilterMessage = new discord.MessageEmbed()
                    .setColor("0xFFFF00")
                    .setTimestamp()
                    .setThumbnail(message.author.displayAvatarURL())
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setTitle("Auto Moderation: Chat Filter")
                    .setDescription(`${message.author}, cursing is **NOT** allowed on this server!`)
                message.channel.send(ChatFilterMessage).then(message => {
                    message.delete({timeout: 15000});
                });
            }
        }
        //Deleted Message

        //Edited Messages

    }
});

bot.on('messageDelete', async (message) => {
    const entry = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' }).then(audit => audit.entries.first())
    let user = entry.executor.username
    if (entry.createdTimestamp > Date.now() - 2000) {
        return user;
    }
    else if (!entry.createdTimestamp > Date.now() - 1500) {
        return message.author.username;
    }
    else {
        message.author.username;
    }

    const DeletedMessageLog = new discord.MessageEmbed()
        .setTimestamp()
        .setColor("#fc3c3c")
        .setThumbnail(message.author.displayAvatarURL())
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp("Deleted Message")
        .setDescription(`
            **Author:** ${message.author}
            **Executer:** ${username}
            **Channel:** ${message.channel}
            **Message:** ${message.content}
        `)
        .setFooter(`Message ID: ${message.id}\n Author ID: ${message.author.id}`)
    let DeletedMessageLogChannel = message.guild.channels.cache.get(DeltedMessageLogChannelID);
    DeletedMessageLogChannel.send(DeletedMessageLog);
    //Added new role
    //Deleted Role
    //Gave member role
    //Memeber had role removed
});

//Level Up System
bot.on('message', function(message){
    if (message.author.bot)return;
    if (message.guild === null)return;
    //TODO add a check for if the MLS is on from settings | if (db.get("Bot.Settings.MLS")== 0)return;
    var RandomXP = Math.floor(Math.random() * MaxRandomXP);
    db.add(`${message.author.id}.basic.xp`, RandomXP + 1);

    if (db.get(`${message.author.id}.basic.xp`) > MaxXP){
        db.delete(`${message.author.id}.basic.xp`);
        db.add(`${message.author.id}.basic.level`, 1);
        db.add(`${message.author.id}.basic.money`, LevelUpMoney);

        const LevelUpMessage = new discord.MessageEmbed()
            .setColor('0x0000FF')
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setTitle(":tada: Level Up!")
            .setDescription(`
                **User:** ${message.author}
                **Level:** ${db.get(`${message.author.id}.basic.level`)}
            `)
            .setFooter("You have recieved $200! Nice job!")
        let LevelUpChannel = message.guild.channels.cache.get(LevelUpChannelID);
        LevelUpChannel.send(LevelUpMessage);
    }
});