const fs = require('fs');
const { parse } = require('node-html-parser');
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const github = require('@actions/github');

async function run() {
  // const githubToken = proccess.env.GITHUB_TOKEN;
  const discordToken = process.env.DISCORD_TOKEN;

  // const octokit = github.getOctokit(githubToken);

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
        { name: '% Statements', value: info.coverage.statements, inline: true },
        { name: '% Branch', value: info.coverage.branch, inline: true },
        { name: '% Functions', value: info.coverage.functions, inline: true },
        { name: '% Lines', value: info.coverage.lines, inline: true },
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

    console.log('PR:');
    console.log(pull_request);

    console.log('CTX:');
    console.log(context);

    return {
      title: 'feat: CL-12 Unit tests',
      link: 'https://github.com/FrancoAdN/ta-core-lib/pull/16',
      author: {
        username: 'FrancoAdN',
        avatar: client.user.avatarURL,
      },
      filesChanged: 16,
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
