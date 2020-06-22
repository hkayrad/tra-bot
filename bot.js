// Importing requirements
const fs = require("fs");
const Discord = require("discord.js");
const {
	prefix,
	token
} = require("./config.json");

// Creating client from Discord variable
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Retrieve all modules
const commandFiles = fs.readdirSync("./modules").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./modules/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command)
}

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

		console.log(`${command} has been executed.`);

		// If command is vatandas
		if (command == "vatandas") {
			try {
				client.commands.get("vatandas").vatandas(message, args);
			} catch (error) {
				console.log(error);
				message.reply("There was an error while trying to clear messages in this channel! Please check the console for error log!")
			}
		} else if (command == "kick") {
			try {
				client.commands.get("kick").kick(message, args);
			} catch (error) {
				console.log(error);
				message.reply("There was an error while trying to kick the user! Please check the console for error log!")
			}
		} else if (command == "ban") {
			try {
				client.commands.get("ban").ban(message, args);
			} catch (error) {
				console.log(error);
				message.reply("There was an error while trying to ban the user! Please check the console for error log!")
			}
		} else if (command == "clear") {
			try {
				client.commands.get("clear").clear(message, args);
			} catch (error) {
				console.log(error);
				message.reply("There was an error while trying to delete messages! Please check the console for error log!")
			}
		}
	}
});

// Run the bot
client.login(token);