const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojiinfo')
        .setDescription('Get information about a custom emoji')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to get information about')
                .setRequired(true)),
    async execute(interaction) {
        const emojiName = interaction.options.getString('emoji');
        const emoji = interaction.guild.emojis.cache.find(e => e.toString() === emojiName);

        if (emoji) {
            const embed = new EmbedBuilder()
                .setTitle(`:${emoji.name}:`)
                .addFields(
                    { name: 'Name', value: emoji.name, inline: true },
                    { name: 'ID', value: emoji.id, inline: true },
                    { name: 'Created At', value: emoji.createdAt.toDateString(), inline: true }
                )
                .setThumbnail(emoji.url)
                .setColor('#0099ff');

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ content: 'Emoji not found.', ephemeral: true });
        }
    },
};
