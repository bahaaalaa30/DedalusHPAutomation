const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const suitePath = path.join(rootDir, 'playwright-suite.json');
const suite = JSON.parse(fs.readFileSync(suitePath, 'utf8'));
const config = suite.test;

if (!config.preserveOrder) {
  throw new Error('Suite must have preserveOrder=true');
}

const extraArgs = process.argv.slice(2).filter(arg => !arg.startsWith('--workers='));
const playwrightCli = path.join(rootDir, 'node_modules', 'playwright', 'cli.js');

if (!fs.existsSync(playwrightCli)) {
  throw new Error(
    'Playwright CLI was not found at: ' + playwrightCli +
    '. Run npm install first.'
  );
}

let failed = false;

console.log('');
console.log('='.repeat(70));
console.log(config.name);
console.log('='.repeat(70));
console.log('');

for (let index = 0; index < config.specs.length; index++) {
  const spec = config.specs[index];

  console.log('[' + (index + 1) + '/' + config.specs.length + '] Running: ' + spec);
  console.log('-'.repeat(70));

  const result = spawnSync(
    process.execPath,
    [playwrightCli, 'test', spec, '--workers=1', ...extraArgs],
    {
      stdio: 'inherit',
      env: process.env
    }
  );

  if (result.error) {
    failed = true;
    console.error('FAILED TO START PLAYWRIGHT: ' + result.error.message);

    if (config.continueOnFailure === false) {
      process.exit(1);
    }

    continue;
  }

  if (result.status !== 0) {
    failed = true;
    console.error('FAILED: ' + spec);

    if (config.continueOnFailure === false) {
      console.error('Stopping suite because continueOnFailure=false');
      process.exit(result.status || 1);
    }
  } else {
    console.log('PASSED: ' + spec);
  }

  console.log('');
}

console.log('='.repeat(70));
console.log(failed ? 'SUITE FINISHED WITH FAILURES' : 'SUITE PASSED');
console.log('='.repeat(70));

process.exit(failed ? 1 : 0);
