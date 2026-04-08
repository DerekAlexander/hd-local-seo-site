import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { exec } = await import('child_process');
    
    // Get sessions to see active agents
    const sessionsResult = exec('openclaw sessions list --json', { 
      encoding: 'utf8',
      timeout: 10000 
    });
    
    // Get cron status for schedule
    const cronResult = exec('openclaw cron list --json', { 
      encoding: 'utf8', 
      timeout: 10000 
    });
    
    // Get GitHub status for recent deployments
    const githubResult = exec('cd mission-control && git log -3 --oneline --format="%h %s"', {
      encoding: 'utf8',
      timeout: 5000
    });
    
    // Parse the results - for now just return raw
    let agents = [];
    let schedule = [];
    let github = [];
    
    try {
      // Try to parse cron JSON
      const cronLines = cronResult.split('\n').filter(l => l.trim().startsWith('{'));
      if (cronLines.length > 0) {
        schedule = JSON.parse(cronLines[0]);
        if (Array.isArray(schedule)) {
          schedule = schedule.map(j => ({
            name: j.name,
            status: j.enabled ? 'active' : 'disabled',
            nextRun: j.state?.nextRunAtMs,
            lastRun: j.state?.lastRunAtMs
          }));
        }
      }
    } catch (e) {
      schedule = [];
    }
    
    return NextResponse.json({
      success: true,
      agents,
      schedule,
      github,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      mock: true,
      message: 'Using mock data'
    });
  }
}