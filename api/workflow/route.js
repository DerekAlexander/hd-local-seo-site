import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req) {
  try {
    const workspaceRoot = path.join(process.cwd(), '../../../');
    
    // Collect workflow status from various files
    const workflow = {
      timestamp: new Date().toISOString(),
      sections: {}
    };

    // 1. Check MEMORY.md for action items
    try {
      const memoryPath = path.join(workspaceRoot, 'MEMORY.md');
      if (fs.existsSync(memoryPath)) {
        const content = fs.readFileSync(memoryPath, 'utf8');
        
        // Extract action items
        const actionMatch = content.match(/## ⚡ Action Items([\s\S]*?)(?=##|$)/);
        if (actionMatch) {
          const items = actionMatch[1]
            .split('\n')
            .filter(line => line.includes('CRITICAL') || line.includes('HIGH'))
            .slice(0, 5);
          workflow.sections.criticalActions = items;
        }
      }
    } catch (e) {
      workflow.sections.criticalActions = [];
    }

    // 2. Check PROJECT_STATUS.md for blockers
    try {
      const statusPath = path.join(workspaceRoot, 'PROJECT_STATUS.md');
      if (fs.existsSync(statusPath)) {
        const content = fs.readFileSync(statusPath, 'utf8');
        
        const blockers = content
          .split('\n')
          .filter(line => line.includes('❌') || line.includes('🚫'))
          .slice(0, 3);
        workflow.sections.blockers = blockers;
      }
    } catch (e) {
      workflow.sections.blockers = [];
    }

    // 3. Daily notes for today
    try {
      const today = new Date().toISOString().split('T')[0];
      const dailyPath = path.join(workspaceRoot, `memory/${today}.md`);
      if (fs.existsSync(dailyPath)) {
        const content = fs.readFileSync(dailyPath, 'utf8');
        
        // Get summary line
        const summary = content.split('\n')[1] || '';
        workflow.sections.dailySummary = summary.replace(/^#+\s*/, '');
      }
    } catch (e) {
      workflow.sections.dailySummary = 'No daily notes yet';
    }

    // 4. App ideas in progress
    try {
      const ideasPath = path.join(workspaceRoot, 'app-ideas-backlog.md');
      if (fs.existsSync(ideasPath)) {
        const content = fs.readFileSync(ideasPath, 'utf8');
        
        const ideas = content
          .match(/### \d+\. \*\*(.*?)\*\*/g)
          ?.slice(0, 5) || [];
        workflow.sections.appIdeasInProgress = ideas.map(i => i.replace(/.*\*\*(.*?)\*\*.*/, '$1'));
      }
    } catch (e) {
      workflow.sections.appIdeasInProgress = [];
    }

    // 5. Recent git activity (if in a repo)
    try {
      const gitPath = path.join(workspaceRoot, '.git');
      if (fs.existsSync(gitPath)) {
        const { execSync } = await import('child_process');
        const gitLog = execSync('git log -5 --oneline', {
          cwd: workspaceRoot,
          encoding: 'utf8'
        }).split('\n').filter(l => l.trim());
        workflow.sections.recentCommits = gitLog;
      }
    } catch (e) {
      workflow.sections.recentCommits = [];
    }

    return NextResponse.json({
      success: true,
      workflow,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      workflow: {}
    }, { status: 500 });
  }
}
