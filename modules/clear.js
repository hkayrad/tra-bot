module.exports = {
    name: "clear",
    description: "Clears the given amount of messages.",
    clear(message, args) {
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