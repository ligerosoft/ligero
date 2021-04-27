const fs = require('fs');
const inquirer = require('inquirer');
const { inc } = require('semver');
const pkg = require('../package.json');
const chalk = require('chalk');
const path = require('path');
const exec = require('./utils/exec');

const currentVersion = pkg.version;

const run = async (command, args, options) => {
  console.log(chalk.green(command));
  await exec(command, args, options);
};

const getNextVersions = () => {
  return {
    major: inc(currentVersion, 'major'),
    minor: inc(currentVersion, 'minor'),
    patch: inc(currentVersion, 'patch'),
    premajor: inc(currentVersion, 'premajor'),
    preminor: inc(currentVersion, 'preminor'),
    prepatch: inc(currentVersion, 'prepatch'),
    prerelease: inc(currentVersion, 'prerelease'),
  };
};

const timeLog = (info = '', type) => {
  if (type === 'start') {
    info = `=> 开始任务：${info}`;
  } else {
    info = `=> 结束任务：${info}`;
  }
  const date = new Date();
  console.log(
    `[${date.toLocaleString()}.${date
      .getMilliseconds()
      .toString()
      .padStart(3, '0')}] ${info}`,
  );
};

async function prompt() {
  const nextVersions = getNextVersions();
  const { nextVersion } = await inquirer.prompt({
    type: 'list',
    name: 'nextVersion',
    message: `💙 请选择发布的版本（当前版本 ${currentVersion})`,
    choices: Object.keys(nextVersions).map(v => ({
      name: `${v} => ${nextVersions[v]}`,
      value: nextVersions[v],
    })),
  });
  return nextVersion;
}
async function updateVersion(nextVersion) {
  pkg.version = nextVersion;
  timeLog(`👍修改package.json版本号`, 'start');
  await fs.writeFileSync(
    path.resolve(__dirname, '../package.json'),
    `${JSON.stringify(pkg, null, 2)}\n`,
    'utf-8',
  );
  timeLog(`⭐ 修改package.json版本号`, 'end');
}

async function generateChangelog() {
  timeLog(`👍 生成CHANGELOG.md`, 'start');
  await run('npm', ['run', 'changelog']);
  timeLog(`👍 生成CHANGELOG.md`, 'end');
}
async function push(nextVersion) {
  timeLog(`👍 推送代码到git仓库`, 'start');
  await run('git', ['add', 'package.json', 'CHANGELOG.md']);
  await run('git', ['commit', '-m', `v${nextVersion}`]);
  await run(`git push`);
  timeLog(`👍 推送代码到git仓库`, 'end');
}
async function build() {
  timeLog(`👍 组件库打包`, 'start');
  await run('npm run build');
  timeLog(`👍 组件库打包`, 'end');
}
async function publish() {
  timeLog(`👍 发布组件库`, 'start');
  await run('npm publish');
  timeLog(`👍 发布组件库`, 'end');
}
async function tag(nextVersion) {
  timeLog(`👍 打tag并推送至git`, 'start');
  await run(`git tag v${nextVersion}`);
  await run(`git push origin tag v${nextVersion}`);
  timeLog(`👍 打tag并推送至git`, 'end');
}
async function main() {
  try {
    const nextVersion = await prompt();
    const startTime = Date.now();

    await updateVersion(nextVersion);

    await generateChangelog();

    await push(nextVersion);

    await build();

    await publish();

    await tag(nextVersion);

    console.log(`✨ 发布流程结束 共耗时${((Date.now() - startTime) / 1000).toFixed(3)}s`);
  } catch (e) {
    console.log('💣 发布失败，失败原因：', e);
  }
}

main();
