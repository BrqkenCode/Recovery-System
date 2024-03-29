const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports ={
    data: {
        name: 'ban',
        description: 'Ban a user!',
        options: [
          {
          name: 'target',
          description: 'The user to ban',
          type: 6, // Type 3 represents a string
          required: true,
        },
          {
              name: 'reason',
              description: 'The reason',
              type: 3,
              required: true,
          },
          
        ],
      },
      async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Ban')
            .setEmoji('✅')
			.setStyle(ButtonStyle.Success);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
            .setEmoji('❌')
			.setStyle(ButtonStyle.Danger);

		const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);
        const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('Ban Confrmation')
        .setDescription("Please choose an option")
        .addFields(
            { name: 'User', value:  `<@${target.id}>`},
            { name: 'Reason', value: reason }
        )
       
        .setTimestamp()

          

		const response = await interaction.reply({
            embeds: [embed],
			components: [row],
		});

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            const requiredRole = member.roles.cache.some(role => role.name === '「 👑」Management');
            if (!requiredRole) {
                return interaction.reply('You do not have permission to use this command.');
            }

            if (confirmation.customId === 'confirm') {
                await interaction.guild.members.ban(target);
                const log = process.env.BOT_LOG
                logembed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Ban Confrmation')
                .setDescription("A User has been banned")
                .addFields(
                    { name: 'User', value:  `<@${target.id}>`},
                    { name: 'Reason', value: reason },
                    { name: 'Staff Member', value:  `<@${interaction.member.user.id}>`}
                )
                
                .setTimestamp()
             
                if (e == null){
                    await client.channels.cache.get(log).send({embeds: [logembed]})
                }
                
            } else if (confirmation.customId === 'cancel') {
                canembned  = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Canceled!')
                .setDescription('Th ban has been canceled!')
              
                .setTimestamp()
                
                await confirmation.update({ embeds: [canembned] });
            }
        } catch (e) {
            await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
        }


	},
}