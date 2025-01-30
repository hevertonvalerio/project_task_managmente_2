import React from 'react';
import { Task } from '../types';

interface TimelineProps {
  tasks: Task[];
}

export function Timeline({ tasks }: TimelineProps) {
  const sortedTasks = [...tasks].sort((a, b) => 
    new Date(a.data_when).getTime() - new Date(b.data_when).getTime()
  );

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      
      <div className="space-y-6 pl-12">
        {sortedTasks.map(task => (
          <div
            key={task.id}
            className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="absolute left-0 top-1/2 -translate-x-[2.75rem] -translate-y-1/2">
              <div className="w-4 h-4 rounded-full bg-purple-400 border-4 border-white dark:border-gray-900" />
            </div>
            
            <div className="mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(task.data_when).toLocaleDateString()}
              </span>
            </div>
            
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {task.data_what}
            </h4>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                {task.project}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : ''}
                ${task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : ''}
                ${task.status === 'DELAYED' ? 'bg-red-100 text-red-800' : ''}
                ${task.status === 'PLANNED' ? 'bg-gray-100 text-gray-800' : ''}
              `}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}