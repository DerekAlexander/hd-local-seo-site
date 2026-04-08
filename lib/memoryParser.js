/**
 * memoryParser.js
 * Reads memory files for client information
 */

import fs from 'fs';
import path from 'path';

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || path.join(process.cwd(), '../../');

/**
 * Get list of memory files
 */
function getMemoryFiles() {
  const memoryDir = path.join(WORKSPACE_ROOT, 'memory');
  if (!fs.existsSync(memoryDir)) {
    return [];
  }

  return fs.readdirSync(memoryDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(memoryDir, file));
}

/**
 * Parse memory files for client information
 */
export async function parseMemoryFiles() {
  try {
    const memoryFiles = getMemoryFiles();
    const clientData = {};

    memoryFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf-8');
      const fileName = path.basename(file, '.md');

      // Extract client mentions and relevant info
      const clientMatches = content.matchAll(/(?:client|customer|business):\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi);
      for (const match of clientMatches) {
        const clientName = match[1].trim();
        if (!clientData[clientName]) {
          clientData[clientName] = {
            name: clientName,
            mentions: [],
            sourceFile: fileName,
          };
        }
        clientData[clientName].mentions.push({
          context: match[0],
          line: content.substring(0, match.index).split('\n').length,
        });
      }
    });

    return clientData;
  } catch (error) {
    console.error('Error parsing memory files:', error);
    return {};
  }
}

/**
 * Get recent memory entries
 */
export async function getRecentMemoryEntries(limit = 10) {
  try {
    const memoryFiles = getMemoryFiles()
      .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime)
      .slice(0, limit);

    const entries = memoryFiles.map((file) => ({
      fileName: path.basename(file, '.md'),
      content: fs.readFileSync(file, 'utf-8').slice(0, 500),
      modifiedAt: fs.statSync(file).mtime.toISOString(),
    }));

    return entries;
  } catch (error) {
    console.error('Error getting recent memory entries:', error);
    return [];
  }
}