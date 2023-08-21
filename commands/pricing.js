const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pricing')
    .setDescription('Send the pricing information'),
  async execute(interaction) {
    const { member, options } = interaction;
    const requiredRole = member.roles.cache.some((role) => role.name === '「 👑」Management');
    if (!requiredRole) {
      return interaction.reply('You do not have permission to use this command.');
    }
    const sentTimestamp = Date.now();
    const latency = sentTimestamp - interaction.createdTimestamp;
    const latencyString = latency.toString();
    
    const botembed = new EmbedBuilder()
      .setColor('#0099FF')
      .setTitle('Pricing Information')
      .setDescription('Take a look at the pricing below')
      .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
      .addFields(
        { name: 'System Bot', value: '10 Invites/Month',inline: true},
        { name: 'Ticketing', value: '10 Invites/Month',inline: true },
        { name: 'Modmail', value: '10 Invites/Month' ,inline: true},
        { name: 'Support', value: '10 Invites/Month' ,inline: true},
        { name: 'Security', value: '10 Invites/Month' ,inline: true},
        { name: 'Fun', value: '10 Invites/Month' ,inline: true},
        { name: 'Moderation', value: '10 Invites/Month' ,inline: true},
        {name: 'Custom', value: 'custom/month',inline: true}
      )
      .setTimestamp()
      .setFooter({text:'Recovery Studio'});

    interaction.deferReply(); // Defer the reply before deleting and sending the embed
    await interaction.deleteReply();
    interaction.followUp({ embeds: [botembed] });
  },
};
