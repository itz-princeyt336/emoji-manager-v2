const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Check the bot\'s uptime'),
    async execute(interaction) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const embed = new EmbedBuilder()
            .setTitle('Uptime')
            .setDescription(`${hours}h ${minutes}m ${seconds}s`)
            .setColor('#0099ff');

        await interaction.reply({ embeds: [embed] });
    },
};
