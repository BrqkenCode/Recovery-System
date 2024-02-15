const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data);
}

const clientId = '1126117413100978246';
const guildId = '1206693622909509662';

const rest = new REST({ version: '9' }).setToken('MTEyNjExNzQxMzEwMDk3ODI0Ng.GWbXqy.xojm6fH37GspHIuRsnCXYlQec5oeVsFKvCGwbQ');

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
