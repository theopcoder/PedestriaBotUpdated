const { CommandoClient } = require("discord.js-commando"); //Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help.
const BotData = require("./BotData.js");//Imports custom BotData information for the bot.
const discord = require("discord.js"); //Refer to https://discord.js.org/#/docs/main/12.3.1/general/welcome for help.
const token = require("./Token.js"); //Imports the token key for the bot to launch.
const db = require("quick.db"); //Refer to https://quickdb.js.org/overview/docs for help.
const path = require("path");

const bot = new CommandoClient({
	commandPrefix: BotPrefix,
});

bot.registry
	.registerDefaultTypes()
	.registerGroups([
        ['admin', 'Admin'],
        ['economy', 'Economy'],
        ['other', 'Other'],
        ['simple', 'Simple'],
        ['support', 'Support'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
//End of command registration
bot.login(key);

bot.on('ready', function(){
    //bot.SetActivity(ActivityMessage);
    console.log(`Successfully Signed Into: ${bot.user.tag}`);
    console.log(`Bot Developer: ${Developer}`);
    console.log(`Running Version: ${Version}`);
});

//Default Bot Settings | Don't touch!
if (db.get("StaffApplicationsSetting")== null)db.add("StaffApplicationsSetting", StaffApplicationsSetting);
if (db.get("AutoModerationSetting")== null)db.add("AutoModerationSetting", AutoModerationSetting);
if (db.get("DeadChatPingSetting")== null)db.add("DeadChatPingSetting", DeadChatPingSetting);
if (db.get("LevelUpsSetting")== null)db.add("LevelUpsSetting", LevelUpsSetting);
//---------------------------------------------------------------------------

//New Members
bot.on('guildMemberAdd', member => {
    const NewMemberMessage = new discord.MessageEmbed()
        .setColor("#90ee90")
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .addField("Information:", `
            :shopping_cart: https://store.pedestriamc.com/
            :globe_with_meridians: https://www.pedestriamc.com/
            :satellite: play.pedestriamc.com
        `)
        .addField("Welcome", "Don't forget to read <#703833697153187840> and <#704893263177580544>! Have fun!")
    let NewMemberChannel = member.guild.channels.cache.get(WelcomeChannelID);
    NewMemberChannel.send(NewMemberMessage);

    let MemberRole = member.guild.roles.cache.get(NewMemberRoleID);
    member.roles.add(MemberRole);
});

//Message Responses
bot.on('message', function(message){
    if (db.get("ping")== 1){
        message.delete();
        return;
    }
    if(db.get("LevelUpsSetting")== 0){
        return;
    }else{
        if (message.author.bot)return;
        var RandomXP = Math.floor(Math.random() * MaxRandomXP);
        db.add(`${message.author.id}.basic.xp`, RandomXP + 1);
    }
    //Level Up System
    if (db.get(`${message.author.id}.basic.xp`) > MaxXP){
        if (message.author.bot)return;
        if (message.guild === null)return;
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
bot.on('message', function(message){
    if (db.get(`AutoModerationSetting`)== 0){
        return;
    }else{
        if (message.guild === null)return;
        if (message.author.bot)return;
        //Mute Bypass Protection
        if (db.get(`${message.author.id}.admin.Mutes.CurrentlyMuted`)== 1){
            message.delete();
            let MuteRole = message.guild.roles.cache.get(MuteRoleID);
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
        var profanities =                                                                                                                                                                                           ["bitch", "fuck", "shit", "sex", "porn", "dick", "penis", "scum", "cum", "yee"];//TODO remove yee from chat filter
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
    }
});

bot.on('messageDelete', async (message) => {
    if (db.get("AutoModerationSetting")== 0){
        return;
    }else{
        if (message.guild === null)return;
        const DeletedMessageLog = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#fc3c3c")
            .setThumbnail(message.author.displayAvatarURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle("Deleted Message")
            .setDescription(`
                **Author:** ${message.author}
                **Channel:** ${message.channel}
                **Message:** ${message.content}
            `)
            .setFooter(`Message ID: ${message.id}\nAuthor ID: ${message.author.id}`)
        let DeletedMessageLogChannel = message.guild.channels.cache.get(DeletedMessageLogChannelID);
        DeletedMessageLogChannel.send(DeletedMessageLog);
    }
});

//Dead Chat Pings
bot.on('ready', () => {
    setInterval(() => {
        if (db.get("DeadChatPingSetting")== 0){
            return;
        }else{
            var PingChannel = bot.channels.cache.get(DCPPingChannelID);
            var DeadChatQuestion = Math.round(Math.random() * 19);
            if (DeadChatQuestion == 0){DCPQuestion = "Which is better? Java or Bedrock Minecraft?"};
            if (DeadChatQuestion == 1){DCPQuestion = "Do you have a pre built or custom pc?"};
            if (DeadChatQuestion == 2){DCPQuestion = "Does pineapple belong on pizza?"};
            if (DeadChatQuestion == 3){DCPQuestion = "Survival or Creative Minecraft?"};
            if (DeadChatQuestion == 4){DCPQuestion = "What's your favorite activity?"};
            if (DeadChatQuestion == 5){DCPQuestion = "To be, or not to be, a potato?"};
            if (DeadChatQuestion == 6){DCPQuestion = "What's your favorite console?"};
            if (DeadChatQuestion == 7){DCPQuestion = "What's your favorite food?"};
            if (DeadChatQuestion == 8){DCPQuestion = "How has quarantine been?"};
            if (DeadChatQuestion == 9){DCPQuestion = "Windows, Mac or Linux?"};
            if (DeadChatQuestion == 10){DCPQuestion = "Are you reading this?"};
            if (DeadChatQuestion == 11){DCPQuestion = "Are you a communist?"};
            if (DeadChatQuestion == 12){DCPQuestion = "Where you sleeping?"};
            if (DeadChatQuestion == 13){DCPQuestion = "Are dogs communist?"};
            if (DeadChatQuestion == 14){DCPQuestion = "How have you been?"};
            if (DeadChatQuestion == 15){DCPQuestion = "Iphone or Android?"};
            if (DeadChatQuestion == 16){DCPQuestion = "Do you have pets?"};
            if (DeadChatQuestion == 17){DCPQuestion = "Airplane or Car?"};
            if (DeadChatQuestion == 18){DCPQuestion = "Ping!"};

            const DeadChatPing = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("RANDOM")
                .setTitle("Dead Chat Ping!")
                .addField(DCPQuestion, `<@&${DCPPingRoleID}>`)
            PingChannel.send(DeadChatPing);

            db.add("ping", 1);
            PingChannel.send(`<@&${DCPPingRoleID}>`);
        }
    }, 1000 * 60 * 60 * DCPTime);
});