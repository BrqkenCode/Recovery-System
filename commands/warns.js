const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
  data: {
    name: 'warns',
    description: 'View the number of warnings for a user',
    options: [
      {
        name: 'user',
        description: 'Select a user',
        type: 6,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const { member, options } = interaction;
    const userOption = options.getUser('user');
    const user = userOption;

    const embed = new EmbedBuilder() 
      .setColor('#E67E22')
      .setTitle('User Warnings')
      .setDescription(`Showing the number of warnings for ${userOption}`)
      .setTimestamp();

    if (!user) {
      return interaction.reply({ content: 'This user does not exist!', ephemeral: true });
    }

    try {
      const warningsPath = path.join(__dirname, 'warnings.json');
      const warningsData = require(warningsPath);

      const userWarnings = warningsData.users[user.id] || 0;
      embed.addFields(
        { name: 'User', value: user.toString() },
        { name: 'Warnings', value: userWarnings.toString() }
      );

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Failed to retrieve user warnings:', error);
      interaction.reply({ content: 'An error occurred while retrieving user warnings.', ephemeral: true });
    }
  },
};
