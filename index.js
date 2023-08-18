const { Channel } = require('diagnostics_channel');
const { Client, Collection, GatewayIntentBits, ActivityType, Events, EmbedBuilder, PermissionsBitField, Embed } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Permissions, ChannelType } = require('discord.js');
const fs = require('fs');
const { da } = require('translate-google/languages');
const client = new Client({ intents: [ 
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  try {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  } catch (error) {
    console.error(`Error loading command file: ${file}`, error);
  }
}


client.on('ready', () => {
  const aboutID= '1124766420690018324';
  const aboutchannel = client.channels.cache.get(aboutID);

  const ruleID = '1124765417957761054'
  const rulechan = client.channels.cache.get(ruleID);
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: `Recovery-Studios V1`, type: ActivityType.Custom }],
    status: 'dnd',
  });

  const rulemb = new EmbedBuilder()
  .setTitle('Server Rules')
  .setDescription('To ensure a respectful and harmonious community, please adhere to the following rules:')
  .setColor('#7289DA')
  .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
  .addFields(
    { name: '1. Respect and Etiquette', value: 'Treat all members with respect, courtesy, and consideration. Avoid engaging in any form of discriminatory behavior, personal attacks, or derogatory remarks.' },
    { name: '2. Language and Conduct', value: 'Use appropriate and professional language at all times. Refrain from using offensive, vulgar, or explicit content that may create a hostile environment or make others uncomfortable.' },
    { name: '3. No Harassment or Bullying', value: 'Harassment, bullying, or any form of targeted negative behavior is strictly prohibited. Everyone should feel safe and accepted within the community.' },
    { name: '4. No Spamming or Flooding', value: 'Avoid spamming, excessive use of capital letters, or flooding the chat with repetitive or irrelevant content. Respect the flow of conversation and allow others to express their thoughts.' },
    { name: '5. No NSFW or Inappropriate Content', value: 'Do not share or discuss explicit, pornographic, or otherwise inappropriate content within the community. Keep all discussions and media suitable for all audiences.' },
    { name: '6. No Advertising or Self-Promotion', value: 'Do not advertise external products, services, or communities without proper authorization. Self-promotion should be limited to designated channels, if allowed.' },
    { name: '7. Privacy and Personal Information', value: 'Respect the privacy of others. Do not share personal information without explicit consent. Avoid doxing, stalking, or any other intrusive actions that violate privacy rights.' },
    { name: '8. Follow Staff Instructions', value: 'Cooperate with staff members and follow their instructions. They are here to enforce rules, ensure a positive environment, and address any concerns or issues.' },
    { name: '9. No Malicious Intent', value: 'Do not engage in or promote any form of hacking, cheating, exploiting, or any activity that may harm the community or compromise the security of individuals or systems.' },
    { name: '10. Intellectual Property and Copyright', value: 'Respect the intellectual property rights of others. Do not share or distribute copyrighted material, including software, without proper authorization.' },
    { name: '11. No Impersonation or Misrepresentation', value: 'Do not impersonate or misrepresent yourself as someone else, including staff members or notable individuals. Maintain honesty and integrity within the community.' },
    { name: '12. Channel Specific Rules', value: 'Adhere to the specific rules and guidelines of each channel. Stay on-topic and avoid discussions or content that are unrelated or inappropriate for the respective channel.' },
    { name: '13. Reporting and Conflict Resolution', value: 'Report any issues, concerns, or conflicts to the staff members through appropriate channels. Engage in constructive dialogue and follow the recommended conflict resolution processes.' },
    { name: '14. Compliance with Discord Terms of Service', value: 'Abide by the Discord Terms of Service and Community Guidelines. Any violation of these terms may result in punitive measures, including temporary or permanent suspension from the community.' },
    { name: '15. Enforcement and Moderation', value: 'The staff members reserve the right to enforce rules, issue warnings, and apply appropriate penalties for violations. Respect their decisions and engage in discussions about rule enforcement privately, if necessary.' }
  )
  .setFooter({text:'Recovery Studios - Server Rules'});

  const embed = new EmbedBuilder()
  .setTitle('About us')
  .setDescription("Welcome to Recovery Cord! We are a Discord community dedicated to helping you backup and protect your server.")
  .setColor('#7289DA')
  .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
  .addFields(
    { name: 'Advanced Backup System', value: 'With our advanced backup system, you can securely save essential server elements such as member lists, ban records, messages, and server settings. We understand the importance of safeguarding your community\'s data.' },
    { name: 'Anti-VPN and Proxy System', value: 'In addition to our backup services, we also provide an advanced Anti-VPN and Proxy system. This feature helps maintain a secure environment by detecting and preventing potential threats posed by VPNs and proxies, ensuring the integrity of your server.' },
    { name: 'Prioritizing Security', value: 'At Recovery Cord, we prioritize the security and well-being of your Discord server. Our dedicated team is committed to providing reliable and efficient solutions to safeguard your community.' },
    { name: 'Join us today', value: 'Join us today and experience the peace of mind that comes with having a robust backup and protection system in place.' }
  )
  .setFooter({text: 'Recovery Cord - Backup and Protection Services'});
  rulechan.bulkDelete(1);
  aboutchannel.bulkDelete(1);
  aboutchannel.send({embeds: [embed]})
  rulechan.send({embeds: [rulemb]})
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
  }
  
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isButton() && !interaction.isModalSubmit()) return;
  const { member, options } = interaction;
	if (interaction.customId === 'vacation') {
		await interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });
    const name = interaction.fields.getTextInputValue('name');
	  const reason = interaction.fields.getTextInputValue('reason');
    const date = interaction.fields.getTextInputValue('date');
    const chname = interaction.user.username + '-request';

    const approve = new ButtonBuilder()
    .setCustomId('approve')
    .setLabel('Accept Request')
    .setStyle(ButtonStyle.Success)
    .setEmoji('✅');

    const decline = new ButtonBuilder()
    .setCustomId('decline')
    .setLabel('Decline Request')
    .setStyle(ButtonStyle.Danger)
    .setEmoji('❌');

    
    const logchannelID = '1127927270548439150';
    const logchannel = client.channels.cache.get(logchannelID);
    if (!logchannel) {
      console.log(`Log channel not found with ID ${logchannelID}`);
      return;
    }
    

    

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('Vacation-Request')
      .setDescription('Information below')
      .addFields(
        {name: 'User', value: name},
        {name: 'Reason', value: reason},
        {name: 'Date', value: date}
      )
      .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
      .setTimestamp()
      .setFooter({ text: 'Recoverycord'});
      const row = new ActionRowBuilder().addComponents(approve, decline);
      const categoryID = '1127943313002078299';

      const chann = await interaction.guild.channels.create( {
        name: `${interaction.user.username}-request`,
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
      const requiredRole = interaction.member.roles.cache.some((role) => role.name === '「 👑」Management');
      const rID = "855179067388461076"
      chann.send({content: ` <@${interaction.member.user.id}>`, embeds: [embed], components: [row]})

      
    

    const filter = (click) => click.user.id === interaction.user.id;
      const collector = chann.createMessageComponentCollector({
        max: null,
        time: null,
      });

      collector.on('collect', (interaction) => {
        if (!interaction.isButton()) return; 
        if (!requiredRole) {
          return interaction.channel.send('You do not have permission to use this command.');
          
        }
        if (interaction.customId === 'approve') {
          appembed = new EmbedBuilder()
          .setColor('Green')
          .setTitle('Request Approved')
          .setDescription('Congrats! Enjoy yur Free time')
          .addFields(
            {name:'Approved by:', value:`<@${interaction.member.user.id}>`}
          )
          .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
          .setTimestamp()
          .setFooter({ text: 'Recoverycord'});
          chann.send({embeds:[appembed]})
          logchannel.send({embeds: [appembed.addFields(
            {name:'User', value: name},
            {name: 'Reason', value: reason},
            {name: 'Date', value: date}
          )]})
          interaction.deferReply();
        }
        if (interaction.customId === 'decline') {
          decembed = new EmbedBuilder()
          .setColor('Red')
          .setTitle('Request Declined')
          .setDescription('Your request was sadly declined')
          .addFields(
            {name:'Declined by:', value:`<@${interaction.member.user.id}>`}
          )
          .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
          .setTimestamp()
          .setFooter({ text: 'Recoverycord'});
          chann.send({embeds:[decembed]})
          console.log('Declined');

          logchannel.send({embeds: [decembed.addFields(
            {name:'User', value: name},
            {name: 'Reason', value: reason},
            {name: 'Date', value: date}
          )]})
          
        }

      });
	}
  
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isButton() && !interaction.isModalSubmit()) return;
  const { member, options } = interaction;
  if (interaction.customId === 'ticket') {
    await interaction.reply({ content: 'Your  ticket was opened successfully!', ephemeral: true });
    const problem = interaction.fields.getTextInputValue('problem');
	  const description = interaction.fields.getTextInputValue('description');
    const chname = interaction.user.username + '-request';

    const approve = new ButtonBuilder()
    .setCustomId('close')
    .setLabel('Close Ticket')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🔒');

  

    
    const logchannelID = '1127927270548439150';
    const logchannel = client.channels.cache.get(logchannelID);
    if (!logchannel) {
      console.log(`Log channel not found with ID ${logchannelID}`);
      return;
    }
    

    

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('Ticket')
      .setDescription('Information below')
      .addFields(
        {name: 'Problem', value: problem},
        {name: 'Description', value: description},
      )
      .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
      .setTimestamp()
      .setFooter({ text: 'Recoverycord'});
      const row = new ActionRowBuilder().addComponents(approve);
      const categoryID = '1128279885736050808';

      const chann = await interaction.guild.channels.create( {
        name: `${interaction.user.username}-ticket`,
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
      const requiredRole = interaction.member.roles.cache.some((role) => role.name === '「 👑」Management');
      const rID = "855179067388461076"
      chann.send({content: ` <@${interaction.member.user.id}>`, embeds: [embed], components: [row]})

      
    

    const filter = (click) => click.user.id === interaction.user.id;
      const collector = chann.createMessageComponentCollector({
        max: null,
        time: null,
      });

      collector.on('collect', (interaction) => {
        if (!interaction.isButton()) return; 
        if (!requiredRole) {
          return interaction.channel.send('You do not have permission to use this command.');
          
        }
        if (interaction.customId === 'approve') {

          appembed = new EmbedBuilder()
          .setColor('Green')
          .setTitle('Ticket Closed')
          .setDescription('The ticket was closed by')
          .addFields(
            {name:'Closed by:', value:`<@${interaction.member.user.id}>`}
          )
          .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
          .setTimestamp()
          .setFooter({ text: 'Recoverycord'});
          chann.send({embeds:[appembed]})
          logchannel.send({embeds: [appembed.addFields(
            {name:'Problem', value: problem},
            {name: 'Description', value: description},
          )]})
          interaction.deferReply();
          interaction.channel.delete()
        }
       

      });


  }
});

