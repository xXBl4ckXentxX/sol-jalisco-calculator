
export interface Municipio {
  id: number;
  nombre: string;
  irradiacion: number; // kWh/m²/día
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

export const PANEL_ESTANDAR = {
  potencia: 450, // Watts
  area: 2.2, // m²
  costoPorPanel: 4500 // MXN
};
