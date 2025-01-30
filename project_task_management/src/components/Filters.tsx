import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Search as SearchIcon } from 'lucide-react';
import { Status, TaskFilters, Task, User } from '../types';

interface FiltersProps {
  onFilterChange: (filters: TaskFilters) => void;
  tasks?: Task[];
  users?: User[];
}

export function Filters({ onFilterChange, tasks = [], users = [] }: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<TaskFilters>({
    project: '',
    activity: '',
    status: undefined,
    data_who: '',
    startDate: '',
    endDate: ''
  });

  // Extrair lista única de projetos das tasks
  const projectOptions = useMemo(() => {
    const uniqueProjects = new Set(tasks.map(task => task.project));
    return Array.from(uniqueProjects).sort();
  }, [tasks]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const cleanedFilters: TaskFilters = {};
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          cleanedFilters[key as keyof TaskFilters] = value;
        }
      });

      onFilterChange(cleanedFilters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key: keyof TaskFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDateSearch = () => {
    if (filters.startDate || filters.endDate) {
      onFilterChange(filters);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full flex items-center justify-between p-4 text-gray-700 dark:text-gray-200"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filtros</span>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block p-4`}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Projeto
            </label>
            <select
              value={filters.project}
              onChange={(e) => handleFilterChange('project', e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos os projetos</option>
              {projectOptions.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Atividade
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.activity || ''}
                onChange={(e) => handleFilterChange('activity', e.target.value)}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white pl-8"
                placeholder="Buscar atividade..."
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Responsável
            </label>
            <select
              value={filters.data_who || ''}
              onChange={(e) => handleFilterChange('data_who', e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value as Status)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="PLANNED">PLANNED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DELAYED">DELAYED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Início
            </label>
            <div className="relative">
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Fim
            </label>
            <div className="relative flex">
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full rounded-l-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleDateSearch}
                className="px-3 bg-purple-400 hover:bg-purple-500 text-white rounded-r-md border border-purple-400 hover:border-purple-500 transition-colors"
                title="Buscar por datas"
              >
                <SearchIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}