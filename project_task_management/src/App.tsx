import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Filters } from './components/Filters';
import { TaskTable } from './components/TaskTable';
import { StatusBars } from './components/StatusBars';
import { QuickTasks } from './components/QuickTasks';
import { ActionButton } from './components/ActionButton';
import { TaskModal } from './components/modals/TaskModal';
import { ProjectModal } from './components/modals/ProjectModal';
import { UserModal } from './components/modals/UserModal';
import { TeamModal } from './components/modals/TeamModal';
import { ViewModeSelector } from './components/ViewModeSelector';
import { KanbanBoard } from './components/KanbanBoard';
import { Timeline } from './components/Timeline';
import { QuickFilters } from './components/QuickFilters';
import { Task, QuickTask, Status, User, ViewMode, TaskFilters } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isMobile, setIsMobile] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeFilters, setActiveFilters] = useState<TaskFilters>({});

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Reset to table view on mobile
  useEffect(() => {
    if (isMobile) {
      setViewMode('table');
    }
  }, [isMobile]);

  const [users] = useState<User[]>([
    { id: '1', name: 'João Silva', email: 'joao@example.com', phone: '(11) 99999-9999', department: 'Desenvolvimento' },
    { id: '2', name: 'Maria Santos', email: 'maria@example.com', phone: '(11) 88888-8888', department: 'Design' },
    { id: '3', name: 'Pedro Costa', email: 'pedro@example.com', phone: '(11) 77777-7777', department: 'Produto' },
    { id: '4', name: 'Ana Oliveira', email: 'ana@example.com', phone: '(11) 66666-6666', department: 'QA' }
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      project: 'Projeto Alpha',
      data_what: 'Desenvolver interface do usuário',
      data_why: 'Melhorar experiência do cliente',
      data_where: 'Frontend',
      data_when: '2024-03-15',
      data_who: 'João Silva',
      data_how: 'React + Tailwind',
      data_howMuch: 'R$ 5.000',
      status: 'IN_PROGRESS',
      data_startDate: '2024-02-01'
    },
    {
      id: '2',
      project: 'Projeto Beta',
      data_what: 'Implementar autenticação',
      data_why: 'Segurança do sistema',
      data_where: 'Backend',
      data_when: '2024-03-20',
      data_who: 'Pedro Costa',
      data_how: 'JWT + OAuth',
      data_howMuch: 'R$ 4.500',
      status: 'PLANNED',
      data_startDate: '2024-03-10'
    },
    {
      id: '3',
      project: 'Projeto Gamma',
      data_what: 'Design do novo dashboard',
      data_why: 'Modernização da interface',
      data_where: 'Design',
      data_when: '2024-03-10',
      data_who: 'Maria Santos',
      data_how: 'Figma',
      data_howMuch: 'R$ 3.800',
      status: 'COMPLETED',
      data_startDate: '2024-02-25'
    },
    {
      id: '4',
      project: 'Projeto Delta',
      data_what: 'Testes de integração',
      data_why: 'Garantir qualidade',
      data_where: 'QA',
      data_when: '2024-03-25',
      data_who: 'Ana Oliveira',
      data_how: 'Jest + Cypress',
      data_howMuch: 'R$ 4.200',
      status: 'DELAYED',
      data_startDate: '2024-03-01'
    },
    {
      id: '5',
      project: 'Projeto Alpha',
      data_what: 'Otimização de performance',
      data_why: 'Melhorar tempo de carregamento',
      data_where: 'Frontend',
      data_when: '2024-04-05',
      data_who: 'João Silva',
      data_how: 'Webpack + Code Splitting',
      data_howMuch: 'R$ 3.500',
      status: 'PLANNED',
      data_startDate: null
    },
    {
      id: '6',
      project: 'Projeto Beta',
      data_what: 'Implementar cache',
      data_why: 'Otimizar requisições',
      data_where: 'Backend',
      data_when: '2024-03-30',
      data_who: 'Pedro Costa',
      data_how: 'Redis',
      data_howMuch: 'R$ 4.000',
      status: 'IN_PROGRESS',
      data_startDate: '2024-03-15'
    },
    {
      id: '7',
      project: 'Projeto Gamma',
      data_what: 'Design sistema de ícones',
      data_why: 'Padronização visual',
      data_where: 'Design',
      data_when: '2024-03-18',
      data_who: 'Maria Santos',
      data_how: 'Illustrator',
      data_howMuch: 'R$ 2.800',
      status: 'IN_PROGRESS',
      data_startDate: '2024-03-10'
    },
    {
      id: '8',
      project: 'Projeto Delta',
      data_what: 'Testes de segurança',
      data_why: 'Identificar vulnerabilidades',
      data_where: 'QA',
      data_when: '2024-04-10',
      data_who: 'Ana Oliveira',
      data_how: 'Penetration Testing',
      data_howMuch: 'R$ 5.500',
      status: 'PLANNED',
      data_startDate: null
    },
    {
      id: '9',
      project: 'Projeto Alpha',
      data_what: 'Migração de banco de dados',
      data_why: 'Atualização de tecnologia',
      data_where: 'Backend',
      data_when: '2024-03-28',
      data_who: 'Pedro Costa',
      data_how: 'PostgreSQL',
      data_howMuch: 'R$ 6.000',
      status: 'DELAYED',
      data_startDate: '2024-03-10'
    },
    {
      id: '10',
      project: 'Projeto Beta',
      data_what: 'Implementar PWA',
      data_why: 'Suporte offline',
      data_where: 'Frontend',
      data_when: '2024-04-15',
      data_who: 'João Silva',
      data_how: 'Service Workers',
      data_howMuch: 'R$ 4.800',
      status: 'PLANNED',
      data_startDate: null
    },
    {
      id: '11',
      project: 'Projeto Gamma',
      data_what: 'Design sistema de emails',
      data_why: 'Padronização de comunicação',
      data_where: 'Design',
      data_when: '2024-03-22',
      data_who: 'Maria Santos',
      data_how: 'HTML Email',
      data_howMuch: 'R$ 3.200',
      status: 'COMPLETED',
      data_startDate: '2024-03-15'
    },
    {
      id: '12',
      project: 'Projeto Delta',
      data_what: 'Testes de performance',
      data_why: 'Validar escalabilidade',
      data_where: 'QA',
      data_when: '2024-04-05',
      data_who: 'Ana Oliveira',
      data_how: 'JMeter',
      data_howMuch: 'R$ 4.500',
      status: 'IN_PROGRESS',
      data_startDate: '2024-03-20'
    },
    {
      id: '13',
      project: 'Projeto Alpha',
      data_what: 'Implementar analytics',
      data_why: 'Monitoramento de uso',
      data_where: 'Frontend',
      data_when: '2024-04-20',
      data_who: 'João Silva',
      data_how: 'Google Analytics',
      data_howMuch: 'R$ 3.000',
      status: 'PLANNED',
      data_startDate: null
    },
    {
      id: '14',
      project: 'Projeto Beta',
      data_what: 'API Documentation',
      data_why: 'Facilitar integração',
      data_where: 'Backend',
      data_when: '2024-03-25',
      data_who: 'Pedro Costa',
      data_how: 'Swagger',
      data_howMuch: 'R$ 3.500',
      status: 'COMPLETED',
      data_startDate: '2024-03-15'
    },
    {
      id: '15',
      project: 'Projeto Gamma',
      data_what: 'Design guia de estilo',
      data_why: 'Documentação de design',
      data_where: 'Design',
      data_when: '2024-04-01',
      data_who: 'Maria Santos',
      data_how: 'Storybook',
      data_howMuch: 'R$ 4.000',
      status: 'IN_PROGRESS',
      data_startDate: '2024-03-20'
    },
    {
      id: '16',
      project: 'Projeto Delta',
      data_what: 'Testes de acessibilidade',
      data_why: 'Garantir inclusão',
      data_where: 'QA',
      data_when: '2024-04-12',
      data_who: 'Ana Oliveira',
      data_how: 'WCAG Guidelines',
      data_howMuch: 'R$ 3.800',
      status: 'PLANNED',
      data_startDate: null
    },
    {
      id: '17',
      project: 'Projeto Alpha',
      data_what: 'Implementar SEO',
      data_why: 'Melhorar visibilidade',
      data_where: 'Frontend',
      data_when: '2024-04-08',
      data_who: 'João Silva',
      data_how: 'Next.js + Meta tags',
      data_howMuch: 'R$ 4.200',
      status: 'DELAYED',
      data_startDate: '2024-03-25'
    },
    {
      id: '18',
      project: 'Projeto Beta',
      data_what: 'Microserviços',
      data_why: 'Escalabilidade',
      data_where: 'Backend',
      data_when: '2024-04-25',
      data_who: 'Pedro Costa',
      data_how: 'Docker + Kubernetes',
      data_howMuch: 'R$ 7.500',
      status: 'PLANNED',
      data_startDate: null
    },
    {
      id: '19',
      project: 'Projeto Gamma',
      data_what: 'Design sistema de notificações',
      data_why: 'Melhorar engajamento',
      data_where: 'Design',
      data_when: '2024-03-28',
      data_who: 'Maria Santos',
      data_how: 'Figma + Protopie',
      data_howMuch: 'R$ 3.600',
      status: 'COMPLETED',
      data_startDate: '2024-03-15'
    },
    {
      id: '20',
      project: 'Projeto Delta',
      data_what: 'Testes de usabilidade',
      data_why: 'Validar UX',
      data_where: 'QA',
      data_when: '2024-04-15',
      data_who: 'Ana Oliveira',
      data_how: 'UserTesting + Hotjar',
      data_howMuch: 'R$ 4.800',
      status: 'IN_PROGRESS',
      data_startDate: '2024-04-01'
    }
  ]);

  const [quickTasks, setQuickTasks] = useState<QuickTask[]>([
    {
      id: '1',
      data_what: 'Reunião de planejamento',
      data_when: '2024-03-01T10:00',
      data_how: 'Google Meet'
    },
    {
      id: '2',
      data_what: 'Review de código',
      data_when: '2024-03-02T14:00',
      data_how: 'GitHub'
    },
    {
      id: '3',
      data_what: 'Daily Scrum',
      data_when: '2024-03-01T09:00',
      data_how: 'Teams'
    }
  ]);

  // Filtered tasks based on active filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Project filter
      if (activeFilters.project && task.project !== activeFilters.project) {
        return false;
      }

      // Activity (what) filter
      if (activeFilters.activity && !task.data_what.toLowerCase().includes(activeFilters.activity.toLowerCase())) {
        return false;
      }

      // Status filter
      if (activeFilters.status && task.status !== activeFilters.status) {
        return false;
      }

      // Who filter
      if (activeFilters.data_who && task.data_who !== activeFilters.data_who) {
        return false;
      }

      // Date range filter
      if (activeFilters.startDate && activeFilters.endDate) {
        const taskDate = new Date(task.data_when);
        const startDate = new Date(activeFilters.startDate);
        const endDate = new Date(activeFilters.endDate);
        
        if (taskDate < startDate || taskDate > endDate) {
          return false;
        }
      } else if (activeFilters.startDate) {
        const taskDate = new Date(task.data_when);
        const startDate = new Date(activeFilters.startDate);
        
        if (taskDate < startDate) {
          return false;
        }
      } else if (activeFilters.endDate) {
        const taskDate = new Date(task.data_when);
        const endDate = new Date(activeFilters.endDate);
        
        if (taskDate > endDate) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, activeFilters]);

  // Handlers
  const handleViewModeChange = (mode: ViewMode) => {
    if (!isMobile) {
      setViewMode(mode);
    }
  };

  const handleFilterChange = (filters: TaskFilters) => {
    setActiveFilters(filters);
  };

  const handleStatusClick = (status: Status) => {
    setActiveFilters(prev => ({
      ...prev,
      status
    }));
  };

  const handleTaskMove = (taskId: string, newStatus: Status) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setTaskModalOpen(true);
  };

  const handleNewProject = () => {
    setProjectModalOpen(true);
  };

  const handleNewUser = () => {
    setUserModalOpen(true);
  };

  const handleNewTeam = () => {
    setTeamModalOpen(true);
  };

  const handleAddQuickTask = (taskData: Omit<QuickTask, 'id'>) => {
    const newTask: QuickTask = {
      ...taskData,
      id: Date.now().toString()
    };
    setQuickTasks([...quickTasks, newTask]);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="container mx-auto py-6 px-4">
            <div className="flex justify-between items-center mb-4">
              <div className={isMobile ? 'hidden' : 'block'}>
                <ViewModeSelector
                  currentMode={viewMode}
                  onModeChange={handleViewModeChange}
                />
              </div>
              <QuickFilters onFilterApply={handleFilterChange} />
            </div>
            
            <Filters
              onFilterChange={handleFilterChange}
              tasks={tasks}
              users={users}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {(isMobile || viewMode === 'table') && (
                  <TaskTable
                    tasks={filteredTasks}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onViewDetails={() => {}}
                  />
                )}
                {!isMobile && viewMode === 'kanban' && (
                  <KanbanBoard
                    tasks={filteredTasks}
                    onTaskMove={handleTaskMove}
                  />
                )}
                {!isMobile && viewMode === 'timeline' && (
                  <Timeline tasks={filteredTasks} />
                )}
              </div>
              
              <div className="space-y-6">
                <StatusBars
                  tasks={filteredTasks}
                  onStatusClick={handleStatusClick}
                />
                <QuickTasks
                  tasks={quickTasks}
                  onAddTask={handleAddQuickTask}
                />
              </div>
            </div>
          </div>
        </main>

        <ActionButton
          onNewTask={handleNewTask}
          onNewProject={handleNewProject}
          onNewUser={handleNewUser}
          onNewTeam={handleNewTeam}
        />

        <TaskModal
          isOpen={taskModalOpen}
          onClose={() => setTaskModalOpen(false)}
          onSave={(taskData) => {
            if (selectedTask) {
              setTasks(tasks.map(task => 
                task.id === selectedTask.id ? { ...taskData, id: task.id } : task
              ));
            } else {
              setTasks([...tasks, { ...taskData, id: Date.now().toString() }]);
            }
            setTaskModalOpen(false);
          }}
          task={selectedTask || undefined}
        />

        <ProjectModal
          isOpen={projectModalOpen}
          onClose={() => setProjectModalOpen(false)}
          onSave={(project) => {
            console.log('New project:', project);
            setProjectModalOpen(false);
          }}
          users={users}
        />

        <UserModal
          isOpen={userModalOpen}
          onClose={() => setUserModalOpen(false)}
          onSave={(user) => {
            console.log('New user:', user);
            setUserModalOpen(false);
          }}
        />

        <TeamModal
          isOpen={teamModalOpen}
          onClose={() => setTeamModalOpen(false)}
          onSave={(team) => {
            console.log('New team:', team);
            setTeamModalOpen(false);
          }}
          users={users}
        />
      </div>
    </div>
  );
}

export default App;