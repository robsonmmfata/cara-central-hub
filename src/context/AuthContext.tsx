
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'admin' | 'proprietario' | 'visitante';

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@sistema.com': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Administrador',
      email: 'admin@sistema.com',
      type: 'admin'
    }
  },
  'proprietario@teste.com': {
    password: 'prop123',
    user: {
      id: '2',
      name: 'João Silva',
      email: 'proprietario@teste.com',
      type: 'proprietario'
    }
  },
  'visitante@teste.com': {
    password: 'visit123',
    user: {
      id: '3',
      name: 'Maria Santos',
      email: 'visitante@teste.com',
      type: 'visitante'
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const userData = mockUsers[email];
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem('currentUser', JSON.stringify(userData.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
