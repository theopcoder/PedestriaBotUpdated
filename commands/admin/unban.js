const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class UnbanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unban',
			group: 'admin',
			memberName: 'unban',
			description: 'Unbans a user!',
		});
	}

	run(message, args) {
		//This command will need to use user ID's
		if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		if (!message.member.hasPermission("BAN_MEMBERS")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000})
			});
			return;
		}
		let UnbannedUser = message.guild.member(message.mentions.users.first());
        if(!UnbannedUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (UnbannedUser.hasPermission("MANAGE_MESSAGES")){
			const StaffUserMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(StaffUser)
			message.channel.send(StaffUserMessage).then(message => {
				message.delete({timeout: 10000})
			});
            return;
		}
		let words = args.split(' ');
		let reason = words.slice(1).join(' ');
        if (!reason){
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the unban!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		var UnbanViolationNumber = db.add(`{UnbanViolationNumber}_${message.mentions.users.first().id}`, 1);
		db.push(`{UnbanReason}_${message.mentions.users.first().id}`, `**Ban ${UnbanViolationNumber}:** ${words.slice(1).join(' ')}`);
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

		UnbannedUser.send(`You have been ban from ${message.guild.name} because, ${reason}.`).then(message => {
			UnbannedUser.ban({reason: reason});
		});

		const ChatBanMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Ban")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${UnbannedUser}
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
				**Banned User:** ${UnbannedUser}
				**User ID:** ${message.mentions.users.first().id}
				**Reason:** ${reason}
				**Total Offences:** ${Violations}
				**Other Offences:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
			`)
		let LogChannel = message.guild.channels.cache.get(LogChannelID);
		LogChannel.send(BanLogMessage);
	}
};