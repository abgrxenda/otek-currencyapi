const { spawn } = require('child_process');
const path = require('path');

// Start PM2 and your app
const pm2Path = path.join(__dirname, 'node_modules', '.bin', 'pm2');
const appPath = path.join(__dirname, 'index.js');

const pm2Process = spawn(pm2Path, ['start', appPath, '--name', 'xe-api'], {
  stdio: 'inherit',
  cwd: __dirname
});

pm2Process.on('close', (code) => {
  console.log(`PM2 process exited with code ${code}`);
});