const userTicketChannels = new Map(); // Map to store user IDs and their corresponding ticket channel IDs

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isStringSelectMenu()) return; // Check if the interaction is a select menu
  const { customId, values, guild } = interaction;
  
  if (customId === 'store-options') {
    async function createChan(guild, user, category, selectedOption) {
      const categoryChannel = guild.channels.cache.get(category); // Get the CategoryChannel object
      const userID = user.id;

      if (userTicketChannels.has(userID)) {
        const existingChannelID = userTicketChannels.get(userID);
        try {
          await interaction.reply({ content: `You already have an open ticket in <#${existingChannelID}>.`, ephemeral: true });
        } catch (error) {
          console.error('Error replying to interaction:', error);
        }
      } else {
        const infoembed = new EmbedBuilder()
          .setColor('Blue')
          .setTitle('New Ticket')
          .setDescription('Information below')
          .addFields(
            { name: 'User', value: `<@${interaction.member.user.id}>` },
            { name: 'Inquiry', value: String(selectedOption) }
          )
          .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
          .setTimestamp()
          .setFooter({ text: 'Recovery-Studio' });

        const channel = await interaction.guild.channels.create({
          name: `${interaction.user.username}-ticket`,
          parent: categoryChannel, // Use the CategoryChannel object
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

        await channel.send({ content: `<@${user.id}>`, embeds: [infoembed] });

        userTicketChannels.set(userID, channel.id); // Store the user's ticket channel ID
      }
    }

    // Get the value of the selected option
    const selectedOption = values[0];
    const categoryID = '1128279885736050808'; // Replace with the actual category ID

    switch (selectedOption) {
      case 'dcserver':
      case 'dcbot':
      case 'custom':
        // Call createChan with relevant parameters
        await createChan(guild, interaction.user, categoryID, selectedOption);
        break;

      default:
        // Handle any unexpected values here
        break;
    }

    try {
      await interaction.reply({ content: 'Your ticket was opened successfully!', ephemeral: true });
    } catch (error) {
      console.error('Error replying to interaction:', error);
    }
  }
});



