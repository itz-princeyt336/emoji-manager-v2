const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Shows information about the bot'),
    async execute(interaction) {
        const botOwner = 'friday.su'; // Replace with your name or leave it dynamic
        const totalMemory = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2); // Convert to GB
        const freeMemory = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2); // Convert to GB
        const usedMemory = (totalMemory - freeMemory).toFixed(2); // Calculate used memory in GB
        const uptime = process.uptime();
        const uptimeHours = Math.floor(uptime / 3600);
        const uptimeMinutes = Math.floor((uptime % 3600) / 60);
        const uptimeSeconds = Math.floor(uptime % 60);
        
        const embed = new EmbedBuilder()
            .setTitle('📊 Bot Information')
            .setColor('#0099ff')
            .addFields(
                { name: 'RAM Usage', value: `${usedMemory} GB / ${totalMemory} GB`, inline: false },
                { name: 'Uptime', value: `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`, inline: false },
                { name: 'Servers', value: `${interaction.client.guilds.cache.size}`, inline: false },
                { name: 'OS', value: `${os.type()} ${os.release()}`, inline: false },
                { name: 'Owner', value: botOwner, inline: false }
            );

        await interaction.reply({ embeds: [embed] });
    },
};