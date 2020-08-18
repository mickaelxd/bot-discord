import { Client } from 'discord.js';
import searchOnGoogle from '../services/searchOnGoogle';

const client = new Client();

client.on('message', async (msg) => {
  const parsedMessage = msg.toString();

  if (msg.author.bot === true) {
    return 'Only Humans can call me. Sorry Alexa.';
  }

  if (msg.content.includes('google!')) {
    const [, content] = parsedMessage.split(/!(.+)/);

    // return console.log(content);

    if (content === undefined) {
      return msg.reply('você deve enviar um conteúdo após me chamar.');
    }

    const response = await searchOnGoogle(content);

    msg.reply(response);
  }

  return this;
});
