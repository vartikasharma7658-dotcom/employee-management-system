import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut, FiUser } from 'react-icons/fi';
import { logout } from '../../store/slices/authSlice';
import { toggleTheme } from '../../store/slices/themeSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { darkMode } = useSelector(state => state.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 transition-colors duration-200">
      <div className="flex-1"></div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:bg-slate-800 transition-colors"
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
        
        <div className="flex items-center gap-3 border-l border-gray-200 dark:border-slate-700 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
          <div className="h-9 w-9 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FiUser className="text-lg" />
          </div>
          <button
            onClick={handleLogout}
            className="p-2 ml-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            title="Logout"
          >
            <FiLogOut className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
