import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

function parseHeartbeat() {
  try {
    const workspaceRoot = path.join(process.cwd(), '..', '..');
    const filePath = path.join(workspaceRoot, 'HEARTBEAT.md');

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const jobs = [];

    const lines = content.split('\n');
    let currentJob = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Match job headers: ### Job Name @ Time
      const jobMatch = line.match(/^###\s+(.+?)\s+@\s+(.+?)$/);
      if (jobMatch) {
        if (currentJob) {
          jobs.push(currentJob);
        }
        currentJob = {
          name: jobMatch[1].trim(),
          schedule: jobMatch[2].trim(),
          status: 'active',
          description: '',
          lastRun: null,
          nextRun: null
        };
        continue;
      }

      // Match simpler headers: ### Job Name (without @)
      if (line.match(/^###\s+[A-Z]/) && !line.includes('@') && !line.match(/^###\s+\d+\./)) {
        if (currentJob) {
          jobs.push(currentJob);
        }
        const name = line.replace(/^###\s+/, '').trim();
        currentJob = {
          name: name,
          schedule: 'manual',
          status: 'active',
          description: '',
          lastRun: null,
          nextRun: null
        };
        continue;
      }

      // Extract status
      if (currentProject && line.includes('PAUSED')) {
        currentJob.status = 'paused';
      } else if (currentJob && line.includes('DEPLOYED')) {
        currentJob.status = 'active';
      }

      // Extract description
      if (currentJob && line.startsWith('**Status**')) {
        const desc = lines[i + 1]?.replace(/^-\s+/, '') || '';
        if (desc) currentJob.description = desc.substring(0, 150);
      }
    }

    if (currentJob) {
      jobs.push(currentJob);
    }

    // Add timestamps for known jobs
    const jobsWithTimestamps = jobs.map(job => {
      const now = new Date();
      let nextRun = new Date();

      if (job.schedule.includes('8:00 AM') || job.schedule.includes('8 AM')) {
        nextRun.setHours(8, 0, 0, 0);
        if (nextRun < now) nextRun.setDate(nextRun.getDate() + 1);
      } else if (job.schedule.includes('8:30 AM') || job.schedule.includes('8:30')) {
        nextRun.setHours(8, 30, 0, 0);
        if (nextRun < now) nextRun.setDate(nextRun.getDate() + 1);
      } else if (job.schedule.includes('8:45 AM')) {
        nextRun.setHours(8, 45, 0, 0);
        if (nextRun < now) nextRun.setDate(nextRun.getDate() + 1);
      }

      return {
        ...job,
        lastRun: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        nextRun: nextRun.toISOString()
      };
    });

    return jobsWithTimestamps;
  } catch (error) {
    console.error('Error parsing HEARTBEAT.md:', error);
    return [];
  }
}

export async function GET() {
  try {
    const jobs = parseHeartbeat();

    return NextResponse.json({
      cronJobs: jobs,
      total: jobs.length,
      active: jobs.filter(j => j.status === 'active').length,
      paused: jobs.filter(j => j.status === 'paused').length,
      timestamp: new Date().toISOString(),
      source: 'live-from-HEARTBEAT.md'
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
