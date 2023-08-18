/*const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
module.exports = {
  data: {
    name: 'warn',
    description: 'Warn a user for their behavior!',
    options: [
      {
        name: 'message',
        description: 'The news',
        type: 3,
        required: true,
      },
      {
        name: 'user',
        description: 'Select a user',
        type: 6, // This indicates a user mention type
        required: true,
      },
    ],
  },
    const { member, options } = interaction;
    const reason = options.getString('message');
    const userOption = interaction.options.getUser('user');
    const user = userOption;

    if (reason ===) null) {
      return interaction.reply('Please provide a reason for the warning.');
    }
    const embed = new EmbedBuilder()
      .setColor('#E67E22')
      .setTitle('Warning')
      .setDescription("You have been warned! Please watch your language and behavior.")
      .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
      .addFields(
        { name: 'Reason', value: reason },
        { name: 'Staff Member', value:  `<@${interaction.member.user.id}>`}
      )
      .setTimestamp();

    const requiredRole = member.roles.cache.some(role => role.name === '「 👑」Management');
    if (!requiredRole) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    if (user) {
      try {
        const timeoutRole = guild.roles.cache.find(role => role.name === 'Muted');
        await user.send({ embeds: [embed] });
        const confirmed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('Warn has been sent!')
        .setTimestamp()
        interaction.reply({ embeds: [confirmed], ephemeral: true });
        console.log('Message sent to the user successfully.');

        const warningsPath = path.join(__dirname, 'warnings.json');
        const warningsData = require(warningsPath);

        if (!warningsData.users[user.id]) {
            warningsData.users[user.id] = 1;
        } else {
            warningsData.users[user.id]++;
        }
        if(warningsData.users[user.id]==3){
            member.roles.add(timeoutRole);
            warningsData.users[user.id] = 0;
        }

        fs.writeFileSync(warningsPath, JSON.stringify(warningsData, null, 2));
        console.log('User warnings updated.');

      } catch (error) {
        const declined = new EmbedBuilder()
        .setColor('#ED4245')
        .setTitle('Warn could not be delivered')
        .setTimestamp()
        interaction.reply({ embeds: [declined]});
        console.error('Failed to send a message to the user:', error);
      }
    } else {
      interaction.reply({ content: 'This user does not exist!' });
    }
  },
};
*/  