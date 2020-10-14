const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SuggestCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'suggest',
			group: 'support',
			memberName: 'suggest',
			description: `Allows you to send suggestions!`,
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        message.delete();
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        if (!reason) return message.reply(":warning: Incomplete command! What's your suggestion?")
        .then(message => {
            message.delete({timeout: 10000});
        });

        const SuggestionMessage = new discord.MessageEmbed()
            .setColor("#20B2AA")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setTitle('Suggestion')
            .setDescription(`
                **User:** ${message.author}
                **Suggestion:** ${reason}
            `)
        let SuggestionChannel = message.guild.channels.cache.find(channel => channel.name === 'suggestions');
        SuggestionChannel.send(SuggestionMessage).then(MessageEmbed => {
            MessageEmbed.react("✅");
            MessageEmbed.react("❌");
        });

        const UserSuggestionDMMessage = new discord.MessageEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setTitle("Suggestion")
            .setDescription(`${reason}`)
            .setFooter(`Thanks for your suggestion ${message.author.username}!`)
        message.member.send(UserSuggestionDMMessage);
	}
};