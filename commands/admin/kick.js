const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class KickCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'admin',
			memberName: 'kick',
			description: 'Kicks a user',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		
		const KickLogMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setTitle()
			.setDescription(`
				**${User}**
				**Moderator:** ${message.author}
			`)
		message.channel.send('');//TODO add a global var in BotData.js and have it determined in the log channel message
	}
};