const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stickeradd')
        .setDescription('Add a new sticker to the server')
        .addStringOption(option =>
            option.setName('sticker')
                .setDescription('The sticker URL')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name for the sticker')
                .setRequired(true)),
    async execute(interaction) {
        const stickerUrl = interaction.options.getString('sticker');
        const stickerName = interaction.options.getString('name');

        try {
            const sticker = await interaction.guild.stickers.create({
                file: stickerUrl,
                name: stickerName,
                tags: 'sticker',
            });

            const embed = new EmbedBuilder()
                .setTitle('Sticker Added')
                .setDescription(`Successfully added sticker with the name \`${sticker.name}\``)
                .setColor('#0099ff');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to add sticker.', ephemeral: true });
        }
    },
};
