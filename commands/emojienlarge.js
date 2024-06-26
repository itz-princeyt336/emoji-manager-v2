const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojienlarge')
        .setDescription('Enlarge an emoji')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to enlarge')
                .setRequired(true)),
    async execute(interaction) {
        const emoji = interaction.options.getString('emoji');
        const customEmoji = interaction.client.emojis.cache.find(e => e.toString() === emoji);

        if (customEmoji) {
            const embed = new EmbedBuilder()
                .setTitle(`:${customEmoji.name}:`)
                .setImage(customEmoji.url)
                .setColor('#0099ff');

            await interaction.reply({ embeds: [embed] });
        } else {
            // Handle standard emoji
            const emojiRegex = /<a?:\w+:(\d+)>/;
            const match = emoji.match(emojiRegex);
            if (match) {
                const emojiId = match[1];
                const emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.png?v=1`;

                const embed = new EmbedBuilder()
                    .setTitle('Enlarged Emoji')
                    .setImage(emojiUrl)
                    .setColor('#0099ff');

                await interaction.reply({ embeds: [embed] });
            } else {
                await interaction.reply({ content: 'Emoji not found or not a custom emoji.', ephemeral: true });
            }
        }
    },
};
