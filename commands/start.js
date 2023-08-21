const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'start',
        description: 'Translate your text!',
        options: [
          {
          name: 'order_id',
          description: 'The order_id',
          type: 3, 
          required: true,
        },
        {
          name: 'status',
          description: 'Change the status',
          type: 3,
          required: true,
          choices: [
            { name: 'Started', value: 'started' },
            { name: 'Working on', value: 'working' },
            { name: 'Testing', value: 'testing' },
            { name: 'Finished', value:'finished'}
          ],
        },
        ],
      },
    async execute(interaction) {
        const { member, channel } = interaction;
        const orderID = interaction.options.getString('order_id');
        const newStatus = interaction.options.getString('status');

        const requiredRole = member.roles.cache.some(role => role.name === '「 👑」Management');
        if (!requiredRole) {
          return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }
        const filePath = path.join(__dirname,'../', 'orders.json');
        const orders = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Find the order with the matching ID
        const order = orders.find(o => o.id === orderID);

        if (!order) {
            await channel.send('Order not found.');
            return;
        }

        // Update the status of the order
        order.status = newStatus;

        // Save the updated orders back to the file
        fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

        // Create an embed to notify about the status update
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Order Status Updated')
            .setDescription(`Updated status of Order ID ${orderID} to: ${newStatus}`)
            .setTimestamp();

        // Send the embed to the user
        await channel.send({ embeds: [embed] });
    },
};
