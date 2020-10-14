const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class StatsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			group: 'simple',
			memberName: 'stats',
			description: 'Shows you your stats!',
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let MentionedStatsUser = message.guild.member(message.mentions.users.first());
        if (MentionedStatsUser){
            message.reply(":warning: You can't view other peoples stats!");
            return;
        }
        let RepP = db.get(`{reputation}_${message.author.id}`); if (RepP == null)RepP = "0";//TODO Update this to new db format
        let Level = db.get(`{Level}_${message.author.id}`); if (Level == null)Level = "0";
        let Money = db.get(`{money}_${message.author.id}`); if (Money == null)Money = "0";
        let WarnP = db.get(`{warnp}_${message.author.id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.author.id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.author.id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.author.id}`); if (BanP == null)BanP = "0";
        let XP = db.get(`{xp}_${message.author.id}`); if (XP == null)XP = "0";

        const UserStats = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#ADD8E6")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail(message.author.avatarURL())
            .setTitle("Stats")
            .setDescription(`
                **Rank:** Level, ${Level} | XP, ${XP}
                **Balance:** ${Money}
                **Violations:** ${RepP}
                **Other Offences:** Warnings: ${WarnP} | Mutes: ${MuteP} | Kicks: ${KickP} | Bans: ${BanP}
            `)
        message.channel.send(UserStats);
	}
};