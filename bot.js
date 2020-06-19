// Importing requirements
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

// Creating client from Discord variable
const client = new Discord.Client();

client.once("ready", () => {
	console.log("Ready");
});

client.on("message", (message) => {
	//console.log(message.content);

	if (message.content.startsWith(`${prefix}vatandas`)) {
		//message.channel.send("Pong");

		let vatandas = message.guild.roles.cache.find(
			(role) => role.name === "🤵🏿Vatandaş"
		);
		let user = message.mentions.users.first();

		if (user) {
			let member = message.guild.member(user);

			if (member) {
				member.roles.set([vatandas]);
			} else {
				message.channel.send("This user is not in this server!");
			}
		} else {
			message.channel.send("There is no such user with this name!");
		}
	} else if (message.content.startsWith(`${prefix}kick`)) {
		let member = message.mentions.members.first();

		if (member) {
			member.kick().then((member) => {
				message.channel.send(
					":wave:" +
						member.displayName +
						" has been kicked from the server!"
				);
			});
		}
	} else if (message.content.startsWith(`${prefix}ban`)) {
		let member = message.mentions.members.first();

		if (member) {
			member.ban().then((member) => {
				message.channel.send(
					":wave:" +
						member.displayName +
						" has been banned from the server!"
				);
			});
		}
	}
});

client.login(token);
