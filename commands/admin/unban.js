const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class UnbanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unban',
			group: 'admin',
			memberName: 'unban',
			description: 'Unbans a user!',
		});
	}

	run(message, args) {
        //This command will need to use user ID's
	}
};