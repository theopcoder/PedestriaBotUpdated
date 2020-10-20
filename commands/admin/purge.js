const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PurgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			group: 'admin',
			memberName: 'purge',
			description: 'Bulk deletes a group of messages!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
		if(!message.member.hasPermission("MANAGE_MESSAGES"))
        {
            message.channel.send(PermissionError).then(message => {
				message.delete({timeout: 10000});
			});
            return;
		}
        let words = args.split(' ');
		let DeletedMessage = words.slice(0).join(' ');
		message.delete();
		if (!DeletedMessage){
			message.reply("Incomplete command! Example: -purge 5").then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (DeletedMessage == "1"){
			message.reply("You must purge 2 or more messages!").then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		message.channel.bulkDelete(words[0]);
	}
};