import React from 'react';
import { LayoutList, Kanban, Baseline as TimelineIcon } from 'lucide-react';
import { ViewMode } from '../types';

interface ViewModeSelectorProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export function ViewModeSelector({ currentMode, onModeChange }: ViewModeSelectorProps) {
  const modes = [
    { id: 'table', icon: LayoutList, label: 'Lista' },
    { id: 'kanban', icon: Kanban, label: 'Kanban' },
    { id: 'timeline', icon: TimelineIcon, label: 'Timeline' }
  ] as const;

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
      {modes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onModeChange(id)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${currentMode === id
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }
          `}
          title={label}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}