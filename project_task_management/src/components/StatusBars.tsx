import React from 'react';
import { Task, Status } from '../types';
import { BarChart2 } from 'lucide-react';

interface StatusBarsProps {
  tasks: Task[];
  onStatusClick: (status: Status) => void;
}

export function StatusBars({ tasks, onStatusClick }: StatusBarsProps) {
  const getStatusCount = (status: Status) => {
    return tasks.filter(task => task.status === status).length;
  };

  const getStatusPercentage = (status: Status) => {
    return tasks.length > 0 ? (getStatusCount(status) / tasks.length) * 100 : 0;
  };

  const statusColors = {
    PLANNED: 'bg-gray-500',
    IN_PROGRESS: 'bg-blue-500',
    DELAYED: 'bg-red-500',
    COMPLETED: 'bg-green-500'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-300 to-purple-400 py-3 px-4">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-gray-800" />
          <h3 className="text-base font-semibold text-gray-800">Status do Projeto</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">{status}</span>
              <span className="text-gray-600 dark:text-gray-400">{getStatusCount(status as Status)} tarefas</span>
            </div>
            <div
              className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer overflow-hidden"
              onClick={() => onStatusClick(status as Status)}
            >
              <div
                className={`h-full rounded-full ${color} transition-all duration-500 ease-in-out`}
                style={{ width: `${getStatusPercentage(status as Status)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}