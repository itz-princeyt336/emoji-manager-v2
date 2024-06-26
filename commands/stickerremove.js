const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stickerremove')
        .setDescription('Remove a sticker from the server')
        .addStringOption(option =>
            option.setName('sticker')
                .setDescription('The sticker to remove')
                .setRequired(true)),
    async execute(interaction) {
        const stickerName = interaction.options.getString('sticker');
        const sticker = interaction.guild.stickers.cache.find(s => s.name === stickerName);

        if (sticker) {
            await sticker.delete();
            await interaction.reply({ content: `Sticker ${stickerName} removed.`, ephemeral: true });
        } else {
            await interaction.reply({ content: 'Sticker not found.', ephemeral: true });
        }
    },
};
