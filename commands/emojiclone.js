const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojiclone')
        .setDescription('Clone an emoji with a new name')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to clone')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The new name for the cloned emoji')
                .setRequired(true)),
    async execute(interaction) {
        const emojiName = interaction.options.getString('emoji');
        const newName = interaction.options.getString('name');
        const emoji = interaction.guild.emojis.cache.find(e => e.toString() === emojiName);

        if (emoji) {
            const newEmoji = await interaction.guild.emojis.create({ attachment: emoji.url, name: newName });
            await interaction.reply({ content: `Emoji cloned as ${newEmoji.toString()}.`, ephemeral: true });
        } else {
            await interaction.reply({ content: 'Emoji not found.', ephemeral: true });
        }
    },
};
