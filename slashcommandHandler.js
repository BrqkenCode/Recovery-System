const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data);
}

const clientId = '985296676195565589';
const guildId = '1207782115089846342';

const rest = new REST({ version: '9' }).setToken('OTg1Mjk2Njc2MTk1NTY1NTg5.GldRhJ.25K8wCyl_GkTXg_ZRgRj661ysefASqaaEFGlxo');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
