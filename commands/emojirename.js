const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojirename')
        .setDescription('Rename a custom emoji')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to rename')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('newname')
                .setDescription('The new name for the emoji')
                .setRequired(true)),
    async execute(interaction) {
        const emojiName = interaction.options.getString('emoji');
        const newName = interaction.options.getString('newname');
        const emoji = interaction.guild.emojis.cache.find(e => e.toString() === emojiName);

        if (emoji) {
            await emoji.edit({ name: newName });
            await interaction.reply({ content: `Emoji renamed to ${newName}.`, ephemeral: true });
        } else {
            await interaction.reply({ content: 'Emoji not found.', ephemeral: true });
        }
    },
};
