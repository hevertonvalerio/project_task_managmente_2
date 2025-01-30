import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Settings, 
  Calendar,
  BarChart2,
  Clock
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: FolderKanban, label: 'Projetos', href: '/projects' },
    { icon: Calendar, label: 'Tarefas', href: '/tasks' },
    { icon: Clock, label: 'Quick Tasks', href: '/quick-tasks' },
    { icon: Users, label: 'Equipes', href: '/teams' },
    { icon: BarChart2, label: 'Relatórios', href: '/reports' },
    { icon: Settings, label: 'Configurações', href: '/settings' },
  ];

  return (
    <aside className={`
      fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 
      border-r border-gray-200 dark:border-gray-700 transition-transform duration-200 z-20
      ${isOpen ? 'translate-x-0' : '-translate-x-64'}
    `}>
      <nav className="h-full overflow-y-auto">
        <ul className="p-3 space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <item.icon className="w-5 h-5 text-purple-400" />
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}