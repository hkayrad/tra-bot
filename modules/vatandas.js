module.exports = {
    name: "vatandas",
    description: "Gives vatandas role",
    vatandas(message) {
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
            let userName = user.displayName;

            if (user) {
                // Find the member in the server
                let member = message.guild.member(user);

                // Is user in the server
                if (member) {
                    member.roles.set([vatandas]);
                    message.channel.send(`${userName} has been promoted to 🤵🏿Vatandaş`);
                    setTimeout(() => {
                        message.channel.bulkDelete(2, true).catch((err) => {
                            console.log(err);
                            message.channel.send(
                                "There was an error while trying to clear messages in this channel! Please check the console for error log!"
                            );
                        });
                    }, 5000);
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
    }
}