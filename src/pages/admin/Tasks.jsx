import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../../store/slices/taskSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { employees } = useSelector((state) => state.employees);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', assignedTo: '', status: 'Pending', priority: 'Medium', deadline: ''
  });
  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData(task);
    } else {
      setEditingTask(null);
      setFormData({ title: '', description: '', assignedTo: '', status: 'Pending', priority: 'Medium', deadline: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      dispatch(updateTask(formData));
      toast.success('Task updated successfully');
    } else {
      dispatch(addTask(formData));
      toast.success('Task created successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
      toast.success('Task deleted successfully');
    }
  };

  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.id === id);
    return emp ? emp.name : 'Unassigned';
  };

  const statusColors = {
    'Pending': 'warning',
    'In Progress': 'primary',
    'Completed': 'success'
  };

  const priorityColors = {
    'Low': 'default',
    'Medium': 'primary',
    'High': 'danger'
  };

  const columns = [
    { header: 'Task', render: (row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white max-w-xs truncate" title={row.title}>{row.title}</div>
          <div className="text-gray-500 dark:text-gray-400 text-xs max-w-xs truncate" title={row.description}>{row.description}</div>
        </div>
      )
    },
    { header: 'Assigned To', render: (row) => getEmployeeName(row.assignedTo) },
    { header: 'Deadline', render: (row) => new Date(row.deadline).toLocaleDateString() },
    { header: 'Priority', render: (row) => <Badge type={priorityColors[row.priority]}>{row.priority}</Badge> },
    { header: 'Status', render: (row) => <Badge type={statusColors[row.status]}>{row.status}</Badge> },
    { header: 'Actions', render: (row) => (
        <div className="flex space-x-2">
          <button onClick={() => openModal(row)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1">
            <FiEdit2 />
          </button>
          <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1">
            <FiTrash2 />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Management</h1>
        <Button onClick={() => openModal()} className="flex items-center gap-2">
          <FiPlus /> Create Task
        </Button>
      </div>

      <Card>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === status 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 border border-transparent dark:border-slate-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <Table columns={columns} data={filteredTasks} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTask ? 'Edit Task' : 'Create Task'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign To</label>
            <select required value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Employee</option>
              {employees.filter(e => e.role === 'employee').map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
            <input required type="date" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:light] dark:[color-scheme:dark]" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingTask ? 'Update' : 'Create'} Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tasks;
