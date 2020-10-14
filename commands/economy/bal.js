const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class BalanceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bal',
			group: 'economy',
			memberName: 'bal',
			description: 'Allows you to check you balance!',
		});
	}

	run(message, args) {
        
	}
};