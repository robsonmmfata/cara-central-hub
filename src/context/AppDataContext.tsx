
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Property {
  id: number;
  nome: string;
  proprietario: string;
  localizacao: string;
  capacidade: number;
  preco: number;
  status: string;
  reservas: number;
  receita: number;
  dataCadastro: string;
  imagem?: string;
  descricao?: string;
  rating?: number;
}

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  status: string;
  ultimoLogin: string;
  propriedades?: number;
  reservas?: number;
  dataCadastro: string;
}

interface Transaction {
  id: number;
  propriedade: string;
  proprietario: string;
  valor: number;
  comissao: number;
  data: string;
  status: string;
}

interface AppDataContextType {
  properties: Property[];
  users: User[];
  transactions: Transaction[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: number, updates: Partial<Property>) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updatePropertyStatus: (id: number, status: string) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const initialProperties: Property[] = [
  {
    id: 1,
    nome: "Chácara Vista Verde",
    proprietario: "João Silva",
    localizacao: "Atibaia, SP",
    capacidade: 20,
    preco: 350,
    status: "aprovada",
    reservas: 12,
    receita: 4200,
    dataCadastro: "15/01/2024",
    imagem: "/placeholder.svg",
    descricao: "Linda chácara com vista para as montanhas",
    rating: 4.8
  },
  {
    id: 2,
    nome: "Sítio do Sol",
    proprietario: "Ana Costa",
    localizacao: "Ibiúna, SP",
    capacidade: 15,
    preco: 280,
    status: "pendente",
    reservas: 0,
    receita: 0,
    dataCadastro: "20/01/2024",
    imagem: "/placeholder.svg",
    descricao: "Sítio aconchegante com piscina aquecida",
    rating: 4.6
  },
  {
    id: 3,
    nome: "Chácara Recanto Feliz",
    proprietario: "Pedro Lima",
    localizacao: "Mairiporã, SP",
    capacidade: 30,
    preco: 420,
    status: "aprovada",
    reservas: 8,
    receita: 3360,
    dataCadastro: "10/01/2024",
    imagem: "/placeholder.svg",
    descricao: "Espaço amplo ideal para grandes eventos",
    rating: 4.9
  }
];

const initialUsers: User[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    tipo: "Proprietário",
    status: "ativo",
    ultimoLogin: "Hoje",
    propriedades: 2,
    dataCadastro: "15/01/2024"
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    tipo: "Visitante",
    status: "ativo",
    ultimoLogin: "Ontem",
    reservas: 5,
    dataCadastro: "18/01/2024"
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos@email.com",
    tipo: "Proprietário",
    status: "pendente",
    ultimoLogin: "2 dias atrás",
    propriedades: 1,
    dataCadastro: "20/01/2024"
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana@email.com",
    tipo: "Visitante",
    status: "ativo",
    ultimoLogin: "3 dias atrás",
    reservas: 12,
    dataCadastro: "22/01/2024"
  }
];

const initialTransactions: Transaction[] = [
  { id: 1, propriedade: "Chácara Vista Verde", proprietario: "João Silva", valor: 350, comissao: 35, data: "15/12/2024", status: "pago" },
  { id: 2, propriedade: "Sítio do Sol", proprietario: "Ana Costa", valor: 280, comissao: 28, data: "20/12/2024", status: "pendente" },
  { id: 3, propriedade: "Chácara Recanto Feliz", proprietario: "Pedro Lima", valor: 420, comissao: 42, data: "22/12/2024", status: "pago" }
];

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = {
      ...property,
      id: Math.max(...properties.map(p => p.id), 0) + 1,
      dataCadastro: new Date().toLocaleDateString('pt-BR')
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id: number, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = {
      ...user,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      dataCadastro: new Date().toLocaleDateString('pt-BR')
    };
    setUsers(prev => [...prev, newUser]);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.max(...transactions.map(t => t.id), 0) + 1
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const updatePropertyStatus = (id: number, status: string) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <AppDataContext.Provider value={{
      properties,
      users,
      transactions,
      addProperty,
      updateProperty,
      addUser,
      addTransaction,
      updatePropertyStatus
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
