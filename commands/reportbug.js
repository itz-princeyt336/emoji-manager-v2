const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reportbug')
        .setDescription('Report a bug to the bot owner')
        .addStringOption(option =>
            option.setName('bug')
                .setDescription('Describe the bug')
                .setRequired(true)),
    async execute(interaction) {
        const bugDescription = interaction.options.getString('bug');
        const botOwnerId = '1203605618745933880'; // Replace with the bot owner's Discord user ID

        try {
            const owner = await interaction.client.users.fetch(botOwnerId);
            const user = interaction.user;

            await owner.send(`**Bug Report**\n\n**Reporter:** ${user.tag} (${user.id})\n**Description:** ${bugDescription}`);

            await interaction.reply({ content: 'Thank you for your report! The bot owner has been notified.', ephemeral: true });
        } catch (error) {
            console.error('Error sending bug report:', error);
            await interaction.reply({ content: 'An error occurred while trying to send your report. Please try again later.', ephemeral: true });
        }
    },
};
