import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { FiCheckSquare, FiClock, FiAlertCircle, FiAward } from 'react-icons/fi';

const EmployeeDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const { tasks } = useSelector(state => state.tasks);

  const myTasks = tasks.filter(t => t.assignedTo === user.id);
  const totalTasks = myTasks.length;
  const completedTasks = myTasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = myTasks.filter(t => t.status === 'In Progress').length;
  const pendingTasks = myTasks.filter(t => t.status === 'Pending').length;

  const getProgress = () => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const statusColors = {
    'Pending': 'warning',
    'In Progress': 'primary',
    'Completed': 'success'
  };

  const upcomingDeadlines = [...myTasks]
    .filter(t => t.status !== 'Completed')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  const stats = [
    { title: 'My Tasks', value: totalTasks, icon: <FiCheckSquare />, color: 'bg-blue-500' },
    { title: 'Completed', value: completedTasks, icon: <FiAward />, color: 'bg-emerald-500' },
    { title: 'In Progress', value: inProgressTasks, icon: <FiClock />, color: 'bg-indigo-500' },
    { title: 'Pending', value: pendingTasks, icon: <FiAlertCircle />, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's an overview of your tasks and progress.</p>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-transparent">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 w-full">
            <h3 className="text-lg font-semibold text-blue-100 mb-2">Overall Task Progress</h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold">{getProgress()}%</span>
              <span className="text-blue-200 text-sm mb-1">completed</span>
            </div>
            <div className="w-full bg-blue-900/50 rounded-full h-2.5 mt-4">
              <div className="bg-white h-2.5 rounded-full transition-all duration-1000" style={{ width: `${getProgress()}%` }}></div>
            </div>
          </div>
          <div className="hidden md:block w-32 h-32 opacity-25">
            <FiAward className="w-full h-full" />
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-0">
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-lg flex-shrink-0 ${stat.color} text-white`}>
                {React.cloneElement(stat.icon, { className: 'text-2xl' })}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card title="Recent Tasks">
          <div className="space-y-4">
            {myTasks.length > 0 ? myTasks.slice(0, 4).map(task => (
              <div key={task.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors border border-gray-100 dark:border-slate-700">
                <div className="min-w-0 flex-1 mr-4">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">{task.title}</h4>
                </div>
                <Badge type={statusColors[task.status]}>{task.status}</Badge>
              </div>
            )) : <p className="text-gray-500 dark:text-gray-400 py-4 text-center">No tasks assigned yet.</p>}
          </div>
        </Card>

        {/* Upcoming Deadlines */}
        <Card title="Upcoming Deadlines">
          <div className="space-y-4">
            {upcomingDeadlines.length > 0 ? upcomingDeadlines.map(task => {
              const daysLeft = Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24));
              const isUrgent = daysLeft <= 2;
              
              return (
                <div key={task.id} className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${isUrgent ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'}`}>
                  <div className={`mt-1 ${isUrgent ? 'text-red-500' : 'text-blue-500'}`}>
                    <FiClock className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Due {new Date(task.deadline).toLocaleDateString()}</p>
                    <span className={`text-xs font-semibold mt-2 inline-block ${isUrgent ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                      {daysLeft < 0 ? 'Overdue' : daysLeft === 0 ? 'Due Today' : `${daysLeft} days left`}
                    </span>
                  </div>
                </div>
              );
            }) : <p className="text-gray-500 dark:text-gray-400 py-4 text-center">No upcoming deadlines.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
