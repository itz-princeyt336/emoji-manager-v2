const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('liststickers')
        .setDescription('List all stickers in the server'),
    async execute(interaction) {
        const stickers = interaction.guild.stickers.cache.map(s => `${s} - \`${s.name}\``).join('\n');

        const embed = new EmbedBuilder()
            .setTitle('Server Stickers')
            .setDescription(stickers || 'No stickers found') // Ensure description is not empty
            .setColor('#0099ff');

        await interaction.reply({ embeds: [embed] });
    },
};
