const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
      name: 'changelog',
      description: 'Announce some new changes',
      options: [
        {
        name: 'message',
        description: 'The changes',
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
        const changelog = options.getString('message');

        interaction.deferReply();
        interaction.deleteReply();
        const requiredRole = member.roles.cache.some((role) => role.name === '「 👑」Management');
        if (!requiredRole) {
            return interaction.reply('You do not have permission to use this command.');
        
        }

        const changelogembed = new EmbedBuilder()
        .setTitle('New Changelog')
        .setDescription('Information below')
        .setColor('Aqua')
        .addFields({
            name:'Changes:', value: changelog
        })
        .setTimestamp()



        await channel.send({embeds:[changelogembed]})







    }
}