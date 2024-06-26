const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List all commands'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🤖 Help Panel')
            .setColor('#0099ff')
            .setThumbnail('https://cdn3.emoji.gg/emojis/38955-management.png') // Replace with your thumbnail URL
            .setDescription('Here are all available commands:')
            .addFields(
                { name: 'Emoji Commands', value: '`/listemojis`\n`/emojiadd`\n`/emojienlarge`\n`/emojisteal`\n`/emojiremove`\n`/emojiinfo`\n`/emojirename`\n`/emojirandom`\n`/emojiclone`\n`/emojiusage`\n`/emojianimatedlist`', inline: true },
                { name: 'Sticker Commands', value: '`/addsticker`\n`/stickerenlarge`\n`/liststickers`\n`/stickerremove`\n`/stickerinfo`\n`/stickerrename`', inline: true },
                { name: 'Utility Commands', value: '`/help`\n`/uptime`\n`/ping`\n`/botinfo`\n`/reportbug`', inline: true }
            )
        await interaction.reply({ embeds: [embed] });
    },
};