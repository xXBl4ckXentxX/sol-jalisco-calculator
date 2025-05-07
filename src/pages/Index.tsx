
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SolarHero from '@/components/SolarHero';
import SolarCalculator from '@/components/SolarCalculator';
import Benefits from '@/components/Benefits';

const Index = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <LoginForm />
        </div>
        <div className="hidden md:flex flex-1 bg-blue-50 items-center justify-center p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-solar-blue">Bienvenido a SolJalisco</h2>
            <p className="text-gray-700">
              Accede a nuestra calculadora de paneles solares y comienza a planificar tu sistema.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <SolarHero />
        
        <div id="calculator" className="py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            Calculadora Solar
          </h2>
          <SolarCalculator />
        </div>
        
        <Benefits />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
