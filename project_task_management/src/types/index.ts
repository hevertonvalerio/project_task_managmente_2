export type Status = 'PLANNED' | 'IN_PROGRESS' | 'DELAYED' | 'COMPLETED';
export type ViewMode = 'table' | 'kanban' | 'timeline';

export interface Task {
  id: string;
  project: string;
  data_what: string;
  data_why: string;
  data_where: string;
  data_when: string;
  data_who: string;
  data_how: string;
  data_howMuch: string;
  status: Status;
  data_startDate: string | null;
}

export interface QuickTask {
  id: string;
  data_what: string;
  data_when: string;
  data_how: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  manager: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  leader: string;
  members: string[];
}

export interface TaskFilters {
  project?: string;
  activity?: string;
  status?: Status;
  data_who?: string;
  startDate?: string;
  endDate?: string;
}