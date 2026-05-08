import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2 } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, this connects to the backend API
      // const response = await axios.post('http://localhost:3333/api/auth/login', { email, password });
      // localStorage.setItem('token', response.data.token);
      
      // Mocking for now
      setTimeout(() => {
        if (email === 'admin@dtiflow.com' && password === 'admin') {
          localStorage.setItem('token', 'mock_jwt_token');
          navigate('/dashboard');
        } else {
          setError('Credenciais inválidas. Tente admin@dtiflow.com / admin');
          setLoading(false);
        }
      }, 1000);
    } catch (err) {
      setError('Ocorreu um erro ao conectar com o servidor.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-petrol-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-card rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-petrol-900 dark:text-white">DTI Flow</h1>
            <p className="text-muted-foreground mt-2">Gestão Inteligente de Atendimentos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-petrol-900 dark:text-gray-300">Email Corporativo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-petrol-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
                  placeholder="admin@dtiflow.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-petrol-900 dark:text-gray-300">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-petrol-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-petrol-600 hover:bg-petrol-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-petrol-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Entrar no Sistema'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
