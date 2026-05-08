import React, { useState } from 'react';
import { Plus, Search, Filter, Download, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Data
const mockTickets = [
  { id: 'TIC-001', requester: 'João Silva', department: 'Gabinete', status: 'PENDING', type: 'Remoto', priority: 'HIGH', date: '08/05/2026' },
  { id: 'TIC-002', requester: 'Maria Souza', department: 'RH', status: 'IN_PROGRESS', type: 'In Loco', priority: 'NORMAL', date: '08/05/2026' },
  { id: 'TIC-003', requester: 'Pedro Alves', department: 'Finanças', status: 'COMPLETED', type: 'Bancada', priority: 'LOW', date: '07/05/2026' },
];

const statusColors: any = {
  PENDING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  CANCELED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const statusLabels: any = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em Andamento',
  COMPLETED: 'Concluído',
  CANCELED: 'Cancelado'
};

const TicketsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Atendimentos</h2>
          <p className="text-muted-foreground">Gerencie e acompanhe todos os chamados.</p>
        </div>
        <button 
          onClick={() => navigate('/tickets/new')}
          className="flex items-center px-4 py-2 bg-petrol-600 text-white rounded-lg hover:bg-petrol-700 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Atendimento
        </button>
      </div>

      <div className="bg-white dark:bg-card border border-gray-100 dark:border-petrol-800 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-petrol-800 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar chamados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-petrol-700 rounded-lg focus:ring-2 focus:ring-petrol-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-3 py-2 border border-gray-200 dark:border-petrol-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-petrol-800 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </button>
            <button className="flex items-center px-3 py-2 border border-gray-200 dark:border-petrol-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-petrol-800 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-petrol-900/50 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Solicitante</th>
                <th scope="col" className="px-6 py-3">Setor</th>
                <th scope="col" className="px-6 py-3">Tipo</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Data</th>
                <th scope="col" className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockTickets.map((ticket) => (
                <tr key={ticket.id} className="bg-white dark:bg-card border-b dark:border-petrol-800 hover:bg-gray-50 dark:hover:bg-petrol-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4">{ticket.requester}</td>
                  <td className="px-6 py-4">{ticket.department}</td>
                  <td className="px-6 py-4">{ticket.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                      {statusLabels[ticket.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">{ticket.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1 text-gray-500 hover:text-petrol-600 dark:hover:text-petrol-400">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        <div className="p-4 border-t border-gray-100 dark:border-petrol-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Mostrando 1 a 3 de 3 resultados</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 dark:border-petrol-700 rounded hover:bg-gray-50 dark:hover:bg-petrol-800 disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-petrol-700 rounded hover:bg-gray-50 dark:hover:bg-petrol-800 disabled:opacity-50" disabled>Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsList;
