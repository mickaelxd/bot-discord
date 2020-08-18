import { Client } from 'discord.js';
import wiki from 'wikijs';
// import isNotANumber from 'number';
import { prefix, token } from './services/Config';

const client = new Client();

client.once('ready', () => {
  console.log(`🚀 Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activity: {
      name: `${prefix}help`,
      type: 'LISTENING',
    },
  });
});

client.on('message', async (msg) => {
  if (msg.content.startsWith(`${prefix}help`)) {
    return msg.reply(
      `bem vindo! Eu sou o Bot da Equipe Da Teta Grande e estou aqui para te auxiliar em todas as suas dúvidas. \nComandos:\n ${'```'}markdown\n${prefix}help - Ver os comandos \n${prefix}wiki - Pesquisar na wikipedia \n${prefix}play - Tocar música (Youtube)${'```'}`,
    );
  }

  if (msg.content.startsWith(`${prefix}wiki`)) {
    const [, args] = msg.toString().split(/\s(.+)/);

    try {
      await wiki({
        apiUrl: 'https://pt.wikipedia.org/w/api.php',
      }).page(args);
    } catch (e) {
      console.log(e);
      return msg.reply('não encontrei o que você procura');
    }

    const api = await wiki({
      apiUrl: 'https://pt.wikipedia.org/w/api.php',
    }).page(args);

    const content = await api.summary();

    if (content.length > 2000) {
      return msg.channel.send('O conteúdo é grande demais para uma mensagem Discord.');
    }

    msg.channel.send(content);
  }

  if (msg.content.startsWith(`${prefix}play`)) {
    // const [, args] = msg.toString().split(/\s(.+)/);

    return msg.channel.send('Eu ainda não consigo tocar música');
  }

  return null;
});

client.login(token);
