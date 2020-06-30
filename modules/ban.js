module.exports = {
    name: "ban",
    description: "Bans the mentioned user.",
    ban(message) {
        // Is anyone mentioned
        if (!message.mentions.users.size) {
            return message.reply(
                "You need to tag a user in order to ban them!"
            );
        } else {
            // Parse the mentioned user
            let member = message.mentions.members.first();
            let userName = member.displayName;

            // Kick the mentioned user
            if (member) {
                member.ban();
                message.channel.bulkDelete(1, true).catch((err) => {
                    console.log(err);
                    message.channel.send(
                        "There was an error while trying to clear messages in this channel! Please check the console for error log!"
                    );
                });
                message.channel.send(
                    `:wave ${userName} has been banned from the server!`
                );
                setTimeout(() => {
                    message.channel.bulkDelete(1, true).catch((err) => {
                        console.log(err);
                        message.channel.send(
                            "There was an error while trying to clear messages in this channel! Please check the console for error log!"
                        );
                    });
                }, 5000);
            }
        }
    }
}