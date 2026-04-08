import { NextResponse } from 'next/server';
import { tasksStore, activitiesStore } from './store.js';
import {
  aggregateAllTasks,
  getTaskStats,
  getHighPriorityTasks,
} from '../../../lib/taskAggregator.js';

// GET /api/tasks - Fetch all tasks (live from markdown files + store)
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter'); // 'all', 'high-priority', 'reminders', 'app-ideas', 'actions'

    let tasks = [];
    let markdownTasks = [];
    
    // Try to load markdown-sourced tasks
    try {
      markdownTasks = await aggregateAllTasks();
      console.log(`✅ Loaded ${markdownTasks.length} tasks from markdown files`);
    } catch (aggError) {
      console.error('⚠️ Error aggregating markdown tasks:', aggError.message);
      // Continue with empty array, will use store tasks
    }
    
    // Combine with in-memory tasks (from UI additions)
    tasks = [...markdownTasks, ...tasksStore];
    
    // Remove duplicates by ID
    const uniqueIds = new Set();
    tasks = tasks.filter(t => {
      if (uniqueIds.has(t.id)) return false;
      uniqueIds.add(t.id);
      return true;
    });

    // Apply filters
    let filtered = tasks;
    if (filter === 'high-priority') {
      filtered = tasks.filter(t => t.priority === 'high' && t.status !== 'done');
    } else if (filter === 'reminders') {
      filtered = tasks.filter(t => t.type === 'reminder');
    } else if (filter === 'app-ideas') {
      filtered = tasks.filter(t => t.type === 'app-idea');
    } else if (filter === 'actions') {
      filtered = tasks.filter(t => t.type === 'action-item');
    }

    const stats = {
      total: tasks.length,
      reminders: tasks.filter(t => t.type === 'reminder').length,
      appIdeas: tasks.filter(t => t.type === 'app-idea').length,
      actionItems: tasks.filter(t => t.type === 'action-item').length,
      highPriority: tasks.filter(t => t.priority === 'high' && t.status !== 'done').length,
    };

    console.log(`📊 API returning: ${filtered.length} tasks (markdown: ${markdownTasks.length}, store: ${tasksStore.length})`);

    return NextResponse.json(
      {
        tasks: filtered,
        activities: activitiesStore,
        total: filtered.length,
        stats: stats,
        sources: markdownTasks.length > 0 ? ['markdown-files', 'in-memory-store'] : ['in-memory-store'],
        debug: {
          markdownTasksCount: markdownTasks.length,
          storeTasksCount: tasksStore.length,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error fetching tasks:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch tasks', 
        details: error.message,
        tasks: tasksStore,
        activities: activitiesStore,
      },
      { status: 200 } // Return 200 with store data as fallback
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, assignee, priority, tags, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const newTask = {
      id: `TASK-${String(tasksStore.length + 1).padStart(3, '0')}`,
      title,
      description: description || '',
      status: 'backlog',
      assignee: assignee || 'D',
      priority: priority || 'medium',
      progress: 0,
      tags: tags || [],
      createdAt: new Date().toISOString(),
    };

    tasksStore.push(newTask);

    // Add activity
    activitiesStore.unshift({
      type: 'task_created',
      message: `New task ${newTask.id} created: ${title}`,
      timestamp: new Date().toISOString(),
      agent: 'System',
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
