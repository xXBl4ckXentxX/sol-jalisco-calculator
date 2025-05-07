
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const SolarHero = () => {
  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById('calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-solar-blue">Descubre</span> tu potencial solar
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Calcula cuántos paneles necesitas para tu hogar en Jalisco y empieza a ahorrar en tu factura eléctrica
        </p>
        <Button 
          onClick={scrollToCalculator}
          className="bg-solar-orange hover:bg-solar-orange/90 text-white px-6 py-2 rounded-md"
        >
          Comenzar cálculo <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default SolarHero;
