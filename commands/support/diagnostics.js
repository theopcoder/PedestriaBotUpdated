const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class DiagnosticsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'diagnostics',
			group: 'support',
			memberName: 'diagnostics',
            description: `This runs a diagnostics test and fixes any database issues you may be expiriencing.`,
		});
	}

	run(message, args) {
        //TODO add this command to fix any issues a user might encounter in the quick.db
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        return message.reply("Not Done");
	}
};