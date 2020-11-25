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
		let UnmutedUser = message.guild.member(message.mentions.users.first());
        if(!UnmutedUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (UnmutedUser.hasPermission("MANAGE_MESSAGES")){
			const StaffUserMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(StaffUser)
			message.channel.send(StaffUserMessage).then(message => {
				message.delete({timeout: 10000})
			});
            return;
		}
		let words = args.split(' ');
		let time = words.slice(1).join(' ');
		let reason = words.slice(2).join(' ');
        if (!reason){
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the temporary mute!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

		message.reply(db.get(Mutes));
	}
};