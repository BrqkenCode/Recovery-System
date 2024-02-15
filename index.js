const { Channel } = require('diagnostics_channel');
const { Client, Collection, GatewayIntentBits, ActivityType, Events, EmbedBuilder, PermissionsBitField, Embed, StringSelectMenuBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Permissions, ChannelType } = require('discord.js');
const shortid = require('shortid');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
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

const childProcess = spawn('node', ['slashcommandHandler.js']);

childProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

childProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

childProcess.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


for (const file of commandFiles) {
  try {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  } catch (error) {
    console.error(`Error loading command file: ${file}`, error);
  }
}




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

    
    const logchannelID = '1206693622909509665';
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
      const categoryID = '1206693622909509665';

      const chann = await interaction.guild.channels.create( {
        name: `${interaction.user.username}-request`,
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
      const categoryID = '1206694812456329238';

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
      try {
        await interaction.reply({ content: 'Your ticket was opened successfully!', ephemeral: true });
      } catch (error) {
        console.error('Error replying to interaction:', error);
      }

      
    

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
  const selectedOption = values[0];
  if (customId === 'store-options') {
    // Get the value of the selected option
    
   // Replace with the actual category ID
    let newMenuOptions = [];

    switch (selectedOption) {

      case 'Discord-Server':
        newMenuOptions=[
          {label: 'Server-Template', value:'servertemplate'},
          {label:'Server-Setup', value:'serversetup'},
          {label: 'Custom package', value:'customserver'}
        ]
        
        break;

      case 'Discord-Bot':
        newMenuOptions=[
          {label: 'System-Bot', value:'System-Bot'},
          {label: 'Moderation-Bot', value:'Moderation-Bot'},
          {label: 'Support-Bot', value:'Support-Bot'},
          {label: 'Fun-Bot', value:'Fun-Bot'},
          {label: 'Administration-Bot',value:'Administration-Bot'},
          {label: 'Custom Bot ',  value:'Custom-Bot'}

        ]
        
        break;
      case 'Custom':
        newMenuOptions=[
          {label: 'Custom package', value:'custom'}
        ]
        
        
        break;

      default:
        // Handle any unexpected values here
        break;
        
    }
    const newSelectMenu = new StringSelectMenuBuilder()
      .setCustomId('sub-menu')
      .addOptions(newMenuOptions);

    await interaction.reply({
      content: 'Select an option to proceed:',
      ephemeral: true,
      components: [{ type: 1, components: [newSelectMenu] }],
    });
    
    
  
  }else if (customId === 'sub-menu'){
    const categoryID = '1206694812456329238';
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
            { name: 'Inquiry', value: String(selectedOption) },
            { name:'Order-ID', value: shortid.generate()},
            {name:'**NOTE**', value: 'All orders are currently preorders!'}
          )
          .setThumbnail('https://cdn.discordapp.com/attachments/1061023152571961355/1125728746779975770/Kopie_von_Recovery.png')
          .setTimestamp()
          .setFooter({ text: 'Recovery-Studio' });

        const channel = await interaction.guild.channels.create({
          name: `${interaction.user.username}-ticket`,
          parent: 1206694812456329238, // Use the CategoryChannel object
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
    await createChan(guild, interaction.user, categoryID, selectedOption);

   
    
    
    try {
      await interaction.reply({ content: 'Your ticket was opened successfully!', ephemeral: true });
    } catch (error) {
      console.error('Error replying to interaction:', error);
    }

  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'confirm' || interaction.customId === 'cancel') {
      const clientuser = interaction.message.embeds[0].fields[0].value.replace('<@', '').replace('>', '').replace('!', '');
      const oID = interaction.message.embeds[0].fields[1].value;
      const bottyp = interaction.message.embeds[0].fields[2].value;
      const payment = interaction.message.embeds[0].fields[3].value;

      // Your permission check
      const requiredRole = interaction.member.roles.cache.some(role => role.name === '「 👑」Management');
      if (!requiredRole) {
          return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
      }

      const order = { id: oID, userid: clientuser, reqs: bottyp, payment: payment, status: 'Not started yet' };
      // Your saveOrderToFile logic here

      const embed = new EmbedBuilder()
          .setColor('Green')
          .setTitle('Order Stored')
          .setDescription(`Order ID: ${order.id}\nBot Type: ${order.reqs}`)
          .setThumbnail('https://us-east-1.tixte.net/uploads/files.brqkencode.de/dclogo.png?AWSAccessKeyId=WHPVCLA8APE07J047F9D&Expires=1688990541&Signature=hzObFrZAW8RgMFCE2%2BttcumoYS0%3D')
          .setTimestamp()
          .setFooter({text:'Recovery-Studio'});

      const decembed = new EmbedBuilder()
          .setColor('Red')
          .setTitle('Order Canceled')
          .setDescription(`Order ID: ${order.id}\nBot Type: ${order.reqs}`)
          .setTimestamp()
          .setFooter({text:'Recovery-Studio'});

      // Update the original message to remove buttons
      const originalMessage = interaction.message;
      const newEmbed = originalMessage.embeds[0];
      newEmbed.fields.pop(); // Remove the buttons field

      await originalMessage.edit({ embeds: [newEmbed], components: [] }); // Remove components
      saveOrderToFile(order)

      // Send the response using interaction.reply() with ephemeral
      if (interaction.customId === 'confirm') {
          await interaction.reply({ content: 'Order Stored', embeds: [embed], ephemeral: false });
          await originalMessage.delete();
      } else if (interaction.customId === 'cancel') {
          await interaction.reply({ content: 'Order Canceled', embeds: [decembed], ephemeral: false });
          await originalMessage.delete();
      }
  }
});

function saveOrderToFile(order) {
  const orders = loadOrdersFromFile();
  orders.push(order);
  fs.writeFileSync(path.join(__dirname, 'orders.json'), JSON.stringify(orders, null, 2), 'utf8');
}

function loadOrdersFromFile() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'orders.json'), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading orders.json:', err);
    return [];
  }
}



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








client.login("MTEyNjExNzQxMzEwMDk3ODI0Ng.GWbXqy.xojm6fH37GspHIuRsnCXYlQec5oeVsFKvCGwbQ");