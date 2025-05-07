
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MUNICIPIOS_JALISCO, PANELES_SOLARES } from '@/data/municipios';
import { calcularPaneles, CalculationResult } from '@/utils/solarCalculator';
import { useToast } from '@/components/ui/use-toast';
import ResultsDisplay from './ResultsDisplay';

const SolarCalculator = () => {
  const [areaDisponible, setAreaDisponible] = useState<number | ''>('');
  const [consumo, setConsumo] = useState<number>(350);
  const [municipioId, setMunicipioId] = useState<string>('');
  const [eficiencia, setEficiencia] = useState<number>(80);
  const [tipoPanelId, setTipoPanelId] = useState<string>("estandar");
  const [results, setResults] = useState<CalculationResult | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    // Validaciones
    if (!areaDisponible || areaDisponible < 5) {
      toast({
        title: "Error de validación",
        description: "Ingrese un área válida (mínimo 5 m²)",
        variant: "destructive",
      });
      return;
    }

    if (!consumo || consumo < 50) {
      toast({
        title: "Error de validación",
        description: "Ingrese un consumo válido (mínimo 50 kWh)",
        variant: "destructive",
      });
      return;
    }

    if (!municipioId) {
      toast({
        title: "Error de validación",
        description: "Seleccione un municipio",
        variant: "destructive",
      });
      return;
    }

    // Encontrar el municipio seleccionado
    const municipio = MUNICIPIOS_JALISCO.find(m => m.id.toString() === municipioId);
    
    if (!municipio) {
      toast({
        title: "Error",
        description: "Municipio no encontrado",
        variant: "destructive",
      });
      return;
    }

    // Calcular resultados
    const calculationResults = calcularPaneles({
      areaDisponible: Number(areaDisponible),
      consumo,
      municipio,
      eficiencia: eficiencia / 100,
      tipoPanelId
    });

    setResults(calculationResults);

    toast({
      title: "Cálculo completado",
      description: "Los resultados han sido calculados correctamente."
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card className="shadow-md">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="area-disponible">Área disponible (m²)</Label>
            <Input
              id="area-disponible"
              type="number"
              min={5}
              step={0.1}
              placeholder="Ej. 20"
              value={areaDisponible}
              onChange={(e) => setAreaDisponible(e.target.value ? Number(e.target.value) : '')}
              required
            />
            <p className="text-xs text-muted-foreground">Área en su techo/terreno para instalación</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="consumo">Consumo mensual (kWh)</Label>
            <Input
              id="consumo"
              type="number"
              min={50}
              max={2000}
              value={consumo}
              onChange={(e) => setConsumo(Number(e.target.value))}
              required
            />
            <p className="text-xs text-muted-foreground">Revise su recibo de luz para este dato</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="municipio">Municipio en Jalisco</Label>
            <Select value={municipioId} onValueChange={setMunicipioId}>
              <SelectTrigger id="municipio">
                <SelectValue placeholder="Seleccione un municipio" />
              </SelectTrigger>
              <SelectContent>
                {MUNICIPIOS_JALISCO.map((municipio) => (
                  <SelectItem key={municipio.id} value={municipio.id.toString()}>
                    {municipio.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tipo-panel">Tipo de panel</Label>
            <Select value={tipoPanelId} onValueChange={setTipoPanelId}>
              <SelectTrigger id="tipo-panel">
                <SelectValue placeholder="Seleccione un tipo de panel" />
              </SelectTrigger>
              <SelectContent>
                {PANELES_SOLARES.map((panel) => (
                  <SelectItem key={panel.id} value={panel.id}>
                    {panel.nombre} - {panel.potencia}W
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Seleccione el tipo de panel solar que desea instalar</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Eficiencia del sistema</Label>
              <span className="text-sm font-medium">{eficiencia}%</span>
            </div>
            <Slider
              defaultValue={[eficiencia]}
              min={70}
              max={95}
              step={1}
              onValueChange={(values) => setEficiencia(values[0])}
            />
          </div>

          <Button 
            onClick={handleCalculate} 
            className="w-full bg-solar-orange hover:bg-solar-orange/90"
          >
            Calcular
          </Button>

          {results && <ResultsDisplay results={results} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default SolarCalculator;
