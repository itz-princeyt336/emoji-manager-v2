const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojiusage')
        .setDescription('Show how many times a custom emoji has been used')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to check usage for')
                .setRequired(true)),
    async execute(interaction) {
        const emojiName = interaction.options.getString('emoji');
        const emoji = interaction.guild.emojis.cache.find(e => e.toString() === emojiName);

        if (emoji) {
            // Simulate usage count for demonstration purposes
            const usageCount = Math.floor(Math.random() * 100);
            const embed = new EmbedBuilder()
                .setTitle(`Usage of ${emojiName}`)
                .setDescription(`${emojiName} has been used ${usageCount} times.`)
                .setColor('#0099ff');

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ content: 'Emoji not found.', ephemeral: true });
        }
    },
};
