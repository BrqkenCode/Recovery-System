const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
  async execute(interaction) {
    const sentTimestamp = Date.now();
    const latency = sentTimestamp - interaction.createdTimestamp; // Calculate the latency correctly
    const latstring = latency.toString(); // Convert the latency value to a string
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Pricing information')
      .setDescription("Take a look at the pricing below")
      .addFields(
        { name: 'Ping in ms', value: latstring }
      )
      .setTimestamp()
    
      
    interaction.deleteReply();
    interaction.channel.send({ embeds: [embed]});
    interaction.deferReply();
  },
};

