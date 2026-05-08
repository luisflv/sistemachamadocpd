import React from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Ticket, FileBarChart, Settings, LogOut, Menu } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token'); // Simple auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Atendimentos', path: '/tickets', icon: Ticket },
    { name: 'Relatórios', path: '/reports', icon: FileBarChart },
    { name: 'Configurações', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-petrol-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-petrol-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-petrol-800 flex flex-col transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-petrol-800">
          <h1 className="text-xl font-bold text-petrol-600 dark:text-sea-400">DTI Flow</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-petrol-50 dark:bg-petrol-800 text-petrol-700 dark:text-white font-medium' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-petrol-800/50 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-petrol-600 dark:text-sea-400' : ''}`} />
                {item.name}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-petrol-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header - Mobile Only */}
        <header className="md:hidden h-14 bg-white dark:bg-petrol-900 border-b border-gray-200 dark:border-petrol-800 flex items-center justify-between px-4">
          <h1 className="text-lg font-semibold text-petrol-900 dark:text-white">DTI Flow</h1>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-300">
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
