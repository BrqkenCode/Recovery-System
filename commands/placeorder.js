const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, ComponentType } = require('discord.js');
const fs = require('fs');
const path = require('path');
module.exports ={
    data: {
        name: 'placeorder',
        description: 'Place an oredr',
        options: [
          {
          name: 'client',
          description: 'Clien',
          type: 6, // Type 3 represents a string
          required: true,
        },
          {
              name: 'order-id',
              description: 'Copy paste the ID from above',
              type: 3,
              required: true,
          },
          {
            name: 'application',
            description: 'Name the application-type',
            type: 3,
            required: true,
        },
        {
            name: 'payment',
            description: 'Name the payment method',
            type: 3,
            required: true,
        },
       

          
        ],
      },
      async execute(interaction) {
		const clientuser = interaction.options.getUser('client');
		const oID = interaction.options.getString('order-id')
        const bottyp = interaction.options.getString('application')
        const paymethod = interaction.options.getString('payment');


		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Order')
            .setEmoji('✅')
			.setStyle(ButtonStyle.Success);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel Order')
            .setEmoji('❌')
			.setStyle(ButtonStyle.Danger);

		const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);
        const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('Order')
        .setDescription("Please choose an option")
        .addFields(
            { name: 'Client', value: clientuser ? `<@${clientuser.id}>` : 'Unknown Client' },
            { name: 'Order-ID', value: oID ?  oID: 'Unknown Order ID' },
            { name: 'Bot-Type', value: bottyp ? bottyp : 'Unknown Bot Type' },
            { name: 'Payment method', value: paymethod ? paymethod: 'Not specified'}
        )
        .setTimestamp()
        .setFooter({ text: 'Recovery-Studio'});
          

		const response = await interaction.reply({
            embeds: [embed],
			components: [row],
		});

	},
}