const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PerformanceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pf',
			group: 'other',
			memberName: 'pf',
			description: `Performance command for the bot!`,
		});
	}

	run(bot, message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		
		const PerformanceMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("")
			.setTitle("performance Stats")
			.setDescription(`
				Used RAM: 
				RAM: 
				Ping: 
				CPU: 
			`)
		message.channel.send(PerformanceMessage);
	}
};