
import { PANEL_ESTANDAR } from '@/data/municipios';
import type { Municipio } from '@/data/municipios';

export interface CalculationResult {
  paneles: number;
  area: string;
  ahorro: number;
  potenciaTotal: number;
  costoEstimado: string;
}

export interface CalculationInput {
  areaDisponible: number;
  consumo: number;
  municipio: Municipio;
  eficiencia: number;
}

export function calcularPaneles(input: CalculationInput): CalculationResult {
  const { areaDisponible, consumo, municipio, eficiencia } = input;
  
  // Cálculos básicos
  const consumoDiario = (consumo * 1000) / 30; // Wh/día
  const energiaPorPanel = PANEL_ESTANDAR.potencia * municipio.irradiacion * eficiencia;
  const panelesNecesarios = Math.ceil(consumoDiario / energiaPorPanel);
  
  // Cálculos con área disponible
  const maxPaneles = Math.floor(areaDisponible / PANEL_ESTANDAR.area);
  const panelesInstalables = Math.min(panelesNecesarios, maxPaneles);

  // Cálculo de potencia total y costo estimado
  const potenciaTotal = panelesInstalables * PANEL_ESTANDAR.potencia / 1000; // kW
  const costoEstimado = panelesInstalables * PANEL_ESTANDAR.costoPorPanel;

  // En un sistema real, el ahorro dependerá de varios factores
  // Aquí se simplifica con un valor basado en la proporción de paneles instalables vs necesarios
  const porcentajeCobertura = Math.min(100, (panelesInstalables / panelesNecesarios) * 100);
  
  return {
    paneles: panelesInstalables,
    area: (panelesInstalables * PANEL_ESTANDAR.area).toFixed(1),
    ahorro: Math.round(porcentajeCobertura),
    potenciaTotal: parseFloat(potenciaTotal.toFixed(2)),
    costoEstimado: new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(costoEstimado)
  };
}
