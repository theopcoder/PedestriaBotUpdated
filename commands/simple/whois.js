const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class WhoIsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'whois',
			group: 'simple',
			memberName: 'whois',
			description: 'Shows some information on a user!',
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let MentionedStatsUser = message.guild.member(message.mentions.users.first());
        if (MentionedStatsUser){
            let users = message.mentions.users.first();
    
            const MentionedUserStats = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#ADD8E6")
                .setAuthor(`Data Requester: ${message.author.tag}`, message.author.displayAvatarURL())
                .setThumbnail(users.displayAvatarURL())
                .setTitle("User Stats")
                .setDescription(`
                    ${message.mentions.users.first()}
                `)
                .addField("Joined", `${message.member.joinedAt}`, true)
                .addField("Registered", `h`, true)
                .addField(`Roles [$]`, `g`)
                .addField("Key Permissions", "perms here")
                .addField("Achnowledgements", "admin")
                .setFooter(`${message.mentions.users.first().id}`)
            return message.channel.send(MentionedUserStats);
        }
        let Violations = db.get(`${message.author.id}.admin.violations`); if (Violations == null)Violations = "0";
        let Warnings = db.get(`${message.author.id}.admin.warnings`); if (Warnings == null)Warnings = "0";
        let Level = db.get(`${message.author.id}.basic.level`); if (Level == null)Level = "0";
        let Money = db.get(`${message.author.id}.basic.money`); if (Money == null)Money = "0";
        let Mutes = db.get(`${message.author.id}.admin.mutes`); if (Mutes == null)Mutes = "0";
        let Kicks = db.get(`${message.author.id}.admin.kicks`); if (Kicks == null)Kicks = "0";
        let Bans = db.get(`${message.author.id}.admin.bans`); if (Bans == null)Bans = "0";
        let XP = db.get(`${message.author.id}.basic.xp`); if (XP == null)XP = "0";

        const WhoIs = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#ADD8E6")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("Stats")
            .setDescription(`
                **Rank:** Level, ${Level} | XP, ${XP}
                **Balance:** $${Money}
                **Violations:** ${Violations}
                **Other Violations:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
            `)
        message.channel.send(WhoIs);
	}
};