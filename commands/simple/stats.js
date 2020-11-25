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
        let Violations = db.get(`${message.author.id}.admin.violations`); if (Violations == null)Violations = "0";
        let Warnings = db.get(`${message.author.id}.admin.warnings`); if (Warnings == null)Warnings = "0";
        let Level = db.get(`${message.author.id}.basic.level`); if (Level == null)Level = "0";
        let Money = db.get(`${message.author.id}.basic.money`); if (Money == null)Money = "0";
        let Mutes = db.get(`${message.author.id}.admin.mutes`); if (Mutes == null)Mutes = "0";
        let Kicks = db.get(`${message.author.id}.admin.kicks`); if (Kicks == null)Kicks = "0";
        let Bans = db.get(`${message.author.id}.admin.bans`); if (Bans == null)Bans = "0";
        let XP = db.get(`${message.author.id}.basic.xp`); if (XP == null)XP = "0";

        const UserStats = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#ADD8E6")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail(message.author.avatarURL())
            .setTitle("Stats")
            .setDescription(`
                **Rank:** Level, ${Level} | XP, ${XP}
                **Balance:** ${Money}
                **Violations:** ${Violations}
                **Other Offences:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
            `)
        message.channel.send(UserStats);
        //TODO move -ui to here
	}
};