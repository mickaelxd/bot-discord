import { Client } from 'discord.js';
import { token } from '../bot.config.json';
import searchOnGoogle from './services/search';

const client = new Client();

client.once('ready', () => {
  console.log(`🚀 Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  const parsedMessage = msg.toString();

  if (msg.author.bot === true) {
    return 'Only Humans can call me. Sorry Alexa.';
  }

  if (msg.content.includes('google!')) {
    const [, content] = parsedMessage.split(/!(.+)/);

    const response = await searchOnGoogle(content);

    msg.reply(response);
  } else {
    return msg.reply('Você deve me chamar com "Google!" na frente');
  }
});

client.login(token);
