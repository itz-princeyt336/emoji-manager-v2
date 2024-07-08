const { Client, GatewayIntentBits, REST, Routes, MessageEmbed, Presence, ActivityType } = require('discord.js');
const fs = require('fs');
const reportBugCommand = require('./commands/reportbug.js');
require('dotenv').config();

const client = new Client({
    intents: [3243773]
});

client.commands = new Map();
client.commands.set(reportBugCommand.data.name, reportBugCommand);

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Register slash commands
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: Array.from(client.commands.values()).map(cmd => cmd.data.toJSON()) },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Set bot status (presence)
    client.user.setPresence({
        status: 'idle',
    });
    client.user.setActivity({
            name: '/help | Made By Friday',
            type: ActivityType.Custom,
         //   url: 'https://www.twitch.tv/discord'
        });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.BOT_TOKEN);
