import React from 'react';
import { Moon, Sun, User, Briefcase, Menu } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

export function Header({ darkMode, toggleDarkMode, toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Toggle menu"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex items-center gap-3">
            <Briefcase className="w-7 h-7 text-purple-400" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestor de Projetos</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-200" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}