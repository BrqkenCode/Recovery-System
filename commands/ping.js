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
      .setTitle('Ping')
      .setDescription("Look at our Ping :)")
      .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
      .addFields(
        { name: 'Ping in ms', value: latstring }
      )
      .setTimestamp()
      .setFooter({ text: 'Recoverycord'});
    
      
    interaction.deleteReply();
    interaction.channel.send({ embeds: [embed]});
    interaction.deferReply();
  },
};

