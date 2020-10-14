const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class UnmuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unmute',
			group: 'admin',
			memberName: 'unmute',
			description: 'Unmutes a user!',
		});
	}

	run(message, args) {
        
	}
};