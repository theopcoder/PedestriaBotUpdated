const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SettingsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'settings',
			group: 'admin',
			memberName: 'settings',
			description: 'Controls the bot settings!',//TODO redo description?
		});
	}

	run(message, args) {
        
	}
};