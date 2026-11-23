const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const suitePath = path.join(rootDir, 'playwright-suite.json');
const suiteFile = JSON.parse(fs.readFileSync(suitePath, 'utf8'));

function readSuiteName(args) {
  const suiteArgIndex = args.findIndex(arg => arg === '--suite' || arg.startsWith('--suite='));

  if (suiteArgIndex === -1) {
    return 'normal-cases';
  }

  const arg = args[suiteArgIndex];
  const suiteName = arg === '--suite'
    ? args[suiteArgIndex + 1]
    : arg.slice('--suite='.length);

  if (!suiteName) {
    throw new Error('Missing suite name. Example: --suite=payer-integration');
  }

  return suiteName;
}

const inputArgs = process.argv.slice(2);
const suiteName = readSuiteName(inputArgs);
const config = suiteFile.suites && suiteFile.suites[suiteName];

if (!config) {
  const availableSuites = Object.keys(suiteFile.suites || {}).join(', ');
  throw new Error(
    'Unknown suite "' + suiteName + '". Available suites: ' + availableSuites
  );
}

if (!config.preserveOrder) {
  throw new Error('Suite must have preserveOrder=true');
}

const extraArgs = inputArgs.filter((arg, index) => {
  if (arg === '--suite') return false;
  if (index > 0 && inputArgs[index - 1] === '--suite') return false;
  if (arg.startsWith('--suite=')) return false;
  if (arg.startsWith('--workers=')) return false;
  return true;
});

const workers = Number.isInteger(config.workers) && config.workers > 0
  ? config.workers
  : 1;

const playwrightCli = path.join(rootDir, 'node_modules', 'playwright', 'cli.js');
const allureBin = process.platform === 'win32'
  ? path.join(rootDir, 'node_modules', '.bin', 'allure.cmd')
  : path.join(rootDir, 'node_modules', '.bin', 'allure');

const allureResultsDir = path.join(rootDir, 'allure-results', suiteName);
const allureReportDir = path.join(rootDir, 'allure-report', suiteName);

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

// Clean only this suite's Allure data. Other suites' results and reports are preserved.
if (fs.existsSync(allureResultsDir)) {
  fs.rmSync(allureResultsDir, { recursive: true, force: true });
}

fs.mkdirSync(allureResultsDir, { recursive: true });

let failed = false;

console.log('');
console.log('='.repeat(70));
console.log(config.name + ' [' + suiteName + ']');
console.log('='.repeat(70));
console.log('Workers: ' + workers);
console.log('Allure results: ' + allureResultsDir);
console.log('');

for (let index = 0; index < config.specs.length; index++) {
  const spec = config.specs[index];

  console.log('[' + (index + 1) + '/' + config.specs.length + '] Running: ' + spec);
  console.log('-'.repeat(70));

  const result = spawnSync(
    process.execPath,
    [playwrightCli, 'test', spec, '--workers=' + workers, ...extraArgs],
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

// Generate an isolated Allure report for the selected suite only.
console.log('');
console.log('='.repeat(70));
console.log('Generating Allure report for ' + config.name + '...');
console.log('='.repeat(70));

const reportArgs = [
  'generate',
  allureResultsDir,
  '--clean',
  '-o',
  allureReportDir
];

const reportResult = process.platform === 'win32'
  ? spawnSync(
      process.env.ComSpec || 'cmd.exe',
      ['/d', '/c', 'call', '"' + allureBin + '"', ...reportArgs],
      {
        stdio: 'inherit',
        shell: false,
        env: process.env
      }
    )
  : spawnSync(
      allureBin,
      reportArgs,
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
