import { NextResponse } from 'next/server';
import { tasksStore } from '../store.js';

// PATCH /api/tasks/[id] - Update a task
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const taskIndex = tasksStore.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update task
    tasksStore[taskIndex] = {
      ...tasksStore[taskIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(tasksStore[taskIndex], { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const taskIndex = tasksStore.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    const deletedTask = tasksStore.splice(taskIndex, 1)[0];

    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}

// GET /api/tasks/[id] - Get a specific task
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const task = tasksStore.find((t) => t.id === id);
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}
