import { NextResponse } from 'next/server';

// In-memory activity storage
let activitiesStore = [
  {
    id: 'ACT-001',
    type: 'task_moved',
    message: 'TASK-006 moved to In Review by RawrBot',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    agent: 'RawrBot',
    taskId: 'TASK-006',
  },
  {
    id: 'ACT-002',
    type: 'task_completed',
    message: 'TASK-004 marked as complete',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    agent: 'RawrBot',
    taskId: 'TASK-004',
  },
  {
    id: 'ACT-003',
    type: 'progress',
    message: 'TASK-001 progress updated to 65%',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    agent: 'Derek',
    taskId: 'TASK-001',
  },
  {
    id: 'ACT-004',
    type: 'task_assigned',
    message: 'TASK-008 assigned to Hank',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    agent: 'System',
    taskId: 'TASK-008',
  },
  {
    id: 'ACT-005',
    type: 'task_created',
    message: 'New task TASK-008 created: Add unit tests',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    agent: 'Derek',
    taskId: 'TASK-008',
  },
];

// GET /api/activity - Fetch activity log
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const paginatedActivities = activitiesStore.slice(offset, offset + limit);

    return NextResponse.json(
      {
        activities: paginatedActivities,
        total: activitiesStore.length,
        limit,
        offset,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST /api/activity - Create a new activity entry
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, message, agent, taskId } = body;

    const newActivity = {
      id: `ACT-${String(activitiesStore.length + 1).padStart(3, '0')}`,
      type: type || 'update',
      message,
      timestamp: new Date().toISOString(),
      agent: agent || 'System',
      taskId: taskId || null,
    };

    activitiesStore.unshift(newActivity);

    // Keep only the last 100 activities
    if (activitiesStore.length > 100) {
      activitiesStore = activitiesStore.slice(0, 100);
    }

    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}
