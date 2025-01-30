import React, { useState } from 'react';
import { Plus, Clock, Wrench, Pencil, Check, Trash2, Send, Flag } from 'lucide-react';
import { QuickTask } from '../types';

interface QuickTasksProps {
  tasks: QuickTask[];
  onAddTask: (task: Omit<QuickTask, 'id'>) => void;
  onEdit?: (task: QuickTask) => void;
  onComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

export function QuickTasks({ tasks, onAddTask, onEdit, onComplete, onDelete }: QuickTasksProps) {
  const [newTask, setNewTask] = useState({ data_what: '', data_when: '', data_how: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTask);
    setNewTask({ data_what: '', data_when: '', data_how: '' });
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-300 to-purple-400 py-3 px-4">
        <h3 className="text-base font-semibold text-gray-800">Quick Tasks</h3>
      </div>
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTask.data_what}
                onChange={(e) => setNewTask({ ...newTask, data_what: e.target.value })}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-400 focus:ring-purple-400 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="datetime-local"
                value={newTask.data_when}
                onChange={(e) => setNewTask({ ...newTask, data_when: e.target.value })}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-600 pl-10 pr-4 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-400 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Wrench className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="How will it be done?"
              value={newTask.data_how}
              onChange={(e) => setNewTask({ ...newTask, data_how: e.target.value })}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 pl-10 pr-4 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-400 focus:ring-purple-400 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-400 hover:bg-purple-500 text-white rounded-lg py-1.5 px-4 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Quick Task
          </button>
        </form>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600 hover:border-purple-200 dark:hover:border-purple-400/30 transition-colors duration-200"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {task.data_what}
                    </h4>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{formatDateTime(task.data_when)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit?.(task)}
                      className="p-1 text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                      title="Edit task"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      title="Send task"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <Wrench className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{task.data_how}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onComplete?.(task.id)}
                      className="p-1 text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                      title="Mark as completed"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(task.id)}
                      className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No quick tasks added
            </div>
          )}
        </div>
      </div>
    </div>
  );
}