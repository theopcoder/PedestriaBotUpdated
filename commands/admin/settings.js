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
			description: 'Configure the bot settings.',
		});
	}

	run(message, args) {
		if(!message.member.hasPermission("ADMINISTRATOR")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000})
			});
			return;
		}
		let setting = "Null";

		//Setting Turned On
		let SettingOn = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#008000")
			.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHOE6W5TPcNNcN3q4IOLbjm9GkWgxtsG8JUQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
			.setDescription(`
				Turned on: ${setting}
			`)
		message.channel.send(SettingOn);

		//Setting Turned Off
		const SettingOff = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#FF0000")
			.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTnJvyL87Y_UNJSonX5e-H6-KCfmleTU2zmQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
			.setDescription(`
				Turned off: ${setting}
			`)
		message.channel.send(SettingOff);

		if (db.get(`StaffApplicationsSetting`)== 1){
			let SA = ":white_check_mark: On"
		}else{
			SA = ":x: Off"
		}
		if (db.get(`DeadChatPingSetting`)== 1){
			let DCP = ":white_check_mark: On"
		}else{
			DCP = ":x: Off"
		}
		if (db.get(`AutoModerationSetting`)== 1){
			let AM = ":white_check_mark: On"
		}else{
			AM = ":x: Off"
		}
		if (db.get(`LevelUpsSetting`)== 1){
			let SA = ":white_check_mark: On"
		}else{
			LU = ":x: Off"
		}

		const SettingsMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("0xFFA500")
			.setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvypYAFynUpTRITuiYvJstD17LjWB2zIzfLA&usqp=CAU')//I do not own this image. The image is from google.com. Click the link for the image
			.setTitle("Settings")
			.setDescription(`
				Staff Applications: ${SA}
				Dead Chat Pings: ${DCP}
				Auto Moderation: ${AM}
				Level Ups: ${LU}
			`)
			.setFooter("If you need help with settings, do -settings help")
		message.channel.send(SettingsMessage);
	}
};