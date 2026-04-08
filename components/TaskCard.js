'use client';

import { Draggable } from 'react-beautiful-dnd';
import { GripVertical, Flag } from 'lucide-react';

const ASSIGNEE_COLORS = {
  D: { bg: 'bg-blue-600', text: 'text-blue-100', label: 'Derek' },
  R: { bg: 'bg-purple-600', text: 'text-purple-100', label: 'RawrBot' },
  H: { bg: 'bg-indigo-600', text: 'text-indigo-100', label: 'Hank' },
};

const PRIORITY_COLORS = {
  high: 'bg-red-500/20 text-red-400 border-red-500/50',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
  low: 'bg-green-500/20 text-green-400 border-green-500/50',
};

export default function TaskCard({ task, index, onClick }) {
  const assignee = ASSIGNEE_COLORS[task.assignee] || ASSIGNEE_COLORS.D;
  const draggableId = `task-${task.id}`;
  
  console.log('🎴 TaskCard rendered:', { draggableId, index, taskId: task.id });

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={onClick}
          className={`bg-gray-700 rounded-lg p-3 cursor-move transition-all border border-gray-600 hover:border-blue-500/50 hover:shadow-lg ${
            snapshot.isDragging ? 'shadow-2xl bg-gray-600 opacity-100' : ''
          }`}
        >
          {/* Header with ID and Drag Handle */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing hover:text-gray-300 transition-colors p-1">
                <GripVertical className="w-5 h-5 text-gray-500 flex-shrink-0" />
              </div>
              <span className="text-xs font-mono text-gray-400">{task.id}</span>
            </div>
            <div className={`${assignee.bg} ${assignee.text} text-xs font-bold px-2 py-1 rounded`}>
              {task.assignee}
            </div>
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2">{task.title}</h4>

          {/* Priority Badge and Tags */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs border ${PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.low}`}>
              <Flag className="w-3 h-3" />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </div>
            {task.tags && task.tags.length > 0 && (
              <div className="text-xs text-gray-400">
                {task.tags.slice(0, 1).map((tag) => (
                  <span key={tag} className="inline-block bg-gray-600 px-2 py-1 rounded mr-1">
                    {tag}
                  </span>
                ))}
                {task.tags.length > 1 && <span className="text-gray-500">+{task.tags.length - 1}</span>}
              </div>
            )}
          </div>

          {/* Progress if applicable */}
          {task.progress > 0 && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs text-blue-400">{task.progress}%</span>
              </div>
              <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
