const { SlashCommandBuilder } = require('@discordjs/builders');
const {EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Get the current System status.'),
  async execute(interaction) {
    // Command execution logic goes here
    
    // Example website URLs (replace these with your actual website URLs)
    const websiteUrls = [
      'https://www.example.com',
      'https://www.anotherexample.com',
      'https://www.yetanotherexample.com',
    ];
    
    const websiteStatuses = [];
    
    for (const url of websiteUrls) {
      try {
        const response = await axios.get(url);
        const status = response.status === 200 ? 'Online' : 'Degraded';
        websiteStatuses.push({ url, status, color: status === 'Online' ? '#00FF00' : '#FFA500' });
      } catch (error) {
        websiteStatuses.push({ url, status: 'Offline', color: '#FF0000' });
      }
    }
    
    const embed = new EmbedBuilder()
      .setTitle('Website Statuses')
      .setDescription('Current statuses of websites:')
      .setColor('#7289DA');
    
    for (const website of websiteStatuses) {
      embed.addFields(website.url, website.status, true);
    }
    
    interaction.reply({ embeds: [embed] });
  },
};
