import React from 'react';
import { Pencil, Book, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Task } from '../types';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onViewDetails: (task: Task) => void;
}

export function TaskTable({ tasks, onEdit, onDelete, onViewDetails }: TaskTableProps) {
  const [expandedCards, setExpandedCards] = React.useState<Record<string, boolean>>({});

  const toggleCard = (taskId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <>
      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{task.data_what}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{task.project}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : ''}
                  ${task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : ''}
                  ${task.status === 'DELAYED' ? 'bg-red-100 text-red-800' : ''}
                  ${task.status === 'PLANNED' ? 'bg-gray-100 text-gray-800' : ''}
                `}>
                  {task.status}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{task.data_who}</span>
                <span>{task.data_when}</span>
              </div>

              {expandedCards[task.id] && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
                  <p><span className="font-medium">Por que:</span> {task.data_why}</p>
                  <p><span className="font-medium">Onde:</span> {task.data_where}</p>
                  <p><span className="font-medium">Como:</span> {task.data_how}</p>
                  <p><span className="font-medium">Quanto:</span> {task.data_howMuch}</p>
                  <p><span className="font-medium">Início:</span> {task.data_startDate}</p>
                </div>
              )}

              <div className="mt-3 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onViewDetails(task)}
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  >
                    <Book className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <button
                  onClick={() => toggleCard(task.id)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {expandedCards[task.id] ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden lg:block overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ações
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Projeto / O que
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Por que / Onde
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Quando / Início
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Quem / Como
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status / Quanto
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(task)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onViewDetails(task)}
                      className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <Book className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {task.project}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {task.data_what}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {task.data_why}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {task.data_where}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {task.data_when}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {task.data_startDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {task.data_who}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {task.data_how}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="mb-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full
                      ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : ''}
                      ${task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : ''}
                      ${task.status === 'DELAYED' ? 'bg-red-100 text-red-800' : ''}
                      ${task.status === 'PLANNED' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {task.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {task.data_howMuch}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}