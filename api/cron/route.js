import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Call OpenClaw CLI to get cron jobs
    const { exec } = await import('child_process');
    
    // Use the exec promise wrapper
    const { exec: execSync } = require('child_process');
    
    // Get cron jobs from OpenClaw
    const result = execSync('openclaw cron list --json', { 
      encoding: 'utf8',
      timeout: 10000 
    });
    
    let cronJobs = [];
    try {
      // Try to parse JSON output
      const lines = result.split('\n').filter(l => l.trim());
      // Find JSON lines (start with { or [)
      const jsonLine = lines.find(l => l.trim().startsWith('{') || l.trim().startsWith('['));
      if (jsonLine) {
        cronJobs = JSON.parse(jsonLine);
      }
    } catch (e) {
      // If JSON parse fails, create mock from text
      cronJobs = result.split('\n')
        .filter(line => line.includes('Daily') || line.includes('Hour'))
        .map(line => ({
          name: line.match(/Daily|G Hour/)?.[0] || 'Unknown',
          status: line.includes('running') ? 'active' : 'idle',
          lastRun: new Date().toISOString()
        }));
    }
    
    return NextResponse.json({ 
      success: true, 
      cronJobs,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    // Return mock data if OpenClaw call fails
    return NextResponse.json({ 
      success: false,
      error: error.message,
      cronJobs: [],
      mock: true,
      message: 'Using mock data - OpenClaw CLI not accessible'
    });
  }
}