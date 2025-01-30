import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { TaskFilters } from '../types';

interface QuickFiltersProps {
  onFilterApply: (filters: TaskFilters) => void;
}

export function QuickFilters({ onFilterApply }: QuickFiltersProps) {
  const quickFilters = [
    {
      id: 'pending',
      label: 'Pendentes',
      icon: Clock,
      filter: { status: 'PLANNED' }
    },
    {
      id: 'delayed',
      label: 'Atrasadas',
      icon: AlertCircle,
      filter: { status: 'DELAYED' }
    },
    {
      id: 'completed',
      label: 'Concluídas',
      icon: CheckCircle,
      filter: { status: 'COMPLETED' }
    }
  ];

  return (
    <div className="flex items-center gap-2">
      {quickFilters.map(({ id, label, icon: Icon, filter }) => (
        <button
          key={id}
          onClick={() => onFilterApply(filter)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}