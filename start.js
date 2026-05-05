#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const isWindows = os.platform() === 'win32';
const shell = isWindows ? true : false;

console.log('🚀 Starting Zero Gravity Backend and Frontend...\n');

// Start Backend
const backendPath = path.join(__dirname, 'backend');
const backendProcess = spawn('npm', ['run', 'dev'], {
  cwd: backendPath,
  shell: shell,
  stdio: 'inherit',
});

// Start Frontend
const frontendPath = path.join(__dirname, 'frontend');
const frontendProcess = spawn('npm', ['run', 'dev'], {
  cwd: frontendPath,
  shell: shell,
  stdio: 'inherit',
});

console.log('✅ Backend running at: http://localhost:5000');
console.log('✅ Frontend running at: http://localhost:3001\n');
console.log('Press Ctrl+C to stop both servers.\n');

// Handle exit signals
const handleExit = () => {
  console.log('\n🛑 Stopping servers...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit(0);
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);

// Log if processes exit unexpectedly
backendProcess.on('exit', (code) => {
  if (code !== null && code !== 0) {
    console.error(`❌ Backend process exited with code ${code}`);
  }
});

frontendProcess.on('exit', (code) => {
  if (code !== null && code !== 0) {
    console.error(`❌ Frontend process exited with code ${code}`);
  }
});
