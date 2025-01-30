import React from 'react';
import { Task, Status } from '../types';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: Status) => void;
}

export function KanbanBoard({ tasks, onTaskMove }: KanbanBoardProps) {
  const columns: Status[] = ['PLANNED', 'IN_PROGRESS', 'DELAYED', 'COMPLETED'];
  
  const getTasksByStatus = (status: Status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map(status => (
        <div
          key={status}
          className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
        >
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            {status}
          </h3>
          
          <div className="space-y-3">
            {getTasksByStatus(status).map(task => (
              <div
                key={task.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {task.data_what}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {task.project}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    {task.data_who}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {task.data_when}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}