// ... (imports permanecem os mesmos)

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

  // ... (resto do código permanece o mesmo, apenas atualizando os nomes dos campos nos inputs)