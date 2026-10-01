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
const allureBin = process.platform === 'win32'
  ? path.join(rootDir, 'node_modules', '.bin', 'allure.cmd')
  : path.join(rootDir, 'node_modules', '.bin', 'allure');

const allureResultsDir = path.join(rootDir, 'allure-results');
const allureReportDir = path.join(rootDir, 'allure-report');

if (!fs.existsSync(playwrightCli)) {
  throw new Error(
    'Playwright CLI was not found at: ' + playwrightCli +
    '. Run npm install first.'
  );
}

if (!fs.existsSync(allureBin)) {
  throw new Error(
    'Allure CLI was not found at: ' + allureBin +
    '. Install Allure CLI/package first.'
  );
}

// Start every suite run with a clean Allure results directory.
if (fs.existsSync(allureResultsDir)) {
  fs.rmSync(allureResultsDir, { recursive: true, force: true });
}

fs.mkdirSync(allureResultsDir, { recursive: true });

let failed = false;

console.log('');
console.log('='.repeat(70));
console.log(config.name);
console.log('='.repeat(70));
console.log('Allure results: ' + allureResultsDir);
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
      env: {
        ...process.env,
        ALLURE_RESULTS_DIR: allureResultsDir
      }
    }
  );

  if (result.error) {
    failed = true;
    console.error('FAILED TO START PLAYWRIGHT: ' + result.error.message);

    if (config.continueOnFailure === false) {
      break;
    }

    continue;
  }

  if (result.status !== 0) {
    failed = true;
    console.error('FAILED: ' + spec);

    if (config.continueOnFailure === false) {
      console.error('Stopping suite because continueOnFailure=false');
      break;
    }
  } else {
    console.log('PASSED: ' + spec);
  }

  console.log('');
}

// Always generate the report, including when one or more tests failed.
console.log('');
console.log('='.repeat(70));
console.log('Generating Allure report...');
console.log('='.repeat(70));

const reportResult = spawnSync(
  allureBin,
  ['generate', allureResultsDir, '--clean', '-o', allureReportDir],
  {
    stdio: 'inherit',
    shell: false,
    env: process.env
  }
);

if (reportResult.error || reportResult.status !== 0) {
  console.error(
    'FAILED TO GENERATE ALLURE REPORT: ' +
    (reportResult.error ? reportResult.error.message : 'Allure exited with code ' + reportResult.status)
  );
  failed = true;
} else {
  console.log('');
  console.log('Allure report generated: ' + allureReportDir);
}

console.log('');
console.log('='.repeat(70));
console.log(failed ? 'SUITE FINISHED WITH FAILURES' : 'SUITE PASSED');
console.log('='.repeat(70));

process.exit(failed ? 1 : 0);
