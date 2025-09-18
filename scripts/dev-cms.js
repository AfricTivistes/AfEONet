#!/usr/bin/env node

/**
 * Development script for AfEONet Decap CMS
 * Starts both Next.js dev server and Decap CMS proxy server
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AfEONet development environment...\n');

// Start Next.js dev server
console.log('📦 Starting Next.js development server on port 5000...');
const nextjs = spawn('npm', ['run', 'dev', '--', '--port', '5000'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  cwd: process.cwd()
});

nextjs.stdout.on('data', (data) => {
  process.stdout.write(`[Next.js] ${data}`);
});

nextjs.stderr.on('data', (data) => {
  process.stderr.write(`[Next.js] ${data}`);
});

// Wait a bit, then start Decap CMS proxy server
setTimeout(() => {
  console.log('\n📝 Starting Decap CMS proxy server on port 8081...');
  const decapServer = spawn('npx', ['decap-server'], {
    stdio: ['inherit', 'pipe', 'pipe'],
    cwd: process.cwd()
  });

  decapServer.stdout.on('data', (data) => {
    process.stdout.write(`[Decap CMS] ${data}`);
  });

  decapServer.stderr.on('data', (data) => {
    process.stderr.write(`[Decap CMS] ${data}`);
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down development servers...');
    nextjs.kill('SIGINT');
    decapServer.kill('SIGINT');
    process.exit(0);
  });

  decapServer.on('close', (code) => {
    if (code !== 0) {
      console.log(`\n❌ Decap CMS proxy server exited with code ${code}`);
    }
  });

  console.log('\n✅ Development environment ready!');
  console.log('📱 Website: http://localhost:5000');
  console.log('⚙️  Admin Panel: http://localhost:5000/admin');
  console.log('\nPress Ctrl+C to stop all servers.');

}, 3000);

nextjs.on('close', (code) => {
  if (code !== 0) {
    console.log(`\n❌ Next.js development server exited with code ${code}`);
  }
});