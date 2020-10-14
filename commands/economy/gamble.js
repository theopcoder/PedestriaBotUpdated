const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class GambleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gamble',
			group: 'economy',
			memberName: 'gamble',
			description: 'Allows you to gamble!',
		});
	}

	run(message, args) {
        
	}
};