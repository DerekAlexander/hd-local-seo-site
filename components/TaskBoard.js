'use client';

import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

export default function TaskBoard({ tasks, onTaskMove, onNewTask, onTaskSelect }) {
  const [columns] = useState([
    { id: 'backlog', title: 'Backlog', color: 'bg-gray-700' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-700' },
    { id: 'in-review', title: 'In Review', color: 'bg-amber-700' },
    { id: 'done', title: 'Done', color: 'bg-green-700' },
  ]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    console.log('🎯 handleDragEnd called:', { source, destination, draggableId });
    
    if (!destination) {
      console.log('❌ No destination, dropping outside zone');
      return;
    }
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      console.log('⚠️ Dropped in same position, ignoring');
      return;
    }

    // Extract task ID from draggableId (format: "task-TASK-001")
    const taskId = draggableId.replace('task-', '');
    const newStatus = destination.droppableId;
    console.log('✅ Moving task:', { taskId, newStatus });
    onTaskMove(taskId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4 h-full">
        {columns.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id);
          return (
            <div key={column.id} className="bg-gray-800 rounded-lg p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                  <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                  <span className="text-xs text-gray-400">({columnTasks.length})</span>
                </div>
              </div>

              <Droppable droppableId={column.id} type="TASK">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 space-y-2 rounded-lg p-2 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-gray-700/50' : ''
                    }`}
                  >
                    {columnTasks.map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        onClick={() => onTaskSelect(task)}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {column.id === 'backlog' && (
                <button
                  onClick={onNewTask}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  New Task
                </button>
              )}
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
