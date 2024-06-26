const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojirandom')
        .setDescription('Displays a random emoji from the server'),
    async execute(interaction) {
        const emojis = interaction.guild.emojis.cache;
        const randomEmoji = emojis.random();

        if (randomEmoji) {
            const embed = new EmbedBuilder()
                .setTitle(`:${randomEmoji.name}:`)
                .setImage(randomEmoji.url)
                .setColor('#0099ff');

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ content: 'No custom emojis found.', ephemeral: true });
        }
    },
};
