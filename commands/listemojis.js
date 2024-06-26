const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listemojis')
        .setDescription('List all emojis in the server'),
    async execute(interaction) {
        const emojis = interaction.guild.emojis.cache.map(emoji => {
            return `${emoji} - \`<:${emoji.name}:${emoji.id}>\``;
        }).join('\n');

        const embed = new EmbedBuilder()
            .setTitle('Emojis List')
            .setDescription(emojis || 'No emojis found')
            .setColor('#0099ff');

        await interaction.reply({ embeds: [embed] });
    },
};
