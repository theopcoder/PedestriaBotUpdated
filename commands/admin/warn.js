const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class WarnCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			group: 'admin',
			memberName: 'warn',
			description: 'Warns a user!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		if (message.member.hasPermission("MANAGE_MESSAGES")){
			const test = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(test);
			return;
		}
	}
};