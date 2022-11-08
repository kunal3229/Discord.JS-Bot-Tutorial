require('dotenv').config();

// console.log(process.env.DISCORDJS_BOT_TOKEN);

const { Client, WebhookClient} = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(
    '1039619498556260413',
    '7Irr9kbdT8hSVW5qqUeI88xB6BdR72xgW2v96Ktq0xHHq9_frsvAgu9qroCmzxL1Vv8M',
)

const PREFIX = "$";
// const mySecret = `${process.env['DISCORDJS_BOT_TOKEN']}`;

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    // console.log(`[${message.author.tag}]: ${message.content}`);
    if(message.content === 'hello') {
        message.channel.send('hello');
    }
    
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
        // console.log(CMD_NAME);
        // console.log(args);
        if(CMD_NAME === 'kick'){
            if(!message.member.hasPermission('KICK_MEMBERS')) 
            return message.reply('You do not have permissions to use that command');
            if(args.length === 0) return message.reply('Please provide an id');
            const member = message.guild.members.cache.get(args[0]);
            if(member) {
                member.kick()
                .then((member) => message.channel.send(`${member} was kicked`))
                .catch((err) => message.channel.send('I can not kick that user :( '));
            } else {
                message.channel.send('That member was not found');
            }
        } else if(CMD_NAME === 'ban') {
            if(!message.member.hasPermission('BAN_MEMBERS')) 
            return message.reply('You do not have permissions to use that command');
            if(args.length === 0) return message.reply('Please provide an id');

            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('User was banned successfully');
            } catch (err) {
                message.channel.send('An error occured. Either I do not have permissions or user not found');
            }
        } else if(CMD_NAME === 'announce') {
            console.log(args);
            const msg = args.join(' ');
            console.log(msg);
            webhookClient.send(msg);
        } 
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    console.log('hello!');
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '1039610228607570000' ) {
        switch(name) {
            case '🍎':
                member.roles.add('1039610279685791786');
            break;
            case '🍌':
                member.roles.add('1039610394622308503');
            break;
            case '🍇':
                member.roles.add('1039610483206017094');
            break;
            case '🍑':
                member.roles.add('1039610565271748638');
            break;
        }
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    console.log('hello!');
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '1039610228607570000' ) {
        switch(name) {
            case '🍎':
                member.roles.remove('1039610279685791786');
            break;
            case '🍌':
                member.roles.remove('1039610394622308503');
            break;
            case '🍇':
                member.roles.remove('1039610483206017094');
            break;
            case '🍑':
                member.roles.remove('1039610565271748638');
            break;
        }
    }
});

client.login('MTAzOTI1NDA0Mzk3MDc4MTIwNA.GaYci8.1QZpBkQYlj34EzTHoQ5eB8d2SCunU7jujSGc2o');