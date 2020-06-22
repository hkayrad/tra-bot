// Importing requirements
const Discord = require("discord.js");
const {
	prefix,
	token
} = require("./config.json");

// Creating client from Discord variable
const client = new Discord.Client();

// When bot is ready, it runs these commands.
client.once("ready", () => {
	console.log("Ready");
	client.user.setStatus("online");
	client.user.setActivity("commmands. (Being developed by Haqua)", {
		type: "LISTENING",
	});
});

// If user sent a message
client.on("message", (message) => {
	// Checks if message starts with prefix or it was sent from bot
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
		// If not it checks it runs codes below
	} else {
		// Parses the message
		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();

		// If command is vatandas
		if (message.content.startsWith(`${prefix}vatandas`)) {
			// Is anyone mentioned
			if (!message.mentions.users.size) {
				return message.reply(
					"You need to tag a user in order to change their roles!"
				);
			} else {
				// Find the role
				let vatandas = message.guild.roles.cache.find(
					(role) => role.name === "🤵🏿Vatandaş"
				);
				// Find the user
				let user = message.mentions.users.first();

				if (user) {
					// Find the member in the server
					let member = message.guild.member(user);

					// Is user in the server
					if (member) {
						member.roles.set([vatandas]);
					} else {
						//If not
						message.channel.send(
							"This user is not in this server!"
						);
					}
				} else {
					// If user is not present
					message.channel.send(
						"There is no such user with this name!"
					);
				}
			}
		} else if (message.content.startsWith(`${prefix}kick`)) {
			// Is anyone mentioned
			if (!message.mentions.users.size) {
				return message.reply(
					"You need to tag a user in order to kick them!"
				);
			} else {
				// Parse the mentioned user
				let member = message.mentions.members.first();

				// Kick the mentioned user
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
			// Is anyone mentioned
			if (!message.mentions.users.size) {
				return message.reply(
					"You need to tag a user in order to ban them!"
				);
			} else {
				// Parse the mentioned user
				let member = message.mentions.members.first();

				// Kick the mentioned user
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
			// Parse the amount from command
			const amount = parseInt(args[0]) + 1;

			if (isNaN(amount)) {
				// If amount is not present
				message.reply("Please enter a valid number!");
			} else if (amount <= 1 || amount > 1000) {
				// If amount is lower than 1 or higer than 1000
				message.reply("Please enter a number between 1 and 1000");
			} else {
				// Bulk delete messages
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

// Run the bot
client.login(token);