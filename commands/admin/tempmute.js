const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class TempMuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tempmute',
			group: 'admin',
			memberName: 'tempmute',
			description: 'Temporarily mutes a user!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		if (!message.member.hasPermission("MANAGE_MESSAGES")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage);
			return;
		}
		let BannedUser = message.guild.member(message.mentions.users.first());
        if(!BannedUser) {
            message.channel.send(NullUser).then(message => {
                message.delete({timeout: 10000});
            });
            return;
		}
		if (BannedUser.hasPermission("MANAGE_MESSAGES")){
			const StaffUserMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(StaffUser)
			message.channel.send(StaffUserMessage);
            return;
		}
		let words = args.split(' ');
		let reason = words.slice(1).join(' ');
        if (!reason){
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the ban!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		db.add(`${message.mentions.users.first().id}.admin.Bans`, 1)
		db.add(`${message.mentions.users.first().id}.admin.Violations`, 1);
		var BanViolationNumber = db.add(`{BanViolationNumber}_${message.mentions.users.first().id}`, 1);
		db.push(`{BanReason}_${message.mentions.users.first().id}`, `**Ban ${BanViolationNumber}:** ${words.slice(1).join(' ')}`);
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let Warnings = db.get(`${message.author.id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let users = message.mentions.users.first();

		BannedUser.send(`You have been ban from ${message.guild.name} because, ${reason}.`).then(message => {
			BannedUser.ban({reason: reason});
		});

		const ChatBanMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Ban")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${BannedUser}
				**Reason:** ${reason}
			`)
		message.channel.send(ChatBanMessage);

		const BanLogMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Ban")
			.setDescription(`
				**Moderator:** ${message.author}
				**Banned User:** ${BannedUser}
				**User ID:** ${message.mentions.users.first().id}
				**Reason:** ${reason}
				**Total Offences:** ${Violations}
				**Other Offences:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
			`)
		let LogChannel = message.guild.channels.cache.get(LogChannelID);
		LogChannel.send(BanLogMessage);
	}
};