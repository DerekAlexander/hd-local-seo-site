import { NextResponse } from 'next/server';
import { aggregateAllTasks, getTaskStats, getHighPriorityTasks } from '../../../../lib/taskAggregator.js';

/**
 * GET /api/tasks/stats
 * Returns task statistics and summaries
 */
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const view = url.searchParams.get('view'); // 'overview', 'reminders', 'ideas', 'actions', 'high-priority'

    const tasks = await aggregateAllTasks();
    const stats = await getTaskStats();

    let response = {
      stats: stats,
      tasks: tasks,
      timestamp: new Date().toISOString(),
    };

    // Filter by view
    if (view === 'reminders') {
      response.tasks = tasks.filter(t => t.type === 'reminder');
      response.view = 'reminders';
    } else if (view === 'ideas') {
      response.tasks = tasks.filter(t => t.type === 'app-idea');
      response.view = 'app-ideas';
    } else if (view === 'actions') {
      response.tasks = tasks.filter(t => t.type === 'action-item');
      response.view = 'action-items';
    } else if (view === 'high-priority') {
      response.tasks = await getHighPriorityTasks();
      response.view = 'high-priority';
    } else {
      response.view = 'overview';
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching task stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task statistics', details: error.message },
      { status: 500 }
    );
  }
}
