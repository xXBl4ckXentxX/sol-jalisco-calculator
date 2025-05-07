
import { Card, CardContent } from '@/components/ui/card';
import { RetornoInversionData } from '@/utils/solarCalculator';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine,
  Label
} from 'recharts';
import { Info } from "lucide-react";

interface ROIChartProps {
  datos: RetornoInversionData[];
  costoInicial: string;
}

const ROIChart = ({ datos, costoInicial }: ROIChartProps) => {
  // Encontrar el año de retorno de inversión (cuando el ahorro acumulado supera el costo inicial)
  const costoInicialNumerico = parseFloat(costoInicial.replace(/[^\d.-]/g, ''));
  const breakEvenYear = datos.find(d => d.ahorroCumulativo >= costoInicialNumerico)?.year || 0;
  
  // Formatear el dinero para las etiquetas
  const formatMoney = (value: number) => 
    new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(value);

  return (
    <Card className="w-full mt-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Retorno de Inversión</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Info size={16} className="mr-1" />
            <span>Punto de equilibrio: Año {breakEvenYear}</span>
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ChartContainer
            config={{
              ahorro: { theme: { light: "#0EA5E9" } },
              acumulado: { theme: { light: "#F97316" } },
              inversion: { theme: { light: "#ef4444" } }
            }}
          >
            <ComposedChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Años', position: 'insideBottom', offset: -10 }} 
              />
              <YAxis 
                yAxisId="left" 
                tickFormatter={formatMoney} 
                label={{ 
                  value: 'Ahorro acumulado (MXN)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickFormatter={formatMoney} 
                label={{ 
                  value: 'Ahorro anual (MXN)', 
                  angle: 90, 
                  position: 'insideRight',
                  style: { textAnchor: 'middle' } 
                }} 
              />
              
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number) => formatMoney(value)}
              />
              <Legend />
              
              <Bar 
                yAxisId="right"
                dataKey="ahorroAnual"
                name="Ahorro anual"
                fill="var(--color-ahorro)"
                barSize={20}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="ahorroCumulativo"
                name="Ahorro acumulado"
                stroke="var(--color-acumulado)"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
              <ReferenceLine
                y={costoInicialNumerico}
                yAxisId="left"
                stroke="var(--color-inversion)"
                strokeDasharray="3 3"
                strokeWidth={2}
              >
                <Label value="Inversión inicial" position="insideBottomLeft" />
              </ReferenceLine>
            </ComposedChart>
          </ChartContainer>
        </div>
        
        <div className="text-sm mt-4 text-center text-muted-foreground">
          Nota: Esta proyección estima el ahorro basado en tarifas actuales y no considera inflación ni cambios tarifarios.
        </div>
      </CardContent>
    </Card>
  );
};

export default ROIChart;
