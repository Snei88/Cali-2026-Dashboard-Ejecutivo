
import { PurposeData, OrganismData, SocialSpending, FundingSource, PopulationGroup } from './types';

// Cifras Globales (Pág 2, 3, 4, 37)
export const TOTAL_BUDGET = 7770567471543;
export const POAI_INVESTMENT = 5969056777143;
export const POAI_2025 = 4529018194762;
export const GROWTH_PERCENTAGE = 31.80;

// Propósitos y Retos (Pág 34, 35, 36)
export const PURPOSES: PurposeData[] = [
  { 
    name: 'Cali Reconciliada', 
    value: 4336729074303, 
    percentage: 72.65,
    description: 'Orientado a promover la convivencia, la seguridad y la reconciliación social mediante el cierre de brechas y la generación de oportunidades.',
    challenges: [
      { name: 'Oportunidades para Integración Social and Económica', value: 3860295804762, percentage: 64.67 },
      { name: 'Seguridad, Convivencia y Justicia', value: 476433269541, percentage: 7.98 }
    ]
  },
  { 
    name: 'Cali Renovada y Sostenible', 
    value: 1341187650613, 
    percentage: 22.47,
    description: 'Busca un crecimiento urbano ordenado, respetuoso con el medio ambiente, mejorando la movilidad y la resiliencia del territorio.',
    challenges: [
      { name: 'Territorio Planificado y Conectado', value: 1196432457358, percentage: 20.04 },
      { name: 'Territorio Resiliente y Biodiverso', value: 144755193255, percentage: 2.43 }
    ]
  },
  { 
    name: 'Cali con Buen Gobierno', 
    value: 291140052227, 
    percentage: 4.88,
    description: 'Modernización de la administración para una gestión pública eficiente, transparente y cercana al ciudadano.',
    challenges: [
      { name: 'Gestión pública para los ciudadanos', value: 230298175082, percentage: 3.86 },
      { name: 'Gobierno abierto y transparente', value: 60841877145, percentage: 1.02 }
    ]
  },
];

// Inversión por Organismo - Lista Completa (Pág 39)
export const TOP_ORGANISMS: OrganismData[] = [
  { name: 'Secretaría de Salud Pública', projects: 33, budget: 1826907812426 },
  { name: 'Secretaría de Educación', projects: 50, budget: 1399217667804 },
  { name: 'Unidad Esp. Servicios Públicos', projects: 30, budget: 514468650557 },
  { name: 'Secretaría de Movilidad', projects: 9, budget: 466608504882 },
  { name: 'Secretaría de Infraestructura', projects: 23, budget: 373182960177 },
  { name: 'Secretaría de Bienestar Social', projects: 42, budget: 293547423340 },
  { name: 'Secretaría de Seguridad y Justicia', projects: 14, budget: 185497132635 },
  { name: 'Secretaría de Deporte y Recreación', projects: 78, budget: 155292755328 },
  { name: 'Secretaría de Desarrollo Económico', projects: 50, budget: 136516286171 },
  { name: 'Secretaría de Cultura', projects: 71, budget: 138226970721 },
  { name: 'Secretaría de Vivienda Social', projects: 7, budget: 50840808319 },
  { name: 'DAGMA', projects: 44, budget: 57360554910 },
  { name: 'Planeación Financiera y Sostenibilidad Fiscal', projects: 11, budget: 46175390396 },
  { name: 'Secretaría de TIC', projects: 10, budget: 45465636085 },
  { name: 'Secretaría de Gobierno', projects: 4, budget: 35425318950 },
  { name: 'Subdirección de Finanzas', projects: 6, budget: 24073518100 },
];

// Financiación (Pág 38)
export const FUNDING_SOURCES: FundingSource[] = [
  { name: 'SGP (Nación)', value: 1873002982355, percentage: 31.38, description: 'Sistema General de Participaciones.' },
  { name: 'Recursos Propios (Libre Destinación)', value: 987373744482, percentage: 16.54, description: 'Impuestos locales (Predial e ICA).' },
  { name: 'Recursos Propios (Destinación Específica)', value: 1067595187149, percentage: 17.89, description: 'Estampillas, sobretasas y multas.' },
  { name: 'Empréstito (Crédito)', value: 789880636152, percentage: 13.23, description: 'Crédito interno para inversión (No recurrente).' },
  { name: 'Otros Recursos (Destinación Específica)', value: 1251204227005, percentage: 20.96, description: 'Rentas con destinación legal.' }
];

// Poblaciones (Pág 45)
export const VULNERABLE_GROUPS: PopulationGroup[] = [
  { name: 'Niños, Niñas y Jóvenes', budget: 724000173657 },
  { name: 'Etnias', budget: 105903213103 },
  { name: 'Adulto Mayor', budget: 44446649785 },
  { name: 'Mujeres', budget: 32257686891 },
  { name: 'Víctimas', budget: 18482441789 },
];

// Programas de Alto Impacto (Pág 36-37)
export const TOP_PROGRAMS = [
  { name: 'Salud Integral y de Calidad', budget: 1812098103592, percentage: 30.36 },
  { name: 'Cali Educada', budget: 1251240059614, percentage: 20.96 },
  { name: 'Movilidad Segura y Sostenible', budget: 820608722156, percentage: 13.75 },
  { name: 'Atención Integral a Poblaciones', budget: 208683817779, percentage: 3.50 },
  { name: 'Hambre Cero', budget: 228212438335, percentage: 3.82 }
];
