import * as Discord from 'discord.js';
import { token } from './bot.config.json';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === 'hey google') {
    msg.reply('Sim mestre?');
  }

  if (msg.content === 'toca aquela') {
    msg.reply('Tem certeza mestre?');
  }
});

client.login(token);
