
export interface Municipio {
  id: number;
  nombre: string;
  irradiacion: number; // kWh/m²/día
}

export interface PanelSolar {
  id: string;
  nombre: string;
  potencia: number; // Watts
  area: number; // m²
  eficiencia: number; // porcentaje (0-100)
  costoPorPanel: number; // MXN
  garantia: number; // años
}

export const MUNICIPIOS_JALISCO: Municipio[] = [
  { id: 1, nombre: "Guadalajara", irradiacion: 5.8 },
  { id: 2, nombre: "Zapopan", irradiacion: 5.7 },
  { id: 3, nombre: "Tlaquepaque", irradiacion: 5.8 },
  { id: 4, nombre: "Tonalá", irradiacion: 5.9 },
  { id: 5, nombre: "Puerto Vallarta", irradiacion: 5.5 },
  { id: 6, nombre: "Lagos de Moreno", irradiacion: 6.1 },
  { id: 7, nombre: "Tlajomulco", irradiacion: 5.8 },
  { id: 8, nombre: "El Salto", irradiacion: 5.9 },
  { id: 9, nombre: "Tepatitlán", irradiacion: 6.0 },
  { id: 10, nombre: "Ocotlán", irradiacion: 5.9 },
];

export const PANELES_SOLARES: PanelSolar[] = [
  {
    id: "estandar",
    nombre: "Panel Estándar",
    potencia: 450,
    area: 2.2,
    eficiencia: 18.5,
    costoPorPanel: 4500,
    garantia: 25
  },
  {
    id: "premium",
    nombre: "Panel Premium",
    potencia: 535,
    area: 2.3,
    eficiencia: 21.5,
    costoPorPanel: 6200,
    garantia: 30
  },
  {
    id: "economico",
    nombre: "Panel Económico",
    potencia: 380,
    area: 2.1,
    eficiencia: 16.2,
    costoPorPanel: 3200,
    garantia: 20
  },
  {
    id: "bifacial",
    nombre: "Panel Bifacial",
    potencia: 490,
    area: 2.2,
    eficiencia: 19.8,
    costoPorPanel: 5500,
    garantia: 28
  }
];

export const PANEL_ESTANDAR = PANELES_SOLARES.find(p => p.id === "estandar")!;
