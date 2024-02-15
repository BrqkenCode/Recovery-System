const { SlashCommandBuilder } = require('@discordjs/builders');
const {  Permissions, EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
  data: {
    name: 'orderstatus',
    description: 'Check your orders status',
    options: [
      {
        name: 'oid',
        description: 'paste your order id',
        type: 3,
        required: true,
      },
     
    ],
  },
  async execute(interaction) {
    const { member, options } = interaction;
    const id = options.getString('oid');

    const filePath = path.join(__dirname, '..', 'orders.json');

    const orders = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Find the order with the matching ID
    const order = orders.find(o => o.id === id);

    if (!order) {
        await interaction.reply('Order not found.');
        return;
    }

    // Create an embed to display the order status
    const embed = new EmbedBuilder()
        .setTitle('Order Status')
        .setColor('Green')
        .addFields(
            {name:'Order ID', value: order.id},
            {name: 'User ID', value: order.userid},
            {name:'Inquiry',  value: order.reqs},
            {name:'Status',   value: order.status || 'Not provided'}
        )

        .setTimestamp();
        

    // Send the embed to the user
    await interaction.reply({ embeds: [embed] });
   
      
  },
};
