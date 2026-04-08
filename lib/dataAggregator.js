/**
 * dataAggregator.js
 * Reads workspace files and extracts dashboard data
 */

import fs from 'fs';
import path from 'path';
import { parseMemoryFiles } from './memoryParser';
import { parseCronConfigs } from './cronParser';

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || path.join(process.cwd(), '../../');

/**
 * Extract active clients from HEARTBEAT.md
 */
export async function extractClientsFromHeartbeat() {
  try {
    const heartbeatPath = path.join(WORKSPACE_ROOT, 'HEARTBEAT.md');
    if (!fs.existsSync(heartbeatPath)) {
      return [];
    }

    const content = fs.readFileSync(heartbeatPath, 'utf-8');
    const clients = [];

    // Parse sections like "## Active Clients" or similar
    const clientSections = content.match(/#{1,3}\s+(?:Active\s+)?Clients?([\s\S]*?)(?=##|$)/i);
    if (clientSections && clientSections[1]) {
      const lines = clientSections[1].split('\n');
      lines.forEach((line) => {
        const match = line.match(/[-*]\s+(.+?)(?:\s+-\s+(.+))?$/);
        if (match) {
          clients.push({
            name: match[1].trim(),
            status: match[2]?.trim() || 'active',
            lastUpdated: new Date().toISOString(),
          });
        }
      });
    }

    return clients;
  } catch (error) {
    console.error('Error reading HEARTBEAT.md:', error);
    return [];
  }
}

/**
 * Extract task list from HEARTBEAT.md
 */
export async function extractTasksFromHeartbeat() {
  try {
    const heartbeatPath = path.join(WORKSPACE_ROOT, 'HEARTBEAT.md');
    if (!fs.existsSync(heartbeatPath)) {
      return [];
    }

    const content = fs.readFileSync(heartbeatPath, 'utf-8');
    const tasks = [];

    // Parse sections like "## Tasks" or "## To-Do"
    const taskSections = content.match(/#{1,3}\s+(?:Tasks?|To-?Do)([\s\S]*?)(?=##|$)/i);
    if (taskSections && taskSections[1]) {
      const lines = taskSections[1].split('\n');
      lines.forEach((line) => {
        const match = line.match(/[-*]\s+(\[.\])\s+(.+?)(?:\s+-\s+(.+))?$/);
        if (match) {
          tasks.push({
            id: `task-${tasks.length}`,
            title: match[2].trim(),
            completed: match[1].includes('x'),
            dueDate: match[3]?.trim() || null,
            createdAt: new Date().toISOString(),
          });
        }
      });
    }

    return tasks;
  } catch (error) {
    console.error('Error extracting tasks from HEARTBEAT.md:', error);
    return [];
  }
}

/**
 * Extract reminders and due dates from HEARTBEAT.md
 */
export async function extractRemindersFromHeartbeat() {
  try {
    const heartbeatPath = path.join(WORKSPACE_ROOT, 'HEARTBEAT.md');
    if (!fs.existsSync(heartbeatPath)) {
      return [];
    }

    const content = fs.readFileSync(heartbeatPath, 'utf-8');
    const reminders = [];

    // Parse sections like "## Reminders" or "## Due Dates"
    const reminderSections = content.match(/#{1,3}\s+(?:Reminders?|Due\s+Dates?)([\s\S]*?)(?=##|$)/i);
    if (reminderSections && reminderSections[1]) {
      const lines = reminderSections[1].split('\n');
      lines.forEach((line) => {
        const match = line.match(/[-*]\s+(.+?)\s*(?:-|@)?\s*(\d{4}-\d{2}-\d{2})?/);
        if (match) {
          reminders.push({
            id: `reminder-${reminders.length}`,
            title: match[1].trim(),
            dueDate: match[2] || null,
            priority: 'normal',
            createdAt: new Date().toISOString(),
          });
        }
      });
    }

    return reminders;
  } catch (error) {
    console.error('Error extracting reminders from HEARTBEAT.md:', error);
    return [];
  }
}

/**
 * Get all dashboard data
 */
export async function getAllDashboardData() {
  try {
    const [clients, tasks, reminders, cronJobs, memoryData] = await Promise.all([
      extractClientsFromHeartbeat(),
      extractTasksFromHeartbeat(),
      extractRemindersFromHeartbeat(),
      parseCronConfigs(),
      parseMemoryFiles(),
    ]);

    return {
      clients,
      tasks,
      reminders,
      cronJobs,
      memory: memoryData,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    return {
      clients: [],
      tasks: [],
      reminders: [],
      cronJobs: [],
      memory: {},
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Get client details from memory files
 */
export async function getClientDetails(clientName) {
  try {
    const memoryData = await parseMemoryFiles();
    return memoryData[clientName] || null;
  } catch (error) {
    console.error('Error getting client details:', error);
    return null;
  }
}
