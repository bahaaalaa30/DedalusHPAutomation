const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const suitePath = path.resolve(__dirname, '..', 'playwright-suite.json');
const suite = JSON.parse(fs.readFileSync(suitePath, 'utf8'));
const config = suite.test;

if (!config.preserveOrder) {
  throw new Error('Suite must have preserveOrder=true');
}

const extraArgs = process.argv.slice(2).filter(arg => !arg.startsWith('--workers='));
const playwrightBin = process.platform === 'win32'
  ? path.resolve(__dirname, '..', 'node_modules', '.bin', 'playwright.cmd')
  : path.resolve(__dirname, '..', 'node_modules', '.bin', 'playwright');

let failed = false;

console.log('');
console.log('='.repeat(70));
console.log(config.name);
console.log('='.repeat(70));
console.log('');

config.specs.forEach((spec, index) => {
  console.log('[' + (index + 1) + '/' + config.specs.length + '] Running: ' + spec);
  console.log('-'.repeat(70));

  const result = spawnSync(
    playwrightBin,
    ['test', spec, '--workers=1', ...extraArgs],
    { stdio: 'inherit', shell: false, env: process.env }
  );

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
});

console.log('='.repeat(70));
console.log(failed ? 'SUITE FINISHED WITH FAILURES' : 'SUITE PASSED');
console.log('='.repeat(70));
process.exit(failed ? 1 : 0);
