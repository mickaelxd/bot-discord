import * as Discord from 'discord.js';
import wiki from 'wikijs';
// import isNotANumber from 'number';
import { prefix, token } from './services/Config';

const client = new Discord.Client();

client.once('ready', () => {
  console.log(`🚀 Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  if (msg.content.startsWith(`${prefix}help`)) {
    return msg.reply(
      'Olá, eu sou seu Bot assistente e estou aqui para te auxiliar em todas as suas dúvidas',
    );
  }

  if (msg.content.startsWith(`${prefix}wiki`)) {
    const [, args] = msg.toString().split(/\s(.+)/);
    // return console.log(args);

    const api = await wiki({ apiUrl: 'https://pt.wikipedia.org/w/api.php' }).page(args);

    const content = await api.mainImage();

    msg.reply((content || 'Não consegui encontrar o que você procura'));

    // if (await api.info('alterEgo') === null || undefined || '') {
    //   msg.reply('Não consegui encontrar o que você procura');
    // } else {
    //   msg.reply(await api.info('alterEgo'));
    // }
  }

  return null;
});

// TODO: Add commands to this method

client.login(token);
