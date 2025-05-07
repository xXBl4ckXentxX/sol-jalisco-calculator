
import { CalculationResult } from "@/utils/solarCalculator";
import { Card } from "@/components/ui/card";
import ROIChart from "./ROIChart";
import PanelDetails from "./PanelDetails";
import { Calculator, BarChart, TrendingUp } from "lucide-react";

interface ResultsDisplayProps {
  results: CalculationResult;
}

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  return (
    <div className="mt-6 pt-6 border-t animate-fade-in space-y-6">
      <h3 className="text-lg font-semibold text-center mb-4">Resultados</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultCard
          value={results.paneles.toString()}
          label="Paneles necesarios"
          icon={<Calculator size={20} />}
        />
        <ResultCard
          value={`${results.area} m²`}
          label="Área requerida"
          icon={<BarChart size={20} />}
        />
        <ResultCard
          value={`${results.ahorro}%`}
          label="Ahorro estimado"
          icon={<TrendingUp size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <ResultCard
          value={`${results.potenciaTotal} kW`}
          label="Potencia total"
          icon="⚡"
        />
        <ResultCard
          value={results.costoEstimado}
          label="Costo estimado"
          icon="💵"
        />
      </div>

      <PanelDetails panel={results.tipoPanel} />
      
      <ROIChart 
        datos={results.datosRetornoInversion} 
        costoInicial={results.costoEstimado}
      />

      <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
        <h4 className="font-medium text-solar-blue mb-2">Importante</h4>
        <p className="text-sm text-gray-600">
          Estos resultados son estimados. Para un presupuesto detallado y
          personalizado, por favor contáctenos.
        </p>
      </div>
    </div>
  );
};

interface ResultCardProps {
  value: string;
  label: string;
  icon: React.ReactNode | string;
}

const ResultCard = ({ value, label, icon }: ResultCardProps) => {
  return (
    <Card className="p-4 bg-gray-50 text-center">
      <div className="mb-1 flex justify-center">
        {typeof icon === 'string' ? icon : icon}
      </div>
      <div className="text-xl font-bold text-solar-blue">{value}</div>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
    </Card>
  );
};

export default ResultsDisplay;
