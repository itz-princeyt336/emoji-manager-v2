const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stickerrename')
        .setDescription('Rename a sticker')
        .addStringOption(option =>
            option.setName('sticker')
                .setDescription('The sticker to rename')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('newname')
                .setDescription('The new name for the sticker')
                .setRequired(true)),
    async execute(interaction) {
        const stickerName = interaction.options.getString('sticker');
        const newName = interaction.options.getString('newname');
        const sticker = interaction.guild.stickers.cache.find(s => s.name === stickerName);

        if (sticker) {
            await sticker.edit({ name: newName });
            await interaction.reply({ content: `Sticker renamed to ${newName}.`, ephemeral: true });
        } else {
            await interaction.reply({ content: 'Sticker not found.', ephemeral: true });
        }
    },
};
