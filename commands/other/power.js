const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PowerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'power',
			group: 'other',
			memberName: 'power',
			description: `Power commands for the bot.`,
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let words = args.split(' ');
        let PowerAction = words.slice(0).join(' ');
        if (!PowerAction) return message.reply(":warning: Do you want to restart or shutdown the bot?").then(message => {
            message.delete({timeout: 10000});
        });

        if (PowerAction == "restart"){

        }
        if (PowerAction == ""){

        }
	}
};