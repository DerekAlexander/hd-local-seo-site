import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function GET(req) {
  try {
    // Fetch real OpenClaw sessions
    let sessions = [];
    let error = null;

    try {
      // Get list of all active sessions
      const sessionsOutput = execSync('sessions_list --limit 50', {
        encoding: 'utf8',
        timeout: 5000,
        stdio: ['pipe', 'pipe', 'pipe']
      }).catch(() => '[]');

      if (sessionsOutput) {
        try {
          sessions = JSON.parse(sessionsOutput);
        } catch {
          sessions = [];
        }
      }
    } catch (e) {
      error = `Failed to fetch sessions: ${e.message}`;
      sessions = [];
    }

    // Enrich sessions with task data from MEMORY.md
    let taskData = {};
    try {
      const memoryPath = path.join(process.cwd(), '../../../MEMORY.md');
      if (fs.existsSync(memoryPath)) {
        const content = fs.readFileSync(memoryPath, 'utf8');
        // Parse action items for context
        const actionMatch = content.match(/## ⚡ Action Items([\s\S]*?)(?=##|$)/);
        if (actionMatch) {
          taskData.actionItems = actionMatch[1]
            .split('\n')
            .filter(line => line.trim().startsWith('- ['))
            .slice(0, 5);
        }
      }
    } catch (e) {
      // Ignore if MEMORY.md doesn't exist
    }

    // Format agent data for dashboard
    const agents = sessions.map(session => {
      const isActive = session.activeMinutes && session.activeMinutes < 30;
      return {
        id: session.sessionKey || session.id,
        name: session.label || 'Unknown Session',
        type: session.kind || 'agent',
        status: isActive ? 'active' : 'idle',
        lastActive: session.activeMinutes ? `${session.activeMinutes}m ago` : 'unknown',
        taskCount: session.messageCount || 0,
        progress: Math.min(100, (session.activeMinutes || 0) * 2),
        currentTask: 'Processing...',
        emoji: session.kind === 'subagent' ? '🤖' : '💬'
      };
    });

    // Add main session if available
    agents.unshift({
      id: 'main',
      name: 'Main Session (Claude)',
      type: 'main',
      status: 'online',
      lastActive: 'now',
      taskCount: sessions.length,
      progress: 100,
      currentTask: 'Coordinating tasks',
      emoji: '👤'
    });

    return NextResponse.json({
      success: true,
      agents,
      total: agents.length,
      timestamp: new Date().toISOString(),
      taskContext: taskData,
      error: error || null
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      agents: [],
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
