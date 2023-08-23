const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
      name: 'announce',
      description: 'Announce some great news!',
      options: [
        {
        name: 'message',
        description: 'The news',
        type: 3, // Type 3 represents a string
        required: true,
      },
        {
            name: 'channel',
            description: 'Channel to send the news!',
            type: 7,
            required: true,
        },
        
      ],
    },
    async execute(interaction) {
      const { member, options } = interaction;
      const channel = options.getChannel('channel');
      const word = options.getString('message');
      const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Announcement'))
      .setDescription("Please carefully read the provided information below.")
      .addFields(
        { name: 'Information', value: word }
      )
      .setTimestamp()
      .setFooter({ text: 'Recovery Studio'});

      const requiredRole = member.roles.cache.some(role => role.name === '「 👑」Management');
      if (!requiredRole) {
        return interaction.reply('You do not have permission to use this command.');
      }
      try {

        interaction.deleteReply();
        channel.send("@everyone")
        channel.send({ embeds: [embed]});
        interaction.deferReply();
      } catch (error) {
        console.error('Error purging channel:', error);
        
      }
    },
  };