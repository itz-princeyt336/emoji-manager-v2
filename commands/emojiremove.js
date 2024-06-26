const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojiremove')
        .setDescription('Remove a custom emoji from the server')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to remove')
                .setRequired(true)),
    async execute(interaction) {
        const emojiName = interaction.options.getString('emoji');
        const emoji = interaction.guild.emojis.cache.find(e => e.toString() === emojiName);

        if (emoji) {
            await emoji.delete();
            await interaction.reply({ content: `Emoji ${emojiName} removed.`, ephemeral: true });
        } else {
            await interaction.reply({ content: 'Emoji not found.', ephemeral: true });
        }
    },
};
