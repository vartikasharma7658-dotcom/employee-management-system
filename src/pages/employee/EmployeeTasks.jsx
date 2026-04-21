import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskStatus } from '../../store/slices/taskSlice';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { FiClock, FiCheckCircle, FiPlayCircle } from 'react-icons/fi';

const EmployeeTasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  
  const [filter, setFilter] = useState('All');

  const myTasks = tasks.filter(task => task.assignedTo === user.id);
  const filteredTasks = myTasks.filter(task => filter === 'All' || task.status === filter);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateTaskStatus({ id, status: newStatus }));
    toast.success(`Task status updated to ${newStatus}`);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'border-red-500';
      case 'Medium': return 'border-blue-500';
      case 'Low': return 'border-gray-400';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
        <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
          {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === status 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? filteredTasks.map(task => (
          <Card key={task.id} className={`border-l-4 ${getPriorityColor(task.priority)} flex flex-col h-full`}>
            <div className="flex justify-between items-start mb-4">
              <Badge type={
                task.status === 'Completed' ? 'success' : 
                task.status === 'In Progress' ? 'primary' : 'warning'
              }>
                {task.status}
              </Badge>
              <Badge type={
                task.priority === 'High' ? 'danger' : 
                task.priority === 'Medium' ? 'primary' : 'default'
              }>
                {task.priority} Priority
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{task.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 mb-4">{task.description}</p>
            
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <FiClock /> Due: {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex gap-2">
                {task.status !== 'Pending' && (
                  <Button 
                    variant="secondary" 
                    className="flex-1 text-xs px-2 py-1.5"
                    onClick={() => handleStatusChange(task.id, 'Pending')}
                  >
                    Set Pending
                  </Button>
                )}
                {task.status !== 'In Progress' && (
                  <Button 
                    variant="primary" 
                    className="flex-1 text-xs px-2 py-1.5"
                    onClick={() => handleStatusChange(task.id, 'In Progress')}
                  >
                    <FiPlayCircle className="mr-1" /> Start
                  </Button>
                )}
                {task.status !== 'Completed' && (
                  <Button 
                    variant="success" 
                    className="flex-1 text-xs px-2 py-1.5"
                    onClick={() => handleStatusChange(task.id, 'Completed')}
                  >
                    <FiCheckCircle className="mr-1" /> Complete
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )) : (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
            No tasks found matching the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTasks;
