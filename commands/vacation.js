const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
  data: {
    name: 'vacation',
    description: 'Create the request',
  },
  async execute(interaction) {
    const { member, options } = interaction;

    const vacationmodal = new ModalBuilder()
      .setCustomId('vacation')
      .setTitle('Vacation Request');

    const nameInput = new TextInputBuilder()
      .setCustomId('name')
      .setLabel('Your Name')
      .setRequired(true)
      .setStyle(1);

    const reasonInput = new TextInputBuilder()
      .setCustomId('reason')
      .setLabel('Whats the reason for the request?')
      .setRequired(true)
      .setStyle(2);

    const dateInput = new TextInputBuilder()
      .setCustomId('date')
      .setLabel('Start Date - End Date?')
      .setRequired(true)
      .setStyle(1);

    const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
    const secondActionRow = new ActionRowBuilder().addComponents(reasonInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(dateInput);

    vacationmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

    const open = new ButtonBuilder()
      .setCustomId('open')
      .setLabel('Open Ticket')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('📝');

    const row = new ActionRowBuilder().addComponents(open);

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Vacation')
      .setDescription(
        "If you are going to be unavailable for a period of time, please write out a vacation request here. For example, if you are going on vacation soon, if you're currently under a lot of stress at school, etc., you can request a vacation. Providing information about your vacation to the team allows us to plan things accordingly for the staff team."
      )

      .setTimestamp()
      .addFields({ name: 'Note', value: 'Please create this request at least 3 days before your vacation!' })
;

    const requiredRole = member.roles.cache.some((role) => role.name === '「 👑」Management');
    if (!requiredRole) {
      return interaction.reply('You do not have permission to use this command.');
    }

    try {
      interaction.reply({
        embeds: [embed],
        components: [row],
      });

      const filter = (click) => click.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        max: null,
        time: null,
        
      });

      collector.on('collect', (interaction) => {
        interaction.showModal(vacationmodal);
        if (interaction.customId === 'vacation') {
          // create channel with only perms
          // create embed with values
          console.log('Modal submitted:', interaction.values);
          interaction.reply({ content: 'Your submission was received successfully!' });
        }
      });

    } catch (error) {
      console.error('Error:', error);
    }
  },
};
