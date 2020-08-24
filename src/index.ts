import { Client } from 'discord.js';
import wiki from 'wikijs';
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
  if (msg.author.bot) return null;
  if (!msg.content.startsWith(prefix)) return null;

  if (msg.content.startsWith(`${prefix}help`)) {
    return msg.channel.send(
      `Bem vindo! Eu sou o Bot da Equipe Da Teta Grande e estou aqui para te auxiliar em todas as suas dúvidas. \nComandos:\n ${'```'}markdown\n${prefix}help - Ver os comandos \n${prefix}wiki - Pesquisar na wikipedia \n${prefix}play - Tocar música${'```'}`,
    );
  }

  if (msg.content.startsWith(`${prefix}wiki`)) {
    const [, args] = msg.toString().split(/\s(.+)/);

    if (!args) {
      return msg.channel.send('Você deve enviar um assunto para eu pesquisar.');
    }

    const api = await wiki({
      apiUrl: 'https://pt.wikipedia.org/w/api.php',
    });

    const searchContent = await (await api.search(args)).results[0];

    if (!searchContent) {
      return msg.channel.send('Eu não consegui encontrar o que você procura.');
    }

    const content = await (await api.page(searchContent)).summary();

    if (content.length > 2000) {
      return content.split('\n').map((paragraph) => {
        if (paragraph !== '') {
          return msg.channel.send(paragraph);
        }

        return null;
      });
    }

    return msg.channel.send(content);
  }

  if (msg.content.startsWith(`${prefix}play`)) {
    return msg.channel.send('Pra que tu precisa de mais um bot de música? De qualquer forma eu ainda não sei tocar música, mas você pode doar dinheiros para o dono do projeto para que ele possa se esforçar e aprender mais sobre como fazer eu tocar uma musiquinha legal.');
  }
  return null;
});

client.login(token);
