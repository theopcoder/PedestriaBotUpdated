const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pay',
			group: 'economy',
			memberName: 'pay',
			description: 'Allows you to pay another user!',
		});
	}

	run(message, args) {
        
	}
};