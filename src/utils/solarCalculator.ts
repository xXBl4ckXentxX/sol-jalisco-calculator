
import { PANEL_ESTANDAR, PANELES_SOLARES } from '@/data/municipios';
import type { Municipio, PanelSolar } from '@/data/municipios';

export interface CalculationResult {
  paneles: number;
  area: string;
  ahorro: number;
  potenciaTotal: number;
  costoEstimado: string;
  tipoPanel: PanelSolar;
  datosRetornoInversion: RetornoInversionData[];
}

export interface RetornoInversionData {
  year: number;
  ahorroCumulativo: number;
  ahorroAnual: number;
}

export interface CalculationInput {
  areaDisponible: number;
  consumo: number;
  municipio: Municipio;
  eficiencia: number;
  tipoPanelId: string;
}

export function calcularPaneles(input: CalculationInput): CalculationResult {
  const { areaDisponible, consumo, municipio, eficiencia } = input;
  
  // Obtener el panel seleccionado o usar el estándar si no existe
  const tipoPanel = PANELES_SOLARES.find(p => p.id === input.tipoPanelId) || PANEL_ESTANDAR;
  
  // Cálculos básicos
  const consumoDiario = (consumo * 1000) / 30; // Wh/día
  const energiaPorPanel = tipoPanel.potencia * municipio.irradiacion * eficiencia;
  const panelesNecesarios = Math.ceil(consumoDiario / energiaPorPanel);
  
  // Cálculos con área disponible
  const maxPaneles = Math.floor(areaDisponible / tipoPanel.area);
  const panelesInstalables = Math.min(panelesNecesarios, maxPaneles);

  // Cálculo de potencia total y costo estimado
  const potenciaTotal = panelesInstalables * tipoPanel.potencia / 1000; // kW
  const costoEstimado = panelesInstalables * tipoPanel.costoPorPanel;

  // En un sistema real, el ahorro dependerá de varios factores
  // Aquí se simplifica con un valor basado en la proporción de paneles instalables vs necesarios
  const porcentajeCobertura = Math.min(100, (panelesInstalables / panelesNecesarios) * 100);
  
  // Calcular el retorno de inversión
  const precioPromedioElectricidad = 2.5; // MXN por kWh
  const produccionAnualEstimada = potenciaTotal * municipio.irradiacion * 365 * eficiencia; // kWh/año
  const ahorroAnual = produccionAnualEstimada * precioPromedioElectricidad;
  
  // Generar datos para gráfico de ROI
  const datosRetornoInversion: RetornoInversionData[] = [];
  let ahorroCumulativo = 0;
  
  for (let year = 0; year <= 25; year++) {
    if (year > 0) {
      ahorroCumulativo += ahorroAnual;
    }
    
    datosRetornoInversion.push({
      year,
      ahorroCumulativo,
      ahorroAnual: year > 0 ? ahorroAnual : 0
    });
  }
  
  return {
    paneles: panelesInstalables,
    area: (panelesInstalables * tipoPanel.area).toFixed(1),
    ahorro: Math.round(porcentajeCobertura),
    potenciaTotal: parseFloat(potenciaTotal.toFixed(2)),
    costoEstimado: new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(costoEstimado),
    tipoPanel,
    datosRetornoInversion
  };
}
