const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class BugCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bug',
			group: 'support',
			memberName: 'bug',
			description: `Create a bug report!`,
		});
	}

	run(message, args) {
        return;
	}
};