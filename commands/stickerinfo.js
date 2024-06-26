const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stickerinfo')
        .setDescription('Get information about a sticker')
        .addStringOption(option =>
            option.setName('sticker')
                .setDescription('The sticker to get information about')
                .setRequired(true)),
    async execute(interaction) {
        const stickerName = interaction.options.getString('sticker');
        const sticker = interaction.guild.stickers.cache.find(s => s.name === stickerName);

        if (sticker) {
            const embed = new EmbedBuilder()
                .setTitle(sticker.name)
                .addFields(
                    { name: 'Name', value: sticker.name, inline: true },
                    { name: 'ID', value: sticker.id, inline: true },
                    { name: 'Format', value: sticker.formatType, inline: true }
                )
                .setThumbnail(sticker.url)
                .setColor('#0099ff');

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ content: 'Sticker not found.', ephemeral: true });
        }
    },
};
