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
        
	}
};