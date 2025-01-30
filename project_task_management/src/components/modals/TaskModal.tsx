import React from 'react';
import { Modal } from './Modal';
import { Task, Status } from '../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'>) => void;
  task?: Task;
}

export function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [formData, setFormData] = React.useState<Omit<Task, 'id'>>({
    project: task?.project || '',
    data_what: task?.data_what || '',
    data_why: task?.data_why || '',
    data_where: task?.data_where || '',
    data_when: task?.data_when || '',
    data_who: task?.data_who || '',
    data_how: task?.data_how || '',
    data_howMuch: task?.data_howMuch || '',
    status: task?.status || 'PLANNED',
    data_startDate: task?.data_startDate || null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const statusOptions: Status[] = ['PLANNED', 'IN_PROGRESS', 'DELAYED', 'COMPLETED'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Editar Tarefa' : 'Nova Tarefa'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Projeto</label>
          <input
            type="text"
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">O que</label>
          <input
            type="text"
            value={formData.data_what}
            onChange={(e) => setFormData({ ...formData, data_what: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Por que</label>
          <input
            type="text"
            value={formData.data_why}
            onChange={(e) => setFormData({ ...formData, data_why: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Onde</label>
          <input
            type="text"
            value={formData.data_where}
            onChange={(e) => setFormData({ ...formData, data_where: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quando</label>
          <input
            type="date"
            value={formData.data_when}
            onChange={(e) => setFormData({ ...formData, data_when: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quem</label>
          <input
            type="text"
            value={formData.data_who}
            onChange={(e) => setFormData({ ...formData, data_who: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Como</label>
          <input
            type="text"
            value={formData.data_how}
            onChange={(e) => setFormData({ ...formData, data_how: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quanto</label>
          <input
            type="text"
            value={formData.data_howMuch}
            onChange={(e) => setFormData({ ...formData, data_howMuch: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {formData.data_startDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Início</label>
            <input
              type="date"
              value={formData.data_startDate}
              onChange={(e) => setFormData({ ...formData, data_startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}