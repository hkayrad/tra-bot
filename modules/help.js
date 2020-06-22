module.exports = {
    name: "help",
    description: "Prints the help menu.",
    help(message) {
        message.channel.send(
            "```!help```: Prints out this menu. \n ```!kick```: Kicks the mentioned user. \n ```!ban```: Bans the mentioned user. \n ```!clear```: Clears the given amount of messages."
        );
    }
}