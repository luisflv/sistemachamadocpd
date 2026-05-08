# DTI Flow - Gestão de Atendimentos

Sistema web fullstack moderno destinado ao gerenciamento inteligente de atendimentos da Diretoria de Tecnologia da Informação (DTI).

## Tecnologias Utilizadas

### Frontend
- **React + Vite** (TypeScript)
- **TailwindCSS** + **Shadcn/UI** para componentização
- **Recharts** para gráficos do Dashboard
- **React Router Dom** para rotas
- **Lucide React** para ícones

### Backend
- **Node.js + Express** (TypeScript)
- **Prisma ORM** (Configurado inicialmente com SQLite para testes, preparado para PostgreSQL)
- **JWT** (Autenticação) + **Bcrypt** (Criptografia)

## Requisitos
- Node.js (v18 ou superior)
- NPM, Yarn, ou PNPM

## Como rodar localmente

### 1. Clonar o repositório
\`\`\`bash
git clone https://github.com/seu-usuario/dti-flow.git
cd dti-flow
\`\`\`

### 2. Configurar o Backend
\`\`\`bash
cd backend
npm install
\`\`\`

Configure as variáveis de ambiente:
\`\`\`bash
cp .env.example .env
\`\`\`

Execute as migrações do banco de dados (SQLite por padrão para desenvolvimento local):
\`\`\`bash
npx prisma db push
\`\`\`

Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`
O backend estará rodando em \`http://localhost:3333\`.

### 3. Configurar o Frontend
Em um novo terminal:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
O frontend estará acessível na porta fornecida pelo Vite (geralmente \`http://localhost:5173\`).

## Deploy (Hospedagem)

- **Frontend (Vercel)**:
  Basta conectar o repositório do GitHub à Vercel e o build automático (\`npm run build\`) irá configurar a aplicação. Lembre-se de configurar a variável \`VITE_API_URL\` na Vercel apontando para o URL do Backend no Render.
  
- **Backend (Render)**:
  Crie um novo "Web Service" no Render. Conecte ao seu repositório. O "Build Command" deve ser \`npm install && npm run build\` e o "Start Command" deve ser \`npm run start\`.
  
- **Banco de Dados (Neon/Supabase - PostgreSQL)**:
  Para mudar para o PostgreSQL, altere a URL no \`.env\` do backend e atualize o arquivo \`prisma/schema.prisma\`:
  \`\`\`prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  \`\`\`
  Após isso, rode \`npx prisma db push\` para sincronizar com o banco na nuvem.

## Usuário Admin Padrão
Após conectar o banco, você pode criar um script de seed ou registrar um usuário manualmente via Postman para ter acesso ao sistema. Como mock inicial no frontend para testes de UI, use:
- **Email:** \`admin@dtiflow.com\`
- **Senha:** \`admin\`
