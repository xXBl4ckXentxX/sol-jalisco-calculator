
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    
    if (loggedIn && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, this would involve API calls for authentication
    if (email && password) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userEmail', email);
      setIsLoggedIn(true);
      setUserEmail(email);
      toast({
        title: "¡Inicio de sesión exitoso!",
        description: "Bienvenido a SolJalisco"
      });
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Por favor, ingresa un correo y contraseña válidos.",
        variant: "destructive"
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail(null);
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente."
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
