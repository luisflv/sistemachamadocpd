import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Users, Ticket, Clock, CheckCircle, Activity, Server } from 'lucide-react';

// Mock Data
const stats = [
  { name: 'Total de Atendimentos', value: '142', icon: Ticket, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Pendentes', value: '12', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { name: 'Concluídos', value: '118', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  { name: 'Em Andamento', value: '8', icon: Activity, color: 'text-petrol-500', bg: 'bg-petrol-50 dark:bg-petrol-900/20' },
  { name: 'Externos/In Loco', value: '24', icon: Server, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { name: 'Técnicos Ativos', value: '5', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
];

const dataEvolucao = [
  { name: 'Jan', atendimentos: 65 },
  { name: 'Fev', atendimentos: 59 },
  { name: 'Mar', atendimentos: 80 },
  { name: 'Abr', atendimentos: 81 },
  { name: 'Mai', atendimentos: 56 },
  { name: 'Jun', atendimentos: 95 },
  { name: 'Jul', atendimentos: 110 },
];

const dataTipo = [
  { name: 'Remoto', value: 400 },
  { name: 'In Loco', value: 300 },
  { name: 'Bancada', value: 300 },
  { name: 'Externo', value: 200 },
];

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#6366f1'];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral das métricas de atendimento da DTI.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-card p-6 rounded-xl border border-gray-100 dark:border-petrol-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Line Chart */}
        <div className="bg-white dark:bg-card p-6 rounded-xl border border-gray-100 dark:border-petrol-800 shadow-sm lg:col-span-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Evolução de Atendimentos</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataEvolucao} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#111827' }}
                />
                <Line type="monotone" dataKey="atendimentos" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-card p-6 rounded-xl border border-gray-100 dark:border-petrol-800 shadow-sm lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Atendimentos por Tipo</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataTipo}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataTipo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
