import { Client, MessageEmbed } from 'discord.js';
import wiki from 'wikijs';
import axios from 'axios';
import { prefix, token } from './services/Config';

interface Repository {
  id?: Number;
  name?: String;
  description?: String;
}

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
  if (!msg.content.startsWith(prefix) || msg.author.bot) return null;

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

    const api = wiki({
      apiUrl: 'https://pt.wikipedia.org/w/api.php',
    });

    const searchContent = (await api.search(args)).results[0];

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

  if (msg.content.startsWith(`${prefix}github`)) {
    const [, args] = msg.toString().split(/\s(.+)/);

    if (!args) {
      return msg.channel.send('Você deve enviar um perfil para pesquisar.');
    }

    const { data: user } = await axios.get(`https://api.github.com/users/${args}`);
    const { data: repos } = await axios.get(`https://api.github.com/users/${args}/repos`);

    const repositories = repos.map((repo: Repository) => (
      { name: `${repo.name}`, value: `${repo.description ? repo.description : 'No description available'}` }
    ));

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    const embedMessage = new MessageEmbed()
      .setColor(randomColor)
      .setTitle('Github Profile')
      .setAuthor(user.login, user.avatar_url, user.url)
      .setDescription(user.bio ? user.bio : 'No description available')
      .setThumbnail(user.avatar_url)
      .addFields(repositories)
      .setTimestamp();

    // console.log(embedMessage);
    msg.channel.send(embedMessage);
  }

  if (msg.content.startsWith(`${prefix}play`)) {
    return msg.channel.send('Pra que tu precisa de mais um bot de música? De qualquer forma eu ainda não sei tocar música, mas você pode doar dinheiros para o dono do projeto para que ele possa se esforçar e aprender mais sobre como fazer eu tocar uma musiquinha legal.');
  }
  return null;
});

client.login(token);
