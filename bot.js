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

	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	} else {
		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();

		if (message.content.startsWith(`${prefix}vatandas`)) {
			if (!message.mentions.users.size) {
				return message.reply(
					"You need to tag a user in order to change their roles!"
				);
			} else {
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
						message.channel.send(
							"This user is not in this server!"
						);
					}
				} else {
					message.channel.send(
						"There is no such user with this name!"
					);
				}
			}
		} else if (message.content.startsWith(`${prefix}kick`)) {
			if (!message.mentions.users.size) {
				return message.reply(
					"You need to tag a user in order to kick them!"
				);
			} else {
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
			}
		} else if (message.content.startsWith(`${prefix}ban`)) {
			if (!message.mentions.users.size) {
				return message.reply(
					"You need to tag a user in order to ban them!"
				);
			} else {
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
		} else if (message.content.startsWith(`${prefix}clear`)) {
			const amount = parseInt(args[0]) + 1;

			if (isNaN(amount)) {
				message.reply("Please enter a valid number!");
			} else if (amount <= 1 || amount > 1000) {
				message.reply("Please enter a number between 1 and 1000");
			} else {
				message.channel.bulkDelete(amount, true).catch((err) => {
					console.log(err);
					message.channel.send(
						"There was an error while trying to clear messages in this channel! Please check the console for error log!"
					);
				});
			}
		}
	}
});

client.login(token);
