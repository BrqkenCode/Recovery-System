const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    data: {
      name: 'checkinvites',
      description: 'CDheck the invites of a user',
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
      const { member, options, gui } = interaction;
      const userOption = options.getUser('user'); // Changed from interaction.options.getUser('user');
      const user = userOption;
      let invites = await interaction.guild.invites.fetch() 
      const userInvites = invites.filter((u => u.inviter.id === user.id))
      var count = 0;
      userInvites.forEach(inv => count += inv.uses);

      const embed = new EmbedBuilder()
      .setTitle('Invite Logger')
      .setDescription('Information below')
      .setColor('Blue')
      .addFields(
        {name:'User : ', value: user.toString()},
        {name:'Invites : ', value: String(count)}
      )
      .setTimestamp()
      .setFooter({text:'Recovery-Studio'})

      interaction.reply({embeds: [embed]})

     
        
      










    }
}
  