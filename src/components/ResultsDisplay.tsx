
import { CalculationResult } from "@/utils/solarCalculator";
import { Card } from "@/components/ui/card";

interface ResultsDisplayProps {
  results: CalculationResult;
}

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  return (
    <div className="mt-6 pt-6 border-t animate-fade-in">
      <h3 className="text-lg font-semibold text-center mb-4">Resultados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultCard
          value={results.paneles.toString()}
          label="Paneles necesarios"
          icon="📊"
        />
        <ResultCard
          value={`${results.area} m²`}
          label="Área requerida"
          icon="📐"
        />
        <ResultCard
          value={`${results.ahorro}%`}
          label="Ahorro estimado"
          icon="💰"
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
  icon: string;
}

const ResultCard = ({ value, label, icon }: ResultCardProps) => {
  return (
    <Card className="p-4 bg-gray-50 text-center">
      <div className="mb-1">{icon}</div>
      <div className="text-xl font-bold text-solar-blue">{value}</div>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
    </Card>
  );
};

export default ResultsDisplay;
