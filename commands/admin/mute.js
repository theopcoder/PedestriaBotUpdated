const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class MuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			group: 'admin',
			memberName: 'mute',
			description: 'Mutes a user!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
	}
};