
const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");
module.exports ={
    data:
    new SlashCommandBuilder()
    .setName('close')
    .setDescription('Close the current channel!'),
    async execute(interaction){
        const { member, options } = interaction;           
        const requiredRole = member.roles.cache.some((role) => role.name === '「 👑」Management');
        if (!requiredRole) {
        return interaction.reply('You do not have permission to use this command.');
        }
       
        interaction.channel.delete();

    }


}