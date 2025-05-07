
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { userEmail, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="logo text-2xl font-bold">
          <span className="logo-sol">Sol</span>
          <span className="logo-jalisco">Jalisco</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <User size={16} className="text-solar-blue" />
            <span className="text-sm text-gray-600">{userEmail}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout} 
            className="text-solar-blue hover:text-solar-blue/80 hover:bg-blue-50"
          >
            <LogOut size={16} className="mr-2" />
            <span>Cerrar sesión</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
