const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ComponentType, ChannelType, PermissionsBitField,  Client, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setticket')
    .setDescription('Set the channel for the ticket support!'),
  async execute(interaction) {
    const { member, options } = interaction;  
    const select = new StringSelectMenuBuilder()
      .setCustomId('ticket')
      .setPlaceholder('Select your problem')
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('Application')
          .setDescription('I want to apply for the staff team!')
          .setValue('application'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Bot')
          .setDescription('I am experiencing problems with my bot!')
          .setValue('bot'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Question')
          .setDescription('I have some questions')
          .setValue('question'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Bug')
          .setDescription('I am reporting a bug')
          .setValue('bug')
      );

    const row = new ActionRowBuilder().addComponents(select);
       
    const ticketEmbed = new EmbedBuilder()
      .setColor('#0099ff') // Set a valid color value (e.g., hexadecimal color code)
      .setTitle('Ticket')
      .setDescription('To open a support ticket, please select the type of problem you are experiencing:')
      .setTimestamp()
      .addFields({ name: 'Note', value: 'It may take some time for your ticket to be processed!' })
      .setFooter({ text: 'Recovery Studio' });
    
    const requiredRole = member.roles.cache.some((role) => role.name === '「 👑」Management');
    if (!requiredRole) {
        return interaction.reply('You do not have permission to use this command.');
    
    }
    await interaction.reply({
      embeds: [ticketEmbed],
      components: [row],
    });

    const filter = (interaction) => interaction.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.SELECT_MENU,
      max: null,
    });
    


    collector.on('collect', (interaction) => {
      const selectedValue = interaction.values[0];
      if (selectedValue === 'bot') {
        
        const categoryID = '1206694812456329238';

      
        (async () => {
          const channel = await interaction.guild.channels.create({
            name: `${interaction.user.username}-bugicket`,
            parent: '1206694812456329238',
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });

          const bugembed = new EmbedBuilder()
          .setTitle('New Botticket')
          .setDescription('Please let us know, what problem you are expieriencing with our bot.')
          .setColor('Blue')
          .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
          .setTimestamp();
          const requiredRole = interaction.member.roles.cache.some((role) => role.name === '「 👑」Management');
          const rID = "855179067388461076";
          await channel.send({ content: `<@${interaction.member.user.id}>`, embeds:[bugembed] });
        })
    }else if (selectedValue === 'bug') {
        const categoryID = '11206694812456329238';
      
        (async () => {
          const channel = await interaction.guild.channels.create({
            name: `${interaction.user.username}-bugticket`,
            parent: '1206694812456329238',
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });

          const bugembed = new EmbedBuilder()
          .setTitle('New Bugticket')
          .setDescription('Please let us know, what bug you have found!')
          .setColor('Blue')
          .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
          .setTimestamp();
          const requiredRole = interaction.member.roles.cache.some((role) => role.name === '「 👑」Management');
          const rID = "855179067388461076";
          await channel.send({ content: `<@${interaction.member.user.id}>`, embeds:[bugembed] });
        })();
      }else if (selectedValue === 'question') {
        const categoryID = '1206694812456329238';
      
        (async () => {
          const channel = await interaction.guild.channels.create({
            name: `${interaction.user.username}-ticket`,
            parent: '1206694812456329238',
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });
          
          const bugembed = new EmbedBuilder()
          .setTitle('Ticket')
          .setDescription('Please let us know,how we can help you!')
          .setColor('Blue')
          .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
          .setTimestamp();
          const requiredRole = interaction.member.roles.cache.some((role) => role.name === '「 👑」Management');
          const rID = "855179067388461076";
          await channel.send({ content: `<@${interaction.member.user.id}>`, embeds:[bugembed] });
        })();
      }else if (selectedValue === 'application') {
        const categoryID = '1206694812456329238';
      
        (async () => {
          const channel = await interaction.guild.channels.create({
            name: `${interaction.user.username}-application`,
            parent: categoryID,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });

          const bugembed = new EmbedBuilder()
          .setTitle('Application')
          .setDescription('Please read the necessary data info!')
          .setColor('Blue')
          .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
          .addFields(
            {name:'Requirements', value:'Write a document with an application!'},
            {name: 'Questions (in addition to the doc)',value:'Why should we choose you?, What are your weaknesses?'}
          )
          .setTimestamp();  
          const close = new ButtonBuilder()
          .setCustomId('closebutton')
          .setLabel('Close this ticket!')
          .setStyle(ButtonStyle.Danger)

          const row = new ActionRowBuilder()
          .addComponents(close)
            


          const requiredRole = interaction.member.roles.cache.some((role) => role.name === '「 👑」Management');
          const rID = "855179067388461076";
          await channel.send({ content: `<@${interaction.member.user.id}>`, embeds:[bugembed] });
        })();
      }
    })
  }
}