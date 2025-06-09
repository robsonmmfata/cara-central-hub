
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
  proprietarioId?: number;
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
  tipo?: string;
}

interface AppDataContextType {
  properties: Property[];
  users: User[];
  transactions: Transaction[];
  addProperty: (property: Omit<Property, 'id' | 'dataCadastro' | 'reservas' | 'receita'>) => void;
  updateProperty: (id: number, updates: Partial<Property>) => void;
  addUser: (user: Omit<User, 'id' | 'dataCadastro'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updatePropertyStatus: (id: number, status: string) => void;
  getUserProperties: (userId: number) => Property[];
  getApprovedProperties: () => Property[];
  getTotalRevenue: () => number;
  getRecentUsers: (limit?: number) => User[];
  getRecentTransactions: (limit?: number) => Transaction[];
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const initialProperties: Property[] = [
  {
    id: 1,
    nome: "Chácara Vista Verde",
    proprietario: "João Silva",
    proprietarioId: 1,
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
    proprietarioId: 4,
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
    proprietarioId: 3,
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
    tipo: "proprietario",
    status: "ativo",
    ultimoLogin: "Hoje",
    propriedades: 1,
    dataCadastro: "15/01/2024"
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    tipo: "visitante",
    status: "ativo",
    ultimoLogin: "Ontem",
    reservas: 5,
    dataCadastro: "18/01/2024"
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos@email.com",
    tipo: "proprietario",
    status: "pendente",
    ultimoLogin: "2 dias atrás",
    propriedades: 1,
    dataCadastro: "20/01/2024"
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana@email.com",
    tipo: "proprietario",
    status: "ativo",
    ultimoLogin: "3 dias atrás",
    propriedades: 1,
    dataCadastro: "22/01/2024"
  }
];

const initialTransactions: Transaction[] = [
  { 
    id: 1, 
    propriedade: "Chácara Vista Verde", 
    proprietario: "João Silva", 
    valor: 350, 
    comissao: 35, 
    data: "15/12/2024", 
    status: "pago",
    tipo: "reserva" 
  },
  { 
    id: 2, 
    propriedade: "Sítio do Sol", 
    proprietario: "Ana Costa", 
    valor: 280, 
    comissao: 28, 
    data: "20/12/2024", 
    status: "pendente",
    tipo: "reserva" 
  },
  { 
    id: 3, 
    propriedade: "Chácara Recanto Feliz", 
    proprietario: "Pedro Lima", 
    valor: 420, 
    comissao: 42, 
    data: "22/12/2024", 
    status: "pago",
    tipo: "reserva" 
  }
];

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addProperty = (property: Omit<Property, 'id' | 'dataCadastro' | 'reservas' | 'receita'>) => {
    const newProperty = {
      ...property,
      id: Math.max(...properties.map(p => p.id), 0) + 1,
      dataCadastro: new Date().toLocaleDateString('pt-BR'),
      reservas: 0,
      receita: 0,
      status: 'pendente'
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id: number, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addUser = (user: Omit<User, 'id' | 'dataCadastro'>) => {
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

  const getUserProperties = (userId: number) => {
    return properties.filter(p => p.proprietarioId === userId);
  };

  const getApprovedProperties = () => {
    return properties.filter(p => p.status === 'aprovada');
  };

  const getTotalRevenue = () => {
    return transactions.filter(t => t.status === 'pago').reduce((sum, t) => sum + t.valor, 0);
  };

  const getRecentUsers = (limit: number = 5) => {
    return users
      .sort((a, b) => new Date(b.dataCadastro).getTime() - new Date(a.dataCadastro).getTime())
      .slice(0, limit);
  };

  const getRecentTransactions = (limit: number = 5) => {
    return transactions
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
      .slice(0, limit);
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
      updatePropertyStatus,
      getUserProperties,
      getApprovedProperties,
      getTotalRevenue,
      getRecentUsers,
      getRecentTransactions
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
