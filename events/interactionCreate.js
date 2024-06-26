client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() && !interaction.isSelectMenu()) return;

    const { commandName } = interaction;

    if (interaction.isCommand()) {
        if (client.commands.has(commandName)) {
            try {
                await client.commands.get(commandName).execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    } else if (interaction.isSelectMenu()) {
        const selectedValue = interaction.values[0];

        if (selectedValue === 'emojis') {
            const emojiEmbed = new EmbedBuilder()
                .setTitle('😊 Emoji Commands')
                .setDescription('/listemojis\n/emojiadd [emoji]\n/emojienlarge [emoji]\n/emojisteal [message link]\n/emojiremove [emoji]\n/emojiinfo [emoji]\n/emojirename [emoji]\n/emojirandom\n/emojiclone [emoji]\n/emojiusage [emoji]\n/emojianimatedlist')
                .setColor('#0099ff');
            await interaction.update({ embeds: [emojiEmbed], components: [] });
        } else if (selectedValue === 'stickers') {
            const stickerEmbed = new EmbedBuilder()
                .setTitle('🖼️ Sticker Commands')
                .setDescription('/addsticker [sticker]\n/stickerenlarge [sticker]\n/liststickers\n/stickerremove [sticker]\n/stickerinfo [sticker]\n/stickerrename [sticker]')
                .setColor('#0099ff');
            await interaction.update({ embeds: [stickerEmbed], components: [] });
        } else if (selectedValue === 'utility') {
            const utilityEmbed = new EmbedBuilder()
                .setTitle('🛠️ Utility Commands')
                .setDescription('/help\n/uptime\n/ping\n/botinfo\n/reportbug [bug]')
                .setColor('#0099ff');
            await interaction.update({ embeds: [utilityEmbed], components: [] });
        } else if (selectedValue === 'support') {
            const supportEmbed = new EmbedBuilder()
                .setTitle('💬 Support Server')
                .setDescription('Join our [Support Server](https://discord.gg/zPjH55uCYt) for assistance.')
                .setColor('#0099ff');
            await interaction.update({ embeds: [supportEmbed], components: [] });
        }
    }
});