client.on('guildMemberAdd', (member) => {
  const welcomeID = '1124765194539769928'
  const welcomechannel = client.channels.cache.get(welcomeID);
  const welcomeMessages = [
    'Welcome to our server! We hope you enjoy your stay.',
    'Greetings! We are thrilled to have you here.',
    'Welcome, welcome! Get ready to be part of an amazing community.',
    'Hello there! We are excited to see you join us.',
    'Welcome aboard! Prepare to embark on an adventure with us.',
    'Greetings, new member! We look forward to getting to know you.',
    'Welcome to the family! We hope you feel right at home.',
    'Hello and welcome! We can\'t wait to see what you bring to our community.',
    'Welcome! Take a moment to familiarize yourself with our rules and enjoy your time.',
    'Greetings, traveler! We invite you to explore and connect with fellow members.',
    'Welcome, friend! Your presence brightens our server.',
    'Hello and a warm welcome to you! Get ready to make new friends and create amazing memories.',
    'Welcome, stranger! We can\'t wait to see what brings you here.',
    'Greetings, fellow enthusiast! Join us in our shared passion.',
    'Welcome, gamer! Grab a controller and prepare for epic adventures.',
    'Hello and welcome! We hope you find inspiration and camaraderie here.',
    'Welcome, artist! Unleash your creativity and share your works with us.',
    'Greetings, music lover! Let the melodies fill your heart as you join our community.',
    'Welcome, bookworm! Prepare to dive into thrilling discussions and literary journeys.',
    'Hello and welcome! Together, we can learn and grow in our shared interests.'
  ];
  const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
  const randomWelcomeMessage = welcomeMessages[randomIndex];
  const welcomeembed = new EmbedBuilder()
  .setTitle(`Welcome, ${member.user.tag}!`)
  .setDescription(randomWelcomeMessage)
  .setColor('Blue')
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setFooter({text: 'RecoveryCord'})

  welcomechannel.send({embeds:[welcomeembed]})
  
 

});


client.login("MTEyNjExNzQxMzEwMDk3ODI0Ng.GtuYLo.RDnfQa2rN_AFiDoLkFZIuiLVQ9DYaVkqduys5o");