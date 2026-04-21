import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FiHome, FiUsers, FiCheckSquare, FiSettings, 
  FiPieChart, FiLayout
} from 'react-icons/fi';

const Sidebar = () => {
  const { user } = useSelector(state => state.auth);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
    { name: 'Employees', path: '/admin/employees', icon: <FiUsers /> },
    { name: 'Tasks', path: '/admin/tasks', icon: <FiCheckSquare /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <FiPieChart /> },
  ];

  const employeeLinks = [
    { name: 'Dashboard', path: '/employee', icon: <FiHome /> },
    { name: 'My Tasks', path: '/employee/tasks', icon: <FiCheckSquare /> },
  ];

  const links = user?.role === 'admin' ? adminLinks : employeeLinks;

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 h-screen fixed top-0 left-0 flex flex-col transition-colors duration-200">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
          <FiLayout className="text-2xl" />
          <span className="text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">EMS Portal</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path.endsWith('admin') || link.path.endsWith('employee')}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="text-lg mr-3">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
