const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class StoreCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'store',
			group: 'economy',
			memberName: 'store',
			description: 'Allows you to buy items from the bot store!',
		});
	}

	run(message, args) {
        
	}
};