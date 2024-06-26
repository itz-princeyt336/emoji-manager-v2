const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojianimatedlist')
        .setDescription('List all animated emojis in the server'),
    async execute(interaction) {
        const animatedEmojis = interaction.guild.emojis.cache.filter(e => e.animated).map(e => e.toString()).join(' ');
        const embed = new EmbedBuilder()
            .setTitle('Animated Emojis')
            .setDescription(animatedEmojis || 'No animated emojis found')
            .setColor('#0099ff');

        await interaction.reply({ embeds: [embed] });
    },
};
