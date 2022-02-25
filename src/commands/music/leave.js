const { SlashCommandBuilder } = require('@discordjs/builders');
const { audio, client } = require("../../index");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

const name = "leave";
const description = "Stop the bot from playing your queue";

module.exports = {
    name,
    description,
    builder: new SlashCommandBuilder().setName(name).setDescription(description),
    slashCommand(interaction, args) {
        const channel = client.channels.cache.get(interaction.channelId);
        execute(args, channel, interaction.member).then((response, err) => {
            if (err) return console.error(err);

            interaction.editReply(response);
        });
    },
    messageCommand(message, args) {
        execute(args, message.channel, message.member).then((response, err) => {
            if (err) return console.error(err);

            message.channel.send(response).then(message => {
                setTimeout(() => {
                    message.delete();
                }, 30000);
            });
        });
    }
}

async function execute(args, channel, member) {
    return audio.stop(channel, member);
}
