import fs from 'fs';
import path from 'path';
import simpleGit, { CleanOptions } from 'simple-git';

const sshKnownHosts = path.resolve(`~/.ssh/known_hosts`)
const sshKey = path.resolve(`~/.ssh/id_ed25519`)

const GIT_SSH_COMMAND = `ssh -o UserKnownHostsFile=${sshKnownHosts} -o StrictHostKeyChecking=no -i ${sshKey}`

const git = simpleGit(process.cwd())
  .env('GIT_SSH_COMMAND', GIT_SSH_COMMAND)
  .clean(CleanOptions.FORCE);


const packageJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }));
const moduleJson = JSON.parse(fs.readFileSync('./module.json', { encoding: 'utf-8' }));

let version = packageJson.version.split('.');

if (process.argv.length === 2) {
  console.error('Incorrect usage: Expected one argument');
  console.log('Correct Usage:');
  console.log('node ./release.js (--major|--minor|--bugfix)');
  process.exit(1);
}

if (process.argv[2] === '--major') {
  version[0] = parseInt(version[0]) + 1;
  version[1] = 0;
  version[2] = 0;
} else if (process.argv[2] === '--minor') {
  version[1] = parseInt(version[1]) + 1;
  version[2] = 0;
} else if (process.argv[2] === '--bugfix') {
  version[2] = parseInt(version[2]) + 1;
} else {
  console.error('Incorrect usage: incorrect version upgrade');
  console.log('Correct Usage:');
  console.log('node ./release.js (--major|--minor|--bugfix)');
  process.exit(1);
}

packageJson.version = version.join('.');
moduleJson.version = version.join('.');

moduleJson.download = `https://github.com/dan-cave/gaming-table/releases/download/v${packageJson.version}/gaming-table.zip`;
moduleJson.manifest = `https://github.com/dan-cave/gaming-table/releases/download/v${packageJson.version}/module.json`;

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2), { encoding: 'utf-8' });

console.log(`Finished setting package.json version to ${packageJson.version}`);

fs.writeFileSync('./module.json', JSON.stringify(moduleJson, null, 2), { encoding: 'utf-8' });

console.log(`Finished setting module version to ${moduleJson.version}`);
console.log(`Finished setting module download URL to ${moduleJson.download}`);
console.log(`Finished setting module manifest URL to ${moduleJson.manifest}`);

console.log(`Creating release commit v${version.join('.')} release`);
await git.add(['./package.json', './module.json', './CHANGELOG.md']);
await git.commit(`Automated release commit for v${version.join('.')}`);

console.log(`Creating tag v${version.join('.')} release`);
await git.addTag(`v${version.join('.')}`);

console.log(`Pushed release commit and tag for v${version.join('.')} release`);
await git.push();
await git.pushTags();
