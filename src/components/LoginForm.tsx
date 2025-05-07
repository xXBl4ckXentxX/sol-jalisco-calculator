
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Card className="w-full max-w-md p-8 shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Iniciar Sesión</h1>
        <p className="text-muted-foreground">Ingresa tus credenciales para acceder a tu cuenta</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="nombre@ejemplo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Contraseña</Label>
              <a href="#" className="text-sm text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2 my-6">
            <Checkbox 
              id="remember" 
              checked={remember}
              onCheckedChange={() => setRemember(!remember)}
            />
            <Label htmlFor="remember" className="text-sm font-medium leading-none cursor-pointer">
              Recordarme
            </Label>
          </div>

          <Button type="submit" className="w-full bg-solar-blue hover:bg-solar-blue/90">
            Iniciar Sesión
          </Button>
        </div>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-primary hover:underline font-medium">
            Regístrate
          </a>
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;
