const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class RPSCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rps',
			group: 'simple',
			memberName: 'rps',
			description: 'Plays rock, paper, scissors!',
		});
	}

	run(message, args) {
        var chance = Math.floor(Math.random() * 5);
        if (chance == 0){
            return message.reply("I got rock");
        }
        if(chance == 1){
            return message.reply("I got paper");
        }
        if (chance == 2){
            return message.reply("I got scissors");
        }
        if (chance == 3){
            return message.reply("I got lizard");
        }
        if (chance == 4){
            return message.reply("I got spock");
        }
	}
};