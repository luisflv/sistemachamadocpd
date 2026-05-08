import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const TicketForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock save
    setTimeout(() => {
      setLoading(false);
      navigate('/tickets');
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/tickets')}
            className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-petrol-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Novo Atendimento</h2>
            <p className="text-muted-foreground">Preencha os detalhes do chamado.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-card border border-gray-100 dark:border-petrol-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Solicitante</label>
              <input type="text" required className="w-full px-3 py-2 border border-gray-200 dark:border-petrol-700 rounded-lg focus:ring-2 focus:ring-petrol-500 dark:bg-gray-800 dark:text-white" placeholder="Nome do solicitante" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Setor/Local</label>
              <select required className="w-full px-3 py-2 border border-gray-200 dark:border-petrol-700 rounded-lg focus:ring-2 focus:ring-petrol-500 dark:bg-gray-800 dark:text-white">
                <option value="">Selecione um setor...</option>
                <option value="Gabinete">Gabinete</option>
                <option value="RH">Recursos Humanos</option>
                <option value="Finanças">Finanças</option>
                <option value="Saúde">Secretaria de Saúde</option>
                <option value="Educação">Secretaria de Educação</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Tipo de Operação</label>
              <select required className="w-full px-3 py-2 border border-gray-200 dark:border-petrol-700 rounded-lg focus:ring-2 focus:ring-petrol-500 dark:bg-gray-800 dark:text-white">
                <option value="">Selecione...</option>
                <option value="Bancada">Bancada</option>
                <option value="In Loco">In Loco</option>
                <option value="Remoto">Remoto</option>
                <option value="Externo">Fora da prefeitura</option>
                <option value="Patrimônio">Patrimônio</option>
                <option value="Dados Sensiveis">Dados Sensíveis</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Prioridade</label>
              <select required className="w-full px-3 py-2 border border-gray-200 dark:border-petrol-700 rounded-lg focus:ring-2 focus:ring-petrol-500 dark:bg-gray-800 dark:text-white">
                <option value="LOW">Baixa</option>
                <option value="NORMAL" selected>Normal</option>
                <option value="HIGH">Alta</option>
                <option value="URGENT">Urgente</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Descrição do Problema</label>
            <textarea required rows={4} className="w-full px-3 py-2 border border-gray-200 dark:border-petrol-700 rounded-lg focus:ring-2 focus:ring-petrol-500 dark:bg-gray-800 dark:text-white" placeholder="Descreva os detalhes..."></textarea>
          </div>

        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-petrol-900/50 border-t border-gray-100 dark:border-petrol-800 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={() => navigate('/tickets')}
            className="px-4 py-2 border border-gray-200 dark:border-petrol-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-petrol-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center px-4 py-2 bg-petrol-600 text-white rounded-lg hover:bg-petrol-700 transition-colors shadow-sm disabled:opacity-70"
          >
            {loading ? 'Salvando...' : <><Save className="h-4 w-4 mr-2" /> Salvar Chamado</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
