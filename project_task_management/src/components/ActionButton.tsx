import React from 'react';
import { Plus, FolderPlus, UserPlus, Users } from 'lucide-react';

interface ActionButtonProps {
  onNewTask: () => void;
  onNewProject: () => void;
  onNewUser: () => void;
  onNewTeam: () => void;
}

export function ActionButton({ onNewTask, onNewProject, onNewUser, onNewTeam }: ActionButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const actions = [
    { icon: Plus, label: 'Nova Tarefa', onClick: onNewTask },
    { icon: FolderPlus, label: 'Novo Projeto', onClick: onNewProject },
    { icon: UserPlus, label: 'Novo Usuário', onClick: onNewUser },
    { icon: Users, label: 'Novo Time', onClick: onNewTeam },
  ];

  return (
    <div className="fixed bottom-6 right-6">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {actions.map(({ icon: Icon, label, onClick }) => (
              <button
                key={label}
                onClick={() => {
                  onClick();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Icon className="w-5 h-5 mr-2" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}