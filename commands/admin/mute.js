const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class MuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			group: 'admin',
			memberName: 'mute',
			description: 'Mutes a user!',
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
		let MutedUser = message.guild.member(message.mentions.users.first());
        if(!MutedUser) {
            message.channel.send(NullUser).then(message => {
                message.delete({timeout: 10000});
            });
            return;
		}
		if (MutedUser.hasPermission("MANAGE_MESSAGES")){
			const StaffUserMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(StaffUser)
			message.channel.send(StaffUserMessage);
            return;
		}
		//TODO add a check if the user is already muted?
		let words = args.split(' ');
		let reason = words.slice(1).join(' ');
        if (!reason){
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the mute!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		db.add(`${message.mentions.users.first().id}.admin.Mutes`, 1)
		db.add(`${message.mentions.users.first().id}.admin.Violations`, 1);
		var MuteViolationNumber = db.add(`{MuteViolationNumber}_${message.mentions.users.first().id}`, 1);
		db.push(`{MuteReason}_${message.mentions.users.first().id}`, `**Mute ${MuteViolationNumber}:** ${words.slice(1).join(' ')}`);
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let Warnings = db.get(`${message.author.id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let users = message.mentions.users.first();

		MutedUser.send(`You have been muted on ${message.guild.name} because, ${reason}.`);
		let role = message.guild.roles.cache.get("773064107993071617");
		MutedUser.roles.add(role);

		const ChatMuteMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Mute")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${MutedUser}
				**Reason:** ${reason}
			`)
		message.channel.send(ChatMuteMessage);

		const MuteLogMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Mute")
			.setDescription(`
				**Moderator:** ${message.author}
				**Muted User:** ${MutedUser}
				**User ID:** ${message.mentions.users.first().id}
				**Reason:** ${reason}
				**Total Offences:** ${Violations}
				**Other Offences:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
			`)
		let LogChannel = message.guild.channels.cache.get(LogChannelID);
		LogChannel.send(MuteLogMessage);
	}
};