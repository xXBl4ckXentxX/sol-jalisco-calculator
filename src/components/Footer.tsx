
import { useEffect, useState } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(0);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
        <p>© {currentYear} SolJalisco. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
