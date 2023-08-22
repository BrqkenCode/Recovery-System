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
      interaction.reply({
        content: "Discover Our Offerings",
        embeds: [{
          title: "Common Inquiries (FAQ) 🔍",
          description: "Uncover speedy responses about the order process. Dive into the varied functions and frameworks of our bots within the linked selection menu."
        }, {
          title: "Ways to Pay 💳",
          description: "We provide assorted pathways for payments: donations, Boosts, or Invites. Choose what aligns with your preferences."
        }, {
          title: "Backing Assistance 🤲",
          description: "Your kind-hearted contributions, be it donations or alternative routes, play a vital part in upholding our hosting services. Your backing aids us in sustaining top-tier service."
        }, {
          title: "Delivered Services 🔧",
          description: "Experience uninterrupted service via our gratis 24/7 bot availability, systematic updates, and TOP-TIER IMMEDIATE AID! Our committed team is at the ready 24/7 to deliver the guidance you need."
        }, {
          title: "Seeking Aid? 🆘",
          description: "For aid, venture to ⁠⁠⟫-ticket-support. Our support squad stands equipped to furnish speedy solutions to queries or hurdles you encounter."
        }, {
          title: "Ideas & Feature Wishes 💡",
          description: "Visualize new bot features or possess ideas to share? Engage with us at ⁠⁠⟫-suggest-ideas. We place high worth on your input as we strive to amplify our offerings."
        }, {
          title: "Bug Notifications 🐞",
          description: "Should you come upon a glitch detached from the self-hosting edition, kindly inform us at ⁠⁠⟫-bug-report. Your insight empowers us to tackle matters promptly."
        }, {
          title: "Bots & Commands 🤖",
          description: "Reveal the extensive capabilities of our bots via the affixed selection menu. Test and implement them within using the \"!\" prefix."
        }],
        components: [row]
      });
      } catch (error) {
        console.error('Error purging channel:', error);
        
    }

    
    },
    

};
