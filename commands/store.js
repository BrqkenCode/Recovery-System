const { SlashCommandBuilder } = require('@discordjs/builders');
const {  Permissions, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
const { channel } = require('diagnostics_channel');

module.exports = {
  data: {
    name: 'store',
    description: 'Set the channel for the store!',
    
  },
  async execute(interaction) {
    const { member, options } = interaction;

    // create select

    const selectmenu  = new StringSelectMenuBuilder()
    .setCustomId('store-options')
    .setPlaceholder('Please choose one of the options below!')
    .addOptions(
        new StringSelectMenuOptionBuilder()
        .setLabel('Discord-Server')
        .setDescription('Fully setup Discord Server')
        .setValue('Discord-Server'),

        new StringSelectMenuOptionBuilder()
        .setLabel('Discord-Bot')
        .setDescription('Custom Discord Bot')
        .setValue('Discord-Bot'),

        new StringSelectMenuOptionBuilder()
        .setLabel('Other')
        .setDescription('Tell us your idea')
        .setValue('Custom')
    );
    const row = new ActionRowBuilder()
        .addComponents(selectmenu);




    const embed = new EmbedBuilder() // Changed from EmbedBuilder
      .setColor('#171bd3')
      .setTitle('Store-options')
      .setDescription("If you are intersted in a bot or something else, take a look at the options below.")
      .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
      .setTimestamp();

    const requiredRole = member.roles.cache.some(role => role.name === '「 👑」Management');
    if (!requiredRole) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    try {
        interaction.reply({ embeds:[embed],components: [row]});
      } catch (error) {
        console.error('Error purging channel:', error);
        
    }

    
    },
    

};
