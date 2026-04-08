'use client';

import { useState } from 'react';
import { X, Edit2, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ASSIGNEE_COLORS = {
  D: { bg: 'bg-blue-600', text: 'text-blue-100', label: 'Derek' },
  R: { bg: 'bg-purple-600', text: 'text-purple-100', label: 'RawrBot' },
  H: { bg: 'bg-indigo-600', text: 'text-indigo-100', label: 'Hank' },
};

export default function TaskDetailsModal({ task, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    assignee: task.assignee,
    progress: task.progress || 0,
  });

  const assignee = ASSIGNEE_COLORS[task.assignee] || ASSIGNEE_COLORS.D;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(task.id, editData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-xs font-mono text-gray-400">{task.id}</div>
            {!isEditing ? (
              <h2 className="text-2xl font-bold text-white">{task.title}</h2>
            ) : (
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleInputChange}
                className="text-2xl font-bold bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-gray-400 text-xs mb-1">Status</p>
            <p className="text-white font-semibold capitalize">{task.status.replace('-', ' ')}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Assigned to</p>
            <div className={`${assignee.bg} ${assignee.text} text-sm font-bold px-2 py-1 rounded w-fit`}>
              {task.assignee}
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Priority</p>
            <p className="text-white font-semibold capitalize">{task.priority}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Created</p>
            <p className="text-white text-sm">
              {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-400 text-xs mb-2">Description</label>
          {!isEditing ? (
            <p className="text-gray-300 text-sm leading-relaxed bg-gray-700/50 rounded p-3">
              {editData.description || 'No description'}
            </p>
          ) : (
            <textarea
              name="description"
              value={editData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              rows="3"
              placeholder="Add details about this task..."
            />
          )}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-gray-400 text-xs">Progress</label>
            {isEditing ? (
              <input
                type="number"
                name="progress"
                value={editData.progress}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
              />
            ) : (
              <span className="text-blue-400 font-semibold text-sm">{task.progress || 0}%</span>
            )}
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
              style={{ width: `${task.progress || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-400 text-xs mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Edit Mode Actions */}
        {isEditing && (
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
