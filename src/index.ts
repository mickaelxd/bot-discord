import * as Discord from 'discord.js';
import { token } from '../bot.config.json';

const client = new Discord.Client();

client.once('ready', () => {
  console.log(`🚀 Logged in as ${client.user.tag}!`);
});

client.login(token);

client.on('message', (msg) => {
  const parsedMessage = msg.toString();

  const [callGoogle, content] = parsedMessage.split('!');

  if (!callGoogle.includes('google')) {
    return console.log('You should put Google on your message');
  }

  return console.log(callGoogle, content);
  // msg.content(['hey google', content])
});
