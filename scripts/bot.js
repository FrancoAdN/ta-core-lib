const fs = require('fs');
const { parse } = require('node-html-parser');
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const github = require('@actions/github');

async function run() {
  const discordToken = process.env.DISCORD_TOKEN;

  const createEmbedMessage = (info) => {
    return new MessageEmbed()
      .setColor(info.coverage.status === 'SUCCEED' ? '#00FF00' : '#FF0000')
      .setTitle(`New PR created, ${info.PR.title}`)
      .setURL(info.PR.link)
      .setAuthor({
        name: info.PR.author.username,
        iconURL: info.PR.author.avatar,
      })
      .setDescription(
        `
    A new PR has been created, and needs your review!
    Here are some of its properties`,
      )
      .addField('\u200b', '\u200b')
      .addField('Files changed:', `${info.PR.filesChanged}`)
      .addField('Test coverage:', `status: ${info.coverage.status}!`)
      .addFields(
        {
          name: '% Statements',
          value: info.coverage.Statements,
          inline: true,
        },
        { name: '% Branches', value: info.coverage.Branches, inline: true },
        { name: '% Functions', value: info.coverage.Functions, inline: true },
        { name: '% Lines', value: info.coverage.Lines, inline: true },
      )
      .addField('\u200b', '\u200b')
      .setTimestamp()
      .setFooter({
        text: 'Please, take a look at the PR as soon as you have a moment',
      });
  };

  const getCoverageInfo = () => {
    const DEFAULT = {
      status: 'FAILED',
      statements: '0',
      branch: '0',
      functions: '0',
      lines: '0',
    };
    const COVERAGE_PATH = 'coverage/lcov-report/utils/index.html';
    const COVERAGE_THRESHOLD = 98;
    if (fs.existsSync(COVERAGE_PATH)) {
      const data = fs.readFileSync(COVERAGE_PATH, {
        encoding: 'utf8',
        flag: 'r',
      });
      const root = parse(data);
      const divs = root.querySelectorAll('.pad1y');
      return divs.reduce(
        (acc, curr) => {
          const spans = curr.getElementsByTagName('span');
          const cov = parseInt(spans[0].text.split('%')[0]);
          if (cov < COVERAGE_THRESHOLD) acc.status = 'FAILED';
          acc = {
            ...acc,
            [spans[1].text]: cov.toString(),
          };
          return acc;
        },
        { status: 'SUCCEED' },
      );
    }
    return DEFAULT;
  };

  const getPRinfo = () => {
    const { context = {} } = github;
    const { pull_request } = context.payload;
    console.log(pull_request);

    const author = {
      avatar: pull_request.user.avatar_url,
      username: pull_request.user.login,
    };

    return {
      title: pull_request.title,
      link: pull_request.html_url,
      author,
      filesChanged: pull_request.changed_files,
    };
  };

  client.on('ready', async () => {
    const CHANNEL = 'ta-core-lib-coverage';
    console.log(`Logged in as ${client.user.tag}!`);

    const messageInfo = {
      PR: getPRinfo(),
      coverage: getCoverageInfo(),
    };

    const channel = client.channels.cache.find((ch) => ch.name === CHANNEL);
    await channel.send({
      embeds: [createEmbedMessage(messageInfo)],
    });
    process.exit(1);
  });

  client.login(discordToken);
}

run();
