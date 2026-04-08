'use client';

import { useState, useEffect } from 'react';
import TaskBoard from '../components/TaskBoard';
import ActivityFeed from '../components/ActivityFeed';
import NewTaskForm from '../components/NewTaskForm';
import TaskDetailsModal from '../components/TaskDetailsModal';
import ClientOnly from '../components/ClientOnly';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

// Mock data
const MOCK_TASKS = [
  {
    id: 'TASK-001',
    title: 'Fix homepage layout issues',
    description: 'The hero section has alignment problems on mobile devices.',
    status: 'in-progress',
    assignee: 'D',
    priority: 'high',
    progress: 65,
    tags: ['frontend', 'urgent'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'TASK-002',
    title: 'Implement user authentication',
    description: 'Set up JWT-based authentication system.',
    status: 'in-progress',
    assignee: 'R',
    priority: 'high',
    progress: 45,
    tags: ['backend', 'security'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'TASK-003',
    title: 'Design dashboard UI',
    description: 'Create mockups for the new admin dashboard.',
    status: 'done',
    assignee: 'D',
    priority: 'medium',
    progress: 100,
    tags: ['design'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'TASK-004',
    title: 'Setup database migrations',
    description: 'Create initial database schema and migrations.',
    status: 'done',
    assignee: 'R',
    priority: 'high',
    progress: 100,
    tags: ['backend', 'database'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'TASK-005',
    title: 'Write API documentation',
    description: 'Document all REST endpoints with examples.',
    status: 'backlog',
    assignee: 'H',
    priority: 'medium',
    progress: 0,
    tags: ['documentation'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'TASK-006',
    title: 'Optimize database queries',
    description: 'Profile and improve slow queries.',
    status: 'in-review',
    assignee: 'R',
    priority: 'medium',
    progress: 80,
    tags: ['performance', 'backend'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'TASK-007',
    title: 'Create user onboarding flow',
    description: 'Design and implement the new user signup experience.',
    status: 'backlog',
    assignee: 'D',
    priority: 'medium',
    progress: 0,
    tags: ['ux', 'frontend'],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'TASK-008',
    title: 'Add unit tests',
    description: 'Write comprehensive tests for core modules.',
    status: 'in-progress',
    assignee: 'H',
    priority: 'low',
    progress: 30,
    tags: ['testing'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const MOCK_ACTIVITIES = [
  {
    type: 'task_moved',
    message: 'TASK-006 moved to In Review by RawrBot',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    agent: 'RawrBot',
  },
  {
    type: 'task_completed',
    message: 'TASK-004 marked as complete',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    agent: 'RawrBot',
  },
  {
    type: 'progress',
    message: 'TASK-001 progress updated to 65%',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    agent: 'Derek',
  },
  {
    type: 'task_assigned',
    message: 'TASK-008 assigned to Hank',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    agent: 'System',
  },
  {
    type: 'task_created',
    message: 'New task TASK-008 created: Add unit tests',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    agent: 'Derek',
  },
  {
    type: 'urgent',
    message: 'TASK-002 marked as high priority',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    agent: 'System',
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load tasks from API on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks);
          setActivities(data.activities || MOCK_ACTIVITIES);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
        // Keep mock data as fallback
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleTaskMove = async (taskId, newStatus) => {
    console.log('📍 handleTaskMove called:', { taskId, newStatus });
    
    // Update local state
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
      console.log('📦 State updated, tasks:', updated.filter(t => t.id === taskId));
      return updated;
    });

    // Add activity
    const task = tasks.find((t) => t.id === taskId);
    addActivity({
      type: 'task_moved',
      message: `${taskId} moved to ${newStatus.replace('-', ' ')}`,
      timestamp: new Date().toISOString(),
      agent: 'User',
    });

    // Sync to API
    try {
      console.log('🌐 Sending PATCH to API:', `/api/tasks/${taskId}`, { status: newStatus });
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      console.log('✅ API response:', data);
    } catch (error) {
      console.error('❌ Failed to update task:', error);
    }
  };

  const handleNewTask = async (formData) => {
    const newTask = {
      id: `TASK-${String(tasks.length + 1).padStart(3, '0')}`,
      status: 'backlog',
      progress: 0,
      createdAt: new Date().toISOString(),
      ...formData,
    };

    setTasks((prev) => [...prev, newTask]);
    setShowNewTaskForm(false);

    addActivity({
      type: 'task_created',
      message: `New task ${newTask.id} created: ${newTask.title}`,
      timestamp: new Date().toISOString(),
      agent: 'User',
    });

    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleTaskUpdate = async (taskId, updateData) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updateData } : t))
    );

    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => ({ ...prev, ...updateData }));
    }

    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const addActivity = (activity) => {
    setActivities((prev) => [activity, ...prev.slice(0, 9)]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-8 h-8 text-blue-400" />
          Task Board
        </h1>
        <p className="text-gray-400">
          {tasks.filter((t) => t.status === 'done').length} of {tasks.length} tasks completed
        </p>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Activity Feed Sidebar */}
        <div className="w-72 flex-shrink-0">
          <ActivityFeed activities={activities} />
        </div>

        {/* Task Board */}
        <div className="flex-1 min-w-0 overflow-x-auto bg-gray-900 rounded-lg">
          <div className="p-4 h-full" style={{ minWidth: 'fit-content' }}>
            <ClientOnly>
              <TaskBoard
                tasks={tasks}
                onTaskMove={handleTaskMove}
                onNewTask={() => setShowNewTaskForm(true)}
                onTaskSelect={setSelectedTask}
              />
            </ClientOnly>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <p className="text-gray-400 text-xs">Backlog</p>
          <p className="text-2xl font-bold text-gray-400">
            {tasks.filter((t) => t.status === 'backlog').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <p className="text-gray-400 text-xs">In Progress</p>
          <p className="text-2xl font-bold text-blue-400">
            {tasks.filter((t) => t.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <p className="text-gray-400 text-xs">In Review</p>
          <p className="text-2xl font-bold text-amber-400">
            {tasks.filter((t) => t.status === 'in-review').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <p className="text-gray-400 text-xs">Completed</p>
          <p className="text-2xl font-bold text-green-400">
            {tasks.filter((t) => t.status === 'done').length}
          </p>
        </div>
      </div>

      {/* Modals */}
      {showNewTaskForm && (
        <NewTaskForm
          onClose={() => setShowNewTaskForm(false)}
          onSubmit={handleNewTask}
        />
      )}

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
}
