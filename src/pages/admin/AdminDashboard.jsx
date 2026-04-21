import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/common/Card';
import { FiUsers, FiCheckSquare, FiAlertCircle, FiClock } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
  const { employees } = useSelector(state => state.employees);
  const { tasks } = useSelector(state => state.tasks);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;

  const taskStatusData = [
    { name: 'Completed', value: completedTasks, color: '#10b981' },
    { name: 'In Progress', value: inProgressTasks, color: '#3b82f6' },
    { name: 'Pending', value: pendingTasks, color: '#f59e0b' },
  ];

  const departmentData = employees.reduce((acc, emp) => {
    const dept = emp.department || 'Unassigned';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.keys(departmentData).map(key => ({
    name: key,
    count: departmentData[key]
  }));

  const stats = [
    { title: 'Total Employees', value: totalEmployees, icon: <FiUsers />, color: 'bg-blue-500' },
    { title: 'Total Tasks', value: totalTasks, icon: <FiCheckSquare />, color: 'bg-emerald-500' },
    { title: 'Pending Tasks', value: pendingTasks, icon: <FiClock />, color: 'bg-amber-500' },
    { title: 'In Progress Tasks', value: inProgressTasks, icon: <FiAlertCircle />, color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-0">
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-lg ${stat.color} text-white`}>
                {React.cloneElement(stat.icon, { className: 'text-2xl' })}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Task Status Overview">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center flex-wrap gap-4 mt-4">
            {taskStatusData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Employees by Department">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'rgba(107, 114, 128, 0.1)'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Recent Tasks">
        <div className="space-y-4">
          {tasks.slice(0, 5).map(task => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Due: {new Date(task.deadline).toLocaleDateString()}</p>
              </div>
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                task.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
