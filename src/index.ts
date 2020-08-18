import fs from 'fs';
import * as Discord from 'discord.js';
import { prefix, token } from '../bot.config.json';

const client = new Discord.Client();

client.once('ready', () => {
  console.log(`🚀 Logged in as ${client.user.tag}!`);
});

// TODO: Add commands to this method

client.login(token);
