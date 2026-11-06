"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Car,
  LayoutDashboard,
  ClipboardList,
  Users,
  Package,
  Search,
  HelpCircle,
  Bell,
  Phone,
  Mail,
  Check,
  Trash2,
  Plus,
  FileText,
  ChevronRight,
  ChevronDown,
  Printer,
  Copy,
  MessageCircle,
  Clock,
  CheckCircle2,
  Sparkles,
  X,
  QrCode,
  Camera,
  ArrowLeft,
  ArrowUpRight,
  Smartphone,
  Pin,
  Wrench,
  Gauge,
  Calendar,
  AlertCircle,
  TrendingUp,
  Send,
  ShieldCheck,
  Menu,
  ExternalLink,
  Activity,
  DollarSign,
} from "lucide-react";

// Types
export type StageIndex = 0 | 1 | 2 | 3 | 4 | 5;
export type NavigationTab =
  | "Órdenes de Trabajo"
  | "Dashboard"
  | "Inventario"
  | "Clientes";
export type AccordionId = 1 | 2 | 3 | 4 | 5;

export interface StageInfo {
  id: StageIndex;
  label: string;
  percentage: number;
  defaultNote: string;
}

export interface PartItem {
  id: string;
  description: string;
  category: "Repuesto" | "Mano de Obra";
  quantity: number;
  unit: string;
  unitPrice: number;
  status: "Instalado" | "En progreso";
}

export interface TimelineEvent {
  id: string;
  time: string;
  actor: string;
  text: string;
  completed: boolean;
}

export interface HistoricalServiceRecord {
  id: string;
  date: string;
  orderNumber: string;
  mileage: string;
  serviceTitle: string;
  diagnosisSummary: string;
  installedParts: string[];
  mechanic: string;
  totalBilled: number;
  warrantyLabel: string;
  isCurrentOrder?: boolean;
}

export interface VehicleOrder {
  id: string;
  bayNumber: string;
  name: string;
  model: string;
  year: string;
  plate: string;
  orderNumber: string;
  traceId: string;
  engineSpec: string;
  mileage: string;
  checkInTime: string;
  ownerName: string;
  ownerFirstName: string;
  ownerDni: string;
  clientSince: string;
  vin: string;
  nextRecommendedService: string;
  fleetPlates: { plate: string; label: string }[];
  phone: string;
  email: string;
  lastVisit: string;
  historicalServices: number;
  budgetApproved: boolean;
  stageIndex: StageIndex;
  activeComponent: string;
  estimatedDelivery: string;
  photoUrl: string;
  photoCaption: string;
  parts: PartItem[];
  timeline: TimelineEvent[];
  serviceHistory: HistoricalServiceRecord[];
}

export interface InventoryStockItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  unit: string;
  unitPrice: number;
}

export const STAGES: StageInfo[] = [
  {
    id: 0,
    label: "Recepción",
    percentage: 15,
    defaultNote: "Vehículo recepcionado e inspeccionado en bahía",
  },
  {
    id: 1,
    label: "Diagnóstico",
    percentage: 35,
    defaultNote: "Diagnóstico computarizado y revisión mecánica en curso",
  },
  {
    id: 2,
    label: "En Reparación",
    percentage: 65,
    defaultNote: "Reparación mecánica activa en bahía",
  },
  {
    id: 3,
    label: "Repuestos",
    percentage: 80,
    defaultNote: "Instalación y ajuste de repuestos verificados",
  },
  {
    id: 4,
    label: "Control Final",
    percentage: 92,
    defaultNote: "Control de calidad y prueba dinámica en ruta",
  },
  {
    id: 5,
    label: "Listo",
    percentage: 100,
    defaultNote: "Vehículo listo para entrega al cliente",
  },
];

export const STORAGE_KEY_VEHICLES = "boxbox_vehicles_v2";

export const INITIAL_VEHICLES: VehicleOrder[] = [
  {
    id: "focus-ae123cd",
    bayNumber: "Bahía 01",
    name: "Ford Focus (AE 123 CD)",
    model: "Ford Focus",
    year: "2021",
    plate: "AE 123 CD",
    orderNumber: "#OT-2026-104",
    traceId: "TRK-BOX-104",
    engineSpec: "2.0L Duratec",
    mileage: "68.400 km",
    checkInTime: "08:15 hs",
    ownerName: "Luis Pérez",
    ownerFirstName: "LUIS",
    ownerDni: "34.812.904",
    clientSince: "Cliente desde 2022",
    vin: "8AFZZZFFCHJ409218",
    nextRecommendedService:
      "Próximo cambio de aceite sintético y filtros a los 78.400 km (o Nov 2027)",
    fleetPlates: [
      { plate: "AE 123 CD", label: "AE 123 CD · Ford Focus" },
      { plate: "AC 908 KL", label: "AC 908 KL · Ford Ranger (Flota)" },
    ],
    phone: "(116) 656 1670",
    email: "luisperez@gmail.com",
    lastVisit: "05 Nov 2026",
    historicalServices: 6,
    budgetApproved: true,
    stageIndex: 2, // En Reparación (65%)
    activeComponent: "Embrague",
    estimatedDelivery: "Miércoles 14:00 hs",
    photoUrl:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=85",
    photoCaption: "Reemplazo de Kit de Embrague y revisión de carcasa",
    parts: [
      {
        id: "p1",
        description: "Kit Embrague",
        category: "Repuesto",
        quantity: 1,
        unit: "u.",
        unitPrice: 180000,
        status: "Instalado",
      },
      {
        id: "p2",
        description: "Mano de Obra",
        category: "Mano de Obra",
        quantity: 3,
        unit: "hrs",
        unitPrice: 25000,
        status: "En progreso",
      },
      {
        id: "p3",
        description: "Aceite Transmisión",
        category: "Repuesto",
        quantity: 2,
        unit: "L",
        unitPrice: 15000,
        status: "Instalado",
      },
    ],
    timeline: [
      {
        id: "t1",
        time: "12:00 hs",
        actor: "Carlos García",
        text: "Reparación en progreso — Desmontaje y reemplazo de Kit de Embrague",
        completed: true,
      },
      {
        id: "t2",
        time: "09:30 hs",
        actor: "Carlos García",
        text: "Diagnóstico completo — Falla de desgaste en embrague detectada",
        completed: true,
      },
      {
        id: "t3",
        time: "08:15 hs",
        actor: "Recepción Taller",
        text: "Vehículo ingresado en Bahía 01 y etiqueta BoxBox QR emitida",
        completed: false,
      },
    ],
    serviceHistory: [
      {
        id: "fh-1",
        date: "05 Nov 2026",
        orderNumber: "#OT-2026-104 (En Curso)",
        mileage: "68.400 km",
        serviceTitle: "Reemplazo de Kit de Embrague Completo y Transmisión",
        diagnosisSummary:
          "Desmontaje de caja MTX-75, reemplazo de placa, disco y crapodina hidráulica LUK + fluido sintético 75W-90.",
        installedParts: [
          "Kit Embrague LUK 2.0 Duratec",
          "Aceite Transmisión 75W-90 (2L)",
          "Retén Bancada Trasero",
        ],
        mechanic: "Carlos García (Jefe de Taller)",
        totalBilled: 285000,
        warrantyLabel: "Garantía BoxBox En Curso · 12 Meses / 20.000 km",
        isCurrentOrder: true,
      },
      {
        id: "fh-2",
        date: "15 Jul 2026",
        orderNumber: "#OT-2026-061",
        mileage: "60.120 km",
        serviceTitle: "Service Oficial 60.000 km + Frenos Delanteros",
        diagnosisSummary:
          "Mantenimiento programado de 60k, cambio de lubricante sintético 5W-30, 4 filtros y pastillas cerámicas delanteras.",
        installedParts: [
          "Aceite Sintético 5W-30 (5L)",
          "Kit 4 Filtros Motorcraft",
          "Pastillas de Freno Bosch",
        ],
        mechanic: "Carlos García",
        totalBilled: 214000,
        warrantyLabel: "Garantía Vigente · Certificada por BoxBox",
      },
      {
        id: "fh-3",
        date: "10 Ene 2026",
        orderNumber: "#OT-2026-012",
        mileage: "51.800 km",
        serviceTitle: "Diagnóstico Electrónico de Inyección y Cuerpo Mariposa",
        diagnosisSummary:
          "Limpieza por ultrasonido de inyectores GDI, recalibración electrónica de cuerpo mariposa y bujías Iridium.",
        installedParts: [
          "Juego 4 Bujías NGK Iridium",
          "Junta Cuerpo Mariposa",
          "Telemetría OBD-II",
        ],
        mechanic: "Martín Sosa (Electrónica)",
        totalBilled: 142000,
        warrantyLabel: "Garantía Certificada por BoxBox",
      },
      {
        id: "fh-4",
        date: "04 Ago 2025",
        orderNumber: "#OT-2025-198",
        mileage: "42.300 km",
        serviceTitle: "Service 40.000 km + Alineación 3D y Tren Delantero",
        diagnosisSummary:
          "Cambio de aceite y filtros, reemplazo de bieletas de barra estabilizadora y alineación computarizada 3D.",
        installedParts: [
          "Par Bieletas Suspensión",
          "Aceite Sintético 5W-30",
          "Filtro Aire y Habitáculo",
        ],
        mechanic: "Carlos García",
        totalBilled: 168000,
        warrantyLabel: "Historial Auditado BoxBox QR",
      },
    ],
  },
  {
    id: "gol-aa456zz",
    bayNumber: "Bahía 02",
    name: "VW Gol Trend (AA 456 ZZ)",
    model: "VW Gol Trend",
    year: "2019",
    plate: "AA 456 ZZ",
    orderNumber: "#OT-2026-108",
    traceId: "TRK-BOX-108",
    engineSpec: "1.6L MSI",
    mileage: "94.120 km",
    checkInTime: "08:30 hs",
    ownerName: "María Gómez",
    ownerFirstName: "MARÍA",
    ownerDni: "38.204.519",
    clientSince: "Cliente desde 2023",
    vin: "9BWAB45U7KP083412",
    nextRecommendedService:
      "Próximo control de correa Poly-V y service 100k a los 104.000 km",
    fleetPlates: [{ plate: "AA 456 ZZ", label: "AA 456 ZZ · VW Gol Trend" }],
    phone: "(114) 892 3310",
    email: "mariagomez@gmail.com",
    lastVisit: "05 Nov 2026",
    historicalServices: 4,
    budgetApproved: true,
    stageIndex: 1, // Diagnóstico (35%)
    activeComponent: "Tren Delantero y Frenos ABS",
    estimatedDelivery: "Jueves 11:30 hs",
    photoUrl:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=85",
    photoCaption: "Inspección de discos ventilados y sensores ABS",
    parts: [
      {
        id: "g1",
        description: "Juego Pastillas de Freno Bosch",
        category: "Repuesto",
        quantity: 1,
        unit: "u.",
        unitPrice: 68000,
        status: "Instalado",
      },
      {
        id: "g2",
        description: "Rectificación Discos Delanteros",
        category: "Mano de Obra",
        quantity: 2,
        unit: "u.",
        unitPrice: 22000,
        status: "En progreso",
      },
      {
        id: "g3",
        description: "Diagnóstico Escáner Electrónico",
        category: "Mano de Obra",
        quantity: 1,
        unit: "srv",
        unitPrice: 35000,
        status: "Instalado",
      },
    ],
    timeline: [
      {
        id: "gt1",
        time: "11:15 hs",
        actor: "Carlos García",
        text: "Diagnóstico en curso — Escaneo electrónico de módulo ABS",
        completed: true,
      },
      {
        id: "gt2",
        time: "09:00 hs",
        actor: "Carlos García",
        text: "Inspección inicial de tren delantero y medición de espesor de discos",
        completed: true,
      },
      {
        id: "gt3",
        time: "08:30 hs",
        actor: "Recepción Taller",
        text: "Vehículo ingresado en Bahía 02 y etiqueta BoxBox QR emitida",
        completed: false,
      },
    ],
    serviceHistory: [
      {
        id: "gh-1",
        date: "05 Nov 2026",
        orderNumber: "#OT-2026-108 (En Curso)",
        mileage: "94.120 km",
        serviceTitle: "Servicio de Frenos ABS y Tren Delantero",
        diagnosisSummary:
          "Reemplazo de pastillas delanteras Bosch, rectificación de discos ventilados y calibración de sensores de rueda ABS.",
        installedParts: [
          "Juego Pastillas Bosch",
          "Rectificación Discos x2",
          "Líquido de Frenos DOT-4",
        ],
        mechanic: "Carlos García",
        totalBilled: 147000,
        warrantyLabel: "Garantía BoxBox En Curso · 12 Meses",
        isCurrentOrder: true,
      },
      {
        id: "gh-2",
        date: "22 May 2026",
        orderNumber: "#OT-2026-044",
        mileage: "85.400 km",
        serviceTitle: "Cambio de Kit de Distribución y Bomba de Agua",
        diagnosisSummary:
          "Reemplazo preventivo de correa dentada INA, tensor mecánico, bomba de agua aluminio y refrigerante G13.",
        installedParts: [
          "Kit Distribución INA 1.6 MSI",
          "Bomba de Agua Dolz",
          "Refrigerante Orgánico G13",
        ],
        mechanic: "Carlos García",
        totalBilled: 265000,
        warrantyLabel: "Garantía Vigente · Certificada por BoxBox",
      },
      {
        id: "gh-3",
        date: "14 Nov 2025",
        orderNumber: "#OT-2025-230",
        mileage: "76.200 km",
        serviceTitle: "Service Completo 75.000 km + Batería 12V",
        diagnosisSummary:
          "Cambio de aceite sintético Helix HX8 5W-40, filtros completos y reemplazo de batería Moura 12x65.",
        installedParts: [
          "Batería Moura 12x65",
          "Aceite Sintético 5W-40 (4L)",
          "Filtro Aceite, Aire y Nafta",
        ],
        mechanic: "Martín Sosa",
        totalBilled: 238000,
        warrantyLabel: "Garantía Vigente · Certificada por BoxBox",
      },
    ],
  },
  {
    id: "hilux-af890xy",
    bayNumber: "Bahía 03",
    name: "Toyota Hilux (AF 890 XY)",
    model: "Toyota Hilux",
    year: "2022",
    plate: "AF 890 XY",
    orderNumber: "#OT-2026-112",
    traceId: "TRK-BOX-112",
    engineSpec: "2.8L TDI 4x4",
    mileage: "50.200 km",
    checkInTime: "08:00 hs",
    ownerName: "Roberto Díaz",
    ownerFirstName: "ROBERTO",
    ownerDni: "26.540.118",
    clientSince: "Cliente Corporativo desde 2021",
    vin: "8AJBA3CD9N1602890",
    nextRecommendedService:
      "Próximo Service 60.000 km + engrase de cardán 4x4 a los 60.200 km",
    fleetPlates: [
      { plate: "AF 890 XY", label: "AF 890 XY · Toyota Hilux SRX" },
      { plate: "AE 510 TR", label: "AE 510 TR · Toyota Hilux DX (Flota Agro)" },
    ],
    phone: "(115) 421 9088",
    email: "rdiaz@agro.com.ar",
    lastVisit: "05 Nov 2026",
    historicalServices: 9,
    budgetApproved: true,
    stageIndex: 4, // Control Final (92%)
    activeComponent: "Kit Distribución y Service 50k",
    estimatedDelivery: "Hoy 18:00 hs",
    photoUrl:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=85",
    photoCaption: "Control final de tensión de correa e inyección",
    parts: [
      {
        id: "h1",
        description: "Kit Distribución Original Toyota",
        category: "Repuesto",
        quantity: 1,
        unit: "u.",
        unitPrice: 245000,
        status: "Instalado",
      },
      {
        id: "h2",
        description: "Aceite Sintético 5W-30 + Filtros",
        category: "Repuesto",
        quantity: 8,
        unit: "L",
        unitPrice: 14000,
        status: "Instalado",
      },
      {
        id: "h3",
        description: "Mano de Obra Especializada 4x4",
        category: "Mano de Obra",
        quantity: 4,
        unit: "hrs",
        unitPrice: 30000,
        status: "Instalado",
      },
    ],
    timeline: [
      {
        id: "ht1",
        time: "15:10 hs",
        actor: "Carlos García",
        text: "Control Final — Prueba dinámica en ruta aprobada",
        completed: true,
      },
      {
        id: "ht2",
        time: "11:45 hs",
        actor: "Carlos García",
        text: "Instalación de Kit de Distribución Original y tensores hidráulicos",
        completed: true,
      },
      {
        id: "ht3",
        time: "08:00 hs",
        actor: "Recepción Taller",
        text: "Vehículo ingresado en Bahía 03 y etiqueta BoxBox QR emitida",
        completed: false,
      },
    ],
    serviceHistory: [
      {
        id: "hh-1",
        date: "05 Nov 2026",
        orderNumber: "#OT-2026-112 (Control Final)",
        mileage: "50.200 km",
        serviceTitle: "Kit de Distribución Original + Service 50.000 km 4x4",
        diagnosisSummary:
          "Instalación de Kit de Distribución genuino Toyota, cambio de 8L de aceite sintético DPF 5W-30 y filtros de gasoil.",
        installedParts: [
          "Kit Distribución Original Toyota",
          "Aceite Sintético 5W-30 DPF (8L)",
          "Filtro Combustible Primario y Secundario",
        ],
        mechanic: "Carlos García (Jefe de Taller)",
        totalBilled: 477000,
        warrantyLabel: "Garantía Oficial BoxBox · 24 Meses / 50.000 km",
        isCurrentOrder: true,
      },
      {
        id: "hh-2",
        date: "19 Jun 2026",
        orderNumber: "#OT-2026-052",
        mileage: "40.050 km",
        serviceTitle: "Service Pesado 40.000 km + Aceite de Diferenciales 4x4",
        diagnosisSummary:
          "Reemplazo de fluido de diferencial delantero y trasero LSD 75W-85, lubricación de crucetas y service de motor.",
        installedParts: [
          "Aceite Diferencial LSD 75W-85 (5L)",
          "Aceite Motor 5W-30 (8L)",
          "Filtro de Aire Heavy Duty",
        ],
        mechanic: "Carlos García",
        totalBilled: 342000,
        warrantyLabel: "Garantía Vigente · Certificada por BoxBox",
      },
      {
        id: "hh-3",
        date: "08 Feb 2026",
        orderNumber: "#OT-2026-019",
        mileage: "30.180 km",
        serviceTitle: "Service 30.000 km + Pastillas Delanteras Heavy Duty",
        diagnosisSummary:
          "Cambio de pastillas de freno para uso rural severo, limpieza de sensores ABS y regeneración de filtro DPF.",
        installedParts: [
          "Pastillas Freno Toyota Original",
          "Kit Filtros Toyota 2.8 TDI",
          "Regeneración Electrónica DPF",
        ],
        mechanic: "Martín Sosa",
        totalBilled: 289000,
        warrantyLabel: "Garantía Vigente · Certificada por BoxBox",
      },
      {
        id: "hh-4",
        date: "12 Sep 2025",
        orderNumber: "#OT-2025-211",
        mileage: "20.040 km",
        serviceTitle: "Service Oficial 20.000 km y Revisión de Suspensión",
        diagnosisSummary:
          "Mantenimiento programado de 20k, torqueado de elásticos traseros y rotación/balanceo de cubiertas All-Terrain.",
        installedParts: [
          "Aceite Sintético 5W-30 (8L)",
          "Filtro Habitáculo Carbón Activo",
          "Balanceo 4 Ruedas",
        ],
        mechanic: "Carlos García",
        totalBilled: 215000,
        warrantyLabel: "Historial Auditado BoxBox QR",
      },
    ],
  },
];

const INITIAL_INVENTORY: InventoryStockItem[] = [
  {
    id: "inv-1",
    sku: "LUK-620-3142",
    name: "Kit Embrague Completo 2.0 Duratec",
    category: "Transmisión",
    stock: 4,
    minStock: 2,
    unit: "u.",
    unitPrice: 180000,
  },
  {
    id: "inv-2",
    sku: "BSH-0986-BB0",
    name: "Juego Pastillas de Freno Cerámicas Bosch",
    category: "Frenos",
    stock: 9,
    minStock: 4,
    unit: "u.",
    unitPrice: 68000,
  },
  {
    id: "inv-3",
    sku: "MOT-5W30-1L",
    name: "Aceite Sintético 5W-30 Norma Dexos2",
    category: "Lubricantes",
    stock: 28,
    minStock: 12,
    unit: "L",
    unitPrice: 14000,
  },
  {
    id: "inv-4",
    sku: "TOY-13568-390",
    name: "Kit Distribución Original Toyota 2.8 TDI",
    category: "Motor",
    stock: 2,
    minStock: 3,
    unit: "u.",
    unitPrice: 245000,
  },
  {
    id: "inv-5",
    sku: "VAL-75W90-GL4",
    name: "Aceite Transmisión Sintético 75W-90",
    category: "Transmisión",
    stock: 14,
    minStock: 6,
    unit: "L",
    unitPrice: 15000,
  },
  {
    id: "inv-6",
    sku: "MAN-W712-95",
    name: "Filtro de Aceite y Aire Pack Service",
    category: "Filtros",
    stock: 3,
    minStock: 5,
    unit: "u.",
    unitPrice: 32000,
  },
];

// Format currency in Argentine Peso format ($180.000)
export function formatARS(amount: number): string {
  return "$" + Math.round(amount).toLocaleString("es-AR");
}

// Convert license plate "AE 123 CD" -> "AE-123-CD"
export function plateToSlug(plate: string): string {
  return plate.trim().replace(/\s+/g, "-");
}

// Normalize any URL param ("AE-123-CD", "ae%20123%20cd", "ae123cd") and find matching vehicle
export function findVehicleByPlateParam(
  rawParam: string,
  list: VehicleOrder[] = INITIAL_VEHICLES
): VehicleOrder {
  const decoded = decodeURIComponent(rawParam || "").trim();
  const normalizedTarget = decoded.replace(/[-_\s]+/g, "").toUpperCase();

  const found = list.find(
    (v) =>
      v.plate.replace(/[-_\s]+/g, "").toUpperCase() === normalizedTarget ||
      v.id.toUpperCase() === decoded.toUpperCase()
  );

  if (found) return found;

  // Fallback dynamic vehicle if user navigates to any custom license plate URL
  const formattedPlate = decoded.replace(/[-_]+/g, " ").toUpperCase() || "AE 123 CD";
  return {
    ...list[0],
    id: `custom-${normalizedTarget.toLowerCase()}`,
    plate: formattedPlate,
    name: `${list[0].model} (${formattedPlate})`,
  };
}

export interface QrImageSettings {
  src: string;
  width: number;
  height: number;
  excavate?: boolean;
}

// Dynamic QR Code SVG component encoding URL value with center logo excavation (imageSettings)
export function RealisticQrCode({
  value,
  seed,
  size = 96,
  sizeClass = "w-20 h-20",
  imageSettings = {
    src: "/SVG_redondo.svg",
    width: 28,
    height: 28,
    excavate: true,
  },
}: {
  value?: string;
  seed?: string;
  size?: number;
  sizeClass?: string;
  imageSettings?: QrImageSettings;
}) {
  const encodedValue = value || seed || "https://boxbox.app";
  const gridSize = 29;
  const matrix: boolean[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );
  const reserved: boolean[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );

  const placeFinderPattern = (rowOffset: number, colOffset: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = rowOffset + r;
        const cc = colOffset + c;
        if (rr >= 0 && rr < gridSize && cc >= 0 && cc < gridSize) {
          reserved[rr][cc] = true;
          if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
            const isOuterRing = r === 0 || r === 6 || c === 0 || c === 6;
            const isInnerCore = r >= 2 && r <= 4 && c >= 2 && c <= 4;
            matrix[rr][cc] = isOuterRing || isInnerCore;
          } else {
            matrix[rr][cc] = false;
          }
        }
      }
    }
  };

  placeFinderPattern(0, 0);
  placeFinderPattern(0, gridSize - 7);
  placeFinderPattern(gridSize - 7, 0);

  // Version 3 alignment pattern at (20, 20)
  for (let r = 18; r <= 22; r++) {
    for (let c = 18; c <= 22; c++) {
      reserved[r][c] = true;
      const isBorder = r === 18 || r === 22 || c === 18 || c === 22;
      const isCenter = r === 20 && c === 20;
      matrix[r][c] = isBorder || isCenter;
    }
  }

  // Timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    reserved[6][i] = true;
    reserved[i][6] = true;
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Deterministic URL encoding into QR modules
  let hash = 2166136261;
  for (let i = 0; i < encodedValue.length; i++) {
    hash ^= encodedValue.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!reserved[r][c]) {
        const charCode =
          encodedValue.charCodeAt((r * gridSize + c) % encodedValue.length) || 65;
        const mix = Math.abs(
          Math.imul(r + 11, 374761393) ^
            Math.imul(c + 23, 668265263) ^
            Math.imul(charCode, 2654435761) ^
            hash
        );
        matrix[r][c] = mix % 11 < 5;
      }
    }
  }

  // Excavate center modules when imageSettings.excavate is enabled
  const logoRatioW = imageSettings
    ? Math.min(0.36, Math.max(0.22, imageSettings.width / size))
    : 0;
  const logoRatioH = imageSettings
    ? Math.min(0.36, Math.max(0.22, imageSettings.height / size))
    : 0;
  const logoGridW = Math.ceil(gridSize * logoRatioW);
  const logoGridH = Math.ceil(gridSize * logoRatioH);
  const logoStartX = (gridSize - logoGridW) / 2;
  const logoStartY = (gridSize - logoGridH) / 2;

  if (imageSettings?.excavate) {
    const startR = Math.floor(logoStartY);
    const endR = Math.ceil(logoStartY + logoGridH) - 1;
    const startC = Math.floor(logoStartX);
    const endC = Math.ceil(logoStartX + logoGridW) - 1;
    for (let r = startR; r <= endR; r++) {
      for (let c = startC; c <= endC; c++) {
        if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
          matrix[r][c] = false;
        }
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${gridSize} ${gridSize}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={`${sizeClass} bg-white p-1.5 rounded-xl border border-[#E2E8F0] shadow-2xs shrink-0`}
      aria-label={`Código QR dinámico: ${encodedValue}`}
      role="img"
    >
      <title>{encodedValue}</title>
      {matrix.map((row, rIdx) =>
        row.map((filled, cIdx) =>
          filled ? (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx}
              y={rIdx}
              width={1}
              height={1}
              fill="#0F172A"
            />
          ) : null
        )
      )}
      {imageSettings && (
        <g>
          <rect
            x={logoStartX - 0.35}
            y={logoStartY - 0.35}
            width={logoGridW + 0.7}
            height={logoGridH + 0.7}
            rx={1.2}
            fill="#FFFFFF"
          />
          <image
            href={imageSettings.src}
            x={logoStartX}
            y={logoStartY}
            width={logoGridW}
            height={logoGridH}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      )}
    </svg>
  );
}

// Chapa Patente Estilo Mercosur Argentino
export function MercosurPlateBadge({
  plate,
  size = "md",
}: {
  plate: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={`inline-flex flex-col overflow-hidden rounded-md border-2 border-[#CBD5E1] bg-white shadow-2xs shrink-0 select-none ${
        size === "sm" ? "min-w-[98px]" : "min-w-[122px]"
      }`}
    >
      <div className="bg-[#1D4ED8] px-2 py-[2px] flex items-center justify-between gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
        <span className="text-[6.5px] font-bold tracking-[0.14em] text-white uppercase leading-none">
          REPÚBLICA ARGENTINA
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
      </div>
      <div
        className={`text-center font-mono font-black tracking-[0.16em] text-[#0F172A] bg-white ${
          size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
        }`}
      >
        {plate}
      </div>
    </div>
  );
}

export default function MecaniQDashboard() {
  // Navigation & Responsive Mobile Menu states
  const [activeTab, setActiveTab] = useState<NavigationTab>("Órdenes de Trabajo");
  const [isBaysMenuOpen, setIsBaysMenuOpen] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [vehicles, setVehicles] = useState<VehicleOrder[]>(INITIAL_VEHICLES);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    INITIAL_VEHICLES[0].id
  );
  const [inventory, setInventory] =
    useState<InventoryStockItem[]>(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Exclusive Accordion state (1: Estado & Telemetría, 2: Presupuesto, 3: Repuestos, 4: Bitácora)
  const [openAccordion, setOpenAccordion] = useState<AccordionId>(1);

  // Slide-over / Dockable Mobile Simulator Drawer states
  const [isClientDrawerOpen, setIsClientDrawerOpen] = useState<boolean>(false);
  const [isDrawerPinned, setIsDrawerPinned] = useState<boolean>(true);
  const [showBudgetInPhone, setShowBudgetInPhone] = useState<boolean>(false);
  const [phoneSimulatorTab, setPhoneSimulatorTab] = useState<
    "vivo" | "historial"
  >("vivo");

  // Client Directory & Clinical History states
  const [clientDirectoryQuery, setClientDirectoryQuery] = useState<string>("");
  const [showAddHistoryForm, setShowAddHistoryForm] = useState<boolean>(false);
  const [histMileage, setHistMileage] = useState<string>("");
  const [histTitle, setHistTitle] = useState<string>("");
  const [histParts, setHistParts] = useState<string>("");
  const [histCost, setHistCost] = useState<string>("");

  // Modals & Popovers
  const [showQrStickerModal, setShowQrStickerModal] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // New part inline form state (inside Accordion 3)
  const [newDesc, setNewDesc] = useState<string>("");
  const [newCategory, setNewCategory] = useState<"Repuesto" | "Mano de Obra">(
    "Repuesto"
  );
  const [newQty, setNewQty] = useState<string>("1");
  const [newUnit, setNewUnit] = useState<string>("u.");
  const [newPrice, setNewPrice] = useState<string>("");

  // New mechanic note input state (inside Accordion 4)
  const [mechanicNoteInput, setMechanicNoteInput] = useState<string>("");

  // Toast state
  const [toast, setToast] = useState<{
    title: string;
    subtitle?: string;
    type: "success" | "info" | "whatsapp";
  } | null>(null);

  const triggerToast = (
    title: string,
    subtitle?: string,
    type: "success" | "info" | "whatsapp" = "success"
  ) => {
    setToast({ title, subtitle, type });
    setTimeout(() => {
      setToast((prev) => (prev?.title === title ? null : prev));
    }, 4000);
  };

  // Active vehicle & stage
  const activeVehicle = useMemo(
    () =>
      vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0],
    [vehicles, selectedVehicleId]
  );

  const currentStage = STAGES[activeVehicle.stageIndex];

  // Dynamic origin for QR URL generation
  const [origin, setOrigin] = useState<string>("https://boxbox.app");
  const [hasLoadedStorage, setHasLoadedStorage] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location?.origin) {
        setOrigin(window.location.origin);
      }
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY_VEHICLES);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setVehicles(parsed);
          }
        }
      } catch {
        // Ignore storage read errors
      }
      setHasLoadedStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY_VEHICLES,
        JSON.stringify(vehicles)
      );
    } catch {
      // Ignore storage write errors
    }
  }, [vehicles, hasLoadedStorage]);

  const activePlateSlug = useMemo(
    () => plateToSlug(activeVehicle.plate),
    [activeVehicle.plate]
  );
  const activeClientPath = `/client/${activePlateSlug}`;
  const dynamicClientUrl = `${origin}${activeClientPath}`;
  const activeClientHistoryPath = `/client/${activePlateSlug}?view=historial`;
  const dynamicClientHistoryUrl = `${origin}${activeClientHistoryPath}`;

  // Filtered Clients Directory for "Clientes" Master-Detail view
  const filteredClientDirectory = useMemo(() => {
    if (!clientDirectoryQuery.trim()) return vehicles;
    const q = clientDirectoryQuery.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.ownerName.toLowerCase().includes(q) ||
        (v.ownerDni || "").toLowerCase().includes(q) ||
        v.phone.toLowerCase().includes(q) ||
        v.plate.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        (v.fleetPlates || []).some((fp) => fp.label.toLowerCase().includes(q))
    );
  }, [vehicles, clientDirectoryQuery]);

  const handleCopyHistoryUrl = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(dynamicClientHistoryUrl).catch(() => {});
    }
    triggerToast(
      "Link de Historial Clínico copiado",
      dynamicClientHistoryUrl,
      "info"
    );
  };

  const handleAddHistoricalService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!histTitle.trim()) return;
    const costNum = Math.max(0, Number(histCost) || 95000);
    const partsArr = histParts
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newRecord: HistoricalServiceRecord = {
      id: `hist-${Date.now()}`,
      date: "05 Nov 2026",
      orderNumber: `#OT-2026-${Math.floor(120 + Math.random() * 80)}`,
      mileage: histMileage.trim() || activeVehicle.mileage,
      serviceTitle: histTitle.trim(),
      diagnosisSummary:
        "Mantenimiento preventivo y control clínico certificado en estación BoxBox PRO.",
      installedParts:
        partsArr.length > 0
          ? partsArr
          : ["Inspección Multimarca BoxBox", "Insumos Certificados"],
      mechanic: "Carlos García (Jefe de Taller)",
      totalBilled: costNum,
      warrantyLabel: "Garantía Vigente · Certificada por BoxBox",
    };

    setVehicles((prev) =>
      prev.map((v) =>
        v.id === activeVehicle.id
          ? {
              ...v,
              historicalServices: v.historicalServices + 1,
              serviceHistory: [newRecord, ...(v.serviceHistory || [])],
            }
          : v
      )
    );

    setHistMileage("");
    setHistTitle("");
    setHistParts("");
    setHistCost("");
    setShowAddHistoryForm(false);
    triggerToast(
      "Mantenimiento histórico registrado",
      `${newRecord.serviceTitle} (${newRecord.mileage}) incorporado al Pasaporte QR.`,
      "success"
    );
  };

  // Financial breakdown calculations
  const financialSummary = useMemo(() => {
    let partsSubtotal = 0;
    let laborSubtotal = 0;
    let installedCount = 0;
    let inProgressCount = 0;

    activeVehicle.parts.forEach((item) => {
      const lineTotal = item.quantity * item.unitPrice;
      if (
        item.category === "Mano de Obra" ||
        item.description.toLowerCase().includes("mano de obra") ||
        item.unit === "hrs" ||
        item.unit === "srv"
      ) {
        laborSubtotal += lineTotal;
      } else {
        partsSubtotal += lineTotal;
      }
      if (item.status === "Instalado") installedCount++;
      else inProgressCount++;
    });

    const total = partsSubtotal + laborSubtotal;
    return {
      partsSubtotal,
      laborSubtotal,
      total,
      installedCount,
      inProgressCount,
    };
  }, [activeVehicle.parts]);

  const totalBudget = financialSummary.total;

  // Global search results
  const matchingVehicles = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.plate.toLowerCase().includes(q) ||
        v.ownerName.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.orderNumber.toLowerCase().includes(q)
    );
  }, [vehicles, searchQuery]);

  // Handler: Change Stage in Stepper
  const handleStageChange = (newStageIdx: StageIndex) => {
    const stageObj = STAGES[newStageIdx];
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5) + " hs";

    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== activeVehicle.id) return v;
        const newEvent: TimelineEvent = {
          id: `ev-${Date.now()}`,
          time: timeStr,
          actor: "Carlos García",
          text: `Actualizó estado a ${stageObj.label} (${stageObj.percentage}%) — ${v.activeComponent}`,
          completed: true,
        };
        return {
          ...v,
          stageIndex: newStageIdx,
          timeline: [newEvent, ...v.timeline],
        };
      })
    );

    triggerToast(
      `Estado actualizado a "${stageObj.label}" (${stageObj.percentage}%)`,
      `Bitácora de ${activeVehicle.model} (${activeVehicle.plate}) y Vista Cliente QR sincronizadas.`,
      "info"
    );
  };

  // Handler: Toggle Budget Approval
  const handleToggleBudgetApproval = () => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === activeVehicle.id
          ? { ...v, budgetApproved: !v.budgetApproved }
          : v
      )
    );
    triggerToast(
      !activeVehicle.budgetApproved
        ? "Presupuesto marcado como Aprobado por el Cliente"
        : "Presupuesto cambiado a Pendiente de Aprobación",
      `Orden ${activeVehicle.orderNumber} · Total ${formatARS(totalBudget)}`,
      "info"
    );
  };

  // Handler: Toggle Part Status ("Instalado" <-> "En progreso")
  const handleTogglePartStatus = (partId: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== activeVehicle.id) return v;
        return {
          ...v,
          parts: v.parts.map((p) =>
            p.id === partId
              ? {
                  ...p,
                  status:
                    p.status === "Instalado" ? "En progreso" : "Instalado",
                }
              : p
          ),
        };
      })
    );
  };

  // Handler: Delete Part
  const handleDeletePart = (partId: string) => {
    const target = activeVehicle.parts.find((p) => p.id === partId);
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== activeVehicle.id) return v;
        return {
          ...v,
          parts: v.parts.filter((p) => p.id !== partId),
        };
      })
    );
    if (target) {
      triggerToast(
        `Ítem eliminado: ${target.description}`,
        "Presupuesto recalculado en tiempo real.",
        "info"
      );
    }
  };

  // Handler: Add New Part / Service inline
  const handleAddPartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Math.max(1, Number(newQty) || 1);
    const price = Math.max(0, Number(newPrice.replace(/\./g, "")) || 0);
    if (!newDesc.trim() || price <= 0) return;

    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5) + " hs";

    const createdPart: PartItem = {
      id: `part-${Date.now()}`,
      description: newDesc.trim(),
      category: newCategory,
      quantity: qty,
      unit: newUnit,
      unitPrice: price,
      status: "En progreso",
    };

    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== activeVehicle.id) return v;
        const newEvent: TimelineEvent = {
          id: `ev-${Date.now()}`,
          time: timeStr,
          actor: "Carlos García",
          text: `Agregó ${newCategory.toLowerCase()}: ${
            createdPart.description
          } (${formatARS(qty * price)})`,
          completed: true,
        };
        return {
          ...v,
          parts: [...v.parts, createdPart],
          timeline: [newEvent, ...v.timeline],
        };
      })
    );

    setNewDesc("");
    setNewQty("1");
    setNewPrice("");

    triggerToast(
      `Ítem agregado: ${createdPart.description}`,
      `Total actualizado en vivo: ${formatARS(totalBudget + qty * price)}`,
      "success"
    );
  };

  // Handler: Assign item from Inventory directly to Active Order
  const handleAssignFromInventory = (invItem: InventoryStockItem) => {
    if (invItem.stock <= 0) return;
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5) + " hs";

    setInventory((prev) =>
      prev.map((item) =>
        item.id === invItem.id ? { ...item, stock: item.stock - 1 } : item
      )
    );

    const createdPart: PartItem = {
      id: `part-inv-${Date.now()}`,
      description: invItem.name,
      category: "Repuesto",
      quantity: 1,
      unit: invItem.unit,
      unitPrice: invItem.unitPrice,
      status: "Instalado",
    };

    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== activeVehicle.id) return v;
        const newEvent: TimelineEvent = {
          id: `ev-${Date.now()}`,
          time: timeStr,
          actor: "Pañol BoxBox",
          text: `Asignó desde stock: ${invItem.name} (${invItem.sku})`,
          completed: true,
        };
        return {
          ...v,
          parts: [...v.parts, createdPart],
          timeline: [newEvent, ...v.timeline],
        };
      })
    );

    triggerToast(
      `Repuesto asignado a ${activeVehicle.model} (${activeVehicle.plate})`,
      `${invItem.name} sumado a la orden ${activeVehicle.orderNumber}.`,
      "success"
    );
  };

  // Handler: Add Mechanic Note in Accordion 4
  const handleAddMechanicNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mechanicNoteInput.trim()) return;
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5) + " hs";

    const newEvent: TimelineEvent = {
      id: `note-${Date.now()}`,
      time: timeStr,
      actor: "Carlos García",
      text: mechanicNoteInput.trim(),
      completed: true,
    };

    setVehicles((prev) =>
      prev.map((v) =>
        v.id === activeVehicle.id
          ? { ...v, timeline: [newEvent, ...v.timeline] }
          : v
      )
    );

    setMechanicNoteInput("");
    triggerToast(
      "Observación técnica registrada en Bitácora",
      "Disponible en el historial trazable del vehículo.",
      "success"
    );
  };

  // Handler: Copy tracking link
  const handleCopyLink = () => {
    const url = dynamicClientUrl;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    triggerToast("Link de seguimiento BoxBox QR copiado", url, "success");
  };

  // Handler: WhatsApp notification
  const handleWhatsAppNotify = () => {
    triggerToast(
      `WhatsApp enviado a ${activeVehicle.ownerName} (${activeVehicle.phone})`,
      `"¡Hola ${
        activeVehicle.ownerName.split(" ")[0]
      }! Tu ${activeVehicle.model} (${activeVehicle.plate}) está en etapa: ${
        currentStage.label
      } (${currentStage.percentage}%). Seguimiento en vivo: ${dynamicClientUrl}"`,
      "whatsapp"
    );
  };

  const latestEvent = activeVehicle.timeline[0];

  return (
    /* ================= 1. CONTENEDOR RAÍZ RESPONSIVO (MOBILE SCROLL / DESKTOP ZERO-SCROLL 100VH) ================= */
    <div className="min-h-screen lg:h-screen w-full lg:overflow-hidden flex flex-col lg:flex-row bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#EFF6FF] selection:text-[#1D4ED8]">
      {/* ================= BARRA SUPERIOR MÓVIL (MOBILE TOPBAR < LG) ================= */}
      <div className="flex lg:hidden items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-40 shrink-0">
        <div className="flex items-center gap-2.5">
          <img
            src="/SVG_redondo.svg"
            alt="Isotipo Oficial BoxBox"
            className="w-10 h-10 rounded-lg object-contain p-0 shrink-0"
          />
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-[#0F172A]">
                Box<span className="text-[#2563EB]">Box</span>
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                PRO
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-500">
              {activeVehicle.bayNumber} · {activeVehicle.plate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsClientDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-2xs cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Vista Cliente QR</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#EFF6FF] cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* BACKDROP OSCURO TRASLÚCIDO PARA DRAWER MÓVIL DEL SIDEBAR */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 backdrop-blur-sm bg-slate-900/40 lg:hidden transition-opacity"
        />
      )}

      {/* ================= 2. SIDEBAR IZQUIERDO RESPONSIVO (DRAWER EN MÓVIL / FIJO EN DESKTOP) ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 bg-white border-r border-[#E2E8F0] shadow-2xl transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:shadow-none flex flex-col lg:h-full justify-between overflow-hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col min-h-0 flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="px-4 py-3.5 flex items-center justify-between border-b border-[#E2E8F0] shrink-0">
            <div className="flex items-center gap-3">
              <img
                src="/SVG_redondo.svg"
                alt="Isotipo Oficial BoxBox"
                className="w-14 h-14 rounded-xl object-contain p-0 shrink-0"
              />
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-[#0F172A]">
                    Box<span className="text-[#2563EB]">Box</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200/80">
                    PRO
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  GESTIÓN &amp; TRAZABILIDAD QR
                </p>
              </div>
            </div>

            {/* Close button inside mobile drawer */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Cerrar menú"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Menu + Collapsible Bays Sub-Menu (Tree-View) */}
          <div className="p-3 space-y-1">
            <p className="px-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Estación Operativa
            </p>

            {/* Primary Item: Órdenes de Trabajo + Tree-View Toggle */}
            <div>
              <button
                type="button"
                onClick={() => {
                  if (activeTab === "Órdenes de Trabajo") {
                    setIsBaysMenuOpen((prev) => !prev);
                  } else {
                    setActiveTab("Órdenes de Trabajo");
                    setIsBaysMenuOpen(true);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  activeTab === "Órdenes de Trabajo"
                    ? "bg-[#EFF6FF] text-[#1D4ED8] shadow-2xs ring-1 ring-[#2563EB]/20"
                    : "text-slate-600 hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      activeTab === "Órdenes de Trabajo"
                        ? "bg-[#2563EB] text-white"
                        : "bg-[#F8FAFC] text-slate-500 border border-[#E2E8F0]"
                    }`}
                  >
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#0F172A] whitespace-nowrap">
                    Órdenes de Trabajo
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white text-[#1D4ED8] border border-blue-200">
                    {vehicles.length}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isBaysMenuOpen ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </div>
              </button>

              {/* Tree-View Sub-Menu: Bahías / Órdenes Activas */}
              {isBaysMenuOpen && (
                <div className="mt-1.5 ml-3.5 pl-3 border-l-2 border-[#E2E8F0] space-y-1">
                  {vehicles.map((v) => {
                    const isSelected =
                      v.id === activeVehicle.id &&
                      activeTab === "Órdenes de Trabajo";
                    const st = STAGES[v.stageIndex];
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setSelectedVehicleId(v.id);
                          setActiveTab("Órdenes de Trabajo");
                          setShowBudgetInPhone(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1 ${
                          isSelected
                            ? "bg-[#EFF6FF]/90 border border-[#2563EB]/40 shadow-2xs"
                            : "hover:bg-[#F8FAFC] border border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                isSelected
                                  ? "bg-[#2563EB] ring-2 ring-blue-200"
                                  : "bg-slate-300"
                              }`}
                            />
                            <span
                              className={`text-xs truncate ${
                                isSelected
                                  ? "font-extrabold text-[#0F172A]"
                                  : "font-semibold text-slate-600"
                              }`}
                            >
                              {v.bayNumber} · {v.model}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pl-4">
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-[#0F172A] border border-[#CBD5E1]">
                            {v.plate}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                              isSelected
                                ? "bg-[#2563EB] text-white"
                                : "bg-slate-100 text-[#1D4ED8]"
                            }`}
                          >
                            {st.percentage}%
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other Functional Sidebar Tabs */}
            <div className="pt-2 space-y-1">
              <p className="px-2.5 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Gestión General
              </p>
              {(
                [
                  {
                    name: "Dashboard" as NavigationTab,
                    icon: LayoutDashboard,
                    badge: "KPIs",
                  },
                  {
                    name: "Inventario" as NavigationTab,
                    icon: Package,
                    badge: "Pañol",
                  },
                  {
                    name: "Clientes" as NavigationTab,
                    icon: Users,
                    badge: "3",
                  },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#EFF6FF] text-[#1D4ED8] shadow-2xs ring-1 ring-[#2563EB]/20"
                        : "text-slate-600 hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-[#2563EB] text-white"
                            : "bg-[#F8FAFC] text-slate-500 border border-[#E2E8F0]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-xs ${
                          isActive
                            ? "font-bold text-[#0F172A]"
                            : "font-semibold"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white text-[#1D4ED8] border border-blue-200"
                          : "bg-[#F8FAFC] text-slate-500 border border-[#E2E8F0]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mechanic Profile Footer */}
        <div className="p-3.5 border-t border-[#E2E8F0] bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                CG
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-2 ring-white"
                title="En turno"
              />
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-xs font-bold text-[#0F172A] truncate">
                Carlos García
              </p>
              <p className="text-[11px] text-slate-500 font-medium truncate">
                Mecánico Jefe · Taller Central
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= 3. ÁREA PRINCIPAL (RESPONSIVE SCROLL EN MÓVIL / ZERO-SCROLL EN DESKTOP) ================= */}
      <div className="flex-1 flex flex-col lg:h-full min-w-0 lg:overflow-hidden">
        {/* 1. HEADER SUPERIOR COMPACTO EN UNA SOLA FILA HORIZONTAL */}
        <header className="bg-white px-4 lg:px-5 py-2 flex items-center justify-between gap-4 border-b border-[#E2E8F0] shrink-0 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-extrabold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-blue-200/80 shrink-0">
              {activeTab}
            </span>
            <span className="text-slate-300 hidden md:inline">/</span>
            <h1 className="text-xs sm:text-sm font-extrabold text-[#0F172A] tracking-tight truncate hidden md:block">
              Gestión de Reparaciones
            </h1>
            <button
              type="button"
              onClick={() => {
                setActiveTab("Órdenes de Trabajo");
                setOpenAccordion(1);
              }}
              title="Ver Ficha Técnica y QR del vehículo activo"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0F172A] bg-[#F8FAFC] hover:bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#E2E8F0] hover:border-blue-200 transition-colors cursor-pointer shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span>{activeVehicle.bayNumber}</span>
              <span className="text-slate-300">·</span>
              <span className="font-mono font-extrabold text-[#1D4ED8]">
                {activeVehicle.plate}
              </span>
              <span className="text-slate-300 hidden lg:inline">·</span>
              <span className="text-slate-600 hidden lg:inline">
                {activeVehicle.model}
              </span>
            </button>
          </div>

          {/* Search & Quick Header Icons in the Same Single Row */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative w-44 sm:w-60 lg:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar patente, cliente u orden..."
                className="w-full pl-8 pr-7 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {searchQuery.trim() !== "" && matchingVehicles.length > 0 && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-1.5 z-50">
                  {matchingVehicles.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVehicleId(v.id);
                        setActiveTab("Órdenes de Trabajo");
                        setSearchQuery("");
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-[#EFF6FF] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">
                          {v.model} ({v.plate})
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {v.ownerName} · {v.orderNumber}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8]">
                        {STAGES[v.stageIndex].label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowHelpModal(true)}
              className="p-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-slate-600 hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer shrink-0"
              title="Guía de estación BoxBox PRO"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <div className="relative shrink-0">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="p-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-slate-600 hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors relative cursor-pointer"
                title="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-white" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A]">
                      Notificaciones en Vivo
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-[#EFF6FF] border border-blue-200/70">
                      <p className="font-bold text-[#0F172A]">
                        {activeVehicle.ownerName} consultó BoxBox QR
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Sincronización activa para {activeVehicle.plate}.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* WORKSPACE AREA + OPTIONAL DOCKED CLIENT SIMULATOR */}
        <div className="flex-1 flex flex-col lg:flex-row lg:min-h-0 min-w-0 lg:overflow-hidden relative">
          {/* MAIN VIEWPORT */}
          <main className="flex-1 flex flex-col lg:h-full lg:min-h-0 min-w-0 p-3 sm:p-4 gap-2.5 lg:overflow-hidden">
            {/* =====================================================================
                VISTA 1: ÓRDENES DE TRABAJO (5 PESTAÑAS ESTILO NAVEGADOR ZERO-SCROLL)
               ===================================================================== */}
            {activeTab === "Órdenes de Trabajo" && (
              <section className="flex-1 min-h-0 flex flex-col gap-2.5 lg:overflow-hidden">
                {/* BARRA DE 5 PESTAÑAS ESTILO NAVEGADOR CON REBORDE SUPERIOR AZUL/CELESTE */}
                <div
                  role="tablist"
                  aria-label="Secciones de la Orden de Trabajo"
                  className="bg-slate-200/60 p-1.5 rounded-2xl border border-slate-200/90 flex items-stretch gap-1.5 overflow-x-auto flex-nowrap shrink-0"
                >
                  {/* Tab 1: 1. Ficha Técnica & QR */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={openAccordion === 1}
                    onClick={() => setOpenAccordion(1)}
                    className={`flex-1 min-w-max px-3.5 py-2 rounded-t-xl rounded-b-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                      openAccordion === 1
                        ? "bg-white text-blue-700 font-bold shadow-sm border-x border-b border-slate-200/90 border-t-4 border-t-blue-600"
                        : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 font-semibold hover:text-[#0F172A] border-x border-b border-slate-200/60 border-t-2 border-t-sky-300/60 hover:border-t-sky-400"
                    }`}
                  >
                    <QrCode
                      className={`w-3.5 h-3.5 shrink-0 ${
                        openAccordion === 1
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    />
                    <span>1. Ficha Técnica &amp; QR</span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        openAccordion === 1
                          ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                          : "bg-white/80 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {activeVehicle.plate}
                    </span>
                  </button>

                  {/* Tab 2: 2. Estado & Telemetría */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={openAccordion === 2}
                    onClick={() => setOpenAccordion(2)}
                    className={`flex-1 min-w-max px-3.5 py-2 rounded-t-xl rounded-b-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                      openAccordion === 2
                        ? "bg-white text-blue-700 font-bold shadow-sm border-x border-b border-slate-200/90 border-t-4 border-t-blue-600"
                        : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 font-semibold hover:text-[#0F172A] border-x border-b border-slate-200/60 border-t-2 border-t-sky-300/60 hover:border-t-sky-400"
                    }`}
                  >
                    <Activity
                      className={`w-3.5 h-3.5 shrink-0 ${
                        openAccordion === 2
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    />
                    <span>2. Estado &amp; Telemetría</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        openAccordion === 2
                          ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                          : "bg-white/80 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {currentStage.label} · {currentStage.percentage}%
                    </span>
                  </button>

                  {/* Tab 3: 3. Presupuesto y Costos */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={openAccordion === 3}
                    onClick={() => setOpenAccordion(3)}
                    className={`flex-1 min-w-max px-3.5 py-2 rounded-t-xl rounded-b-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                      openAccordion === 3
                        ? "bg-white text-blue-700 font-bold shadow-sm border-x border-b border-slate-200/90 border-t-4 border-t-blue-600"
                        : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 font-semibold hover:text-[#0F172A] border-x border-b border-slate-200/60 border-t-2 border-t-sky-300/60 hover:border-t-sky-400"
                    }`}
                  >
                    <DollarSign
                      className={`w-3.5 h-3.5 shrink-0 ${
                        openAccordion === 3
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    />
                    <span>3. Presupuesto y Costos</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        openAccordion === 3
                          ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                          : "bg-white/80 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {formatARS(totalBudget)}
                    </span>
                  </button>

                  {/* Tab 4: 4. Inventario y Repuestos */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={openAccordion === 4}
                    onClick={() => setOpenAccordion(4)}
                    className={`flex-1 min-w-max px-3.5 py-2 rounded-t-xl rounded-b-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                      openAccordion === 4
                        ? "bg-white text-blue-700 font-bold shadow-sm border-x border-b border-slate-200/90 border-t-4 border-t-blue-600"
                        : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 font-semibold hover:text-[#0F172A] border-x border-b border-slate-200/60 border-t-2 border-t-sky-300/60 hover:border-t-sky-400"
                    }`}
                  >
                    <Package
                      className={`w-3.5 h-3.5 shrink-0 ${
                        openAccordion === 4
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    />
                    <span>4. Inventario y Repuestos</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        openAccordion === 4
                          ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                          : "bg-white/80 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {activeVehicle.parts.length} ítems
                    </span>
                  </button>

                  {/* Tab 5: 5. Bitácora del Mecánico */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={openAccordion === 5}
                    onClick={() => setOpenAccordion(5)}
                    className={`flex-1 min-w-max px-3.5 py-2 rounded-t-xl rounded-b-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                      openAccordion === 5
                        ? "bg-white text-blue-700 font-bold shadow-sm border-x border-b border-slate-200/90 border-t-4 border-t-blue-600"
                        : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 font-semibold hover:text-[#0F172A] border-x border-b border-slate-200/60 border-t-2 border-t-sky-300/60 hover:border-t-sky-400"
                    }`}
                  >
                    <FileText
                      className={`w-3.5 h-3.5 shrink-0 ${
                        openAccordion === 5
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    />
                    <span>5. Bitácora del Mecánico</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        openAccordion === 5
                          ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                          : "bg-white/80 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {latestEvent?.time || "Reciente"}
                    </span>
                  </button>
                </div>

                {/* ================= PANEL DINÁMICO ACTIVO (FLEX-1 MIN-H-0 SIN SCROLL INTERNO EN DESKTOP) ================= */}
                <div className="flex-1 min-h-0 flex flex-col bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
                  {/* ================= TAB 1: 1. FICHA TÉCNICA, CLIENTE & TRAZABILIDAD QR ================= */}
                  {openAccordion === 1 && (
                    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-5 lg:overflow-hidden">
                      {/* Columna Izquierda (7 cols en lg): Identidad del Vehículo + Datos del Propietario */}
                      <div className="lg:col-span-7 flex flex-col justify-between gap-3.5 min-h-0">
                        {/* Tarjeta 1A: Identidad del Vehículo y Especificaciones Técnicas */}
                        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between gap-3.5 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3.5 min-w-0">
                              <MercosurPlateBadge plate={activeVehicle.plate} />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                                    {activeVehicle.bayNumber}
                                  </span>
                                  <span className="font-mono text-xs font-extrabold text-slate-600 bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                                    Orden {activeVehicle.orderNumber}
                                  </span>
                                  <span className="text-[11px] font-bold text-slate-500">
                                    Año {activeVehicle.year}
                                  </span>
                                </div>
                                <h2 className="text-lg sm:text-xl font-black text-[#0F172A] tracking-tight truncate mt-1">
                                  {activeVehicle.model}{" "}
                                  <span className="text-[#2563EB]">
                                    {activeVehicle.engineSpec}
                                  </span>
                                </h2>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setOpenAccordion(2)}
                              className="px-3 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer shrink-0"
                            >
                              {currentStage.label} ({currentStage.percentage}%) →
                            </button>
                          </div>

                          {/* 4 Píldoras de Especificaciones Técnicas */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                                <Gauge className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[9px] font-bold uppercase text-slate-400 block leading-none">
                                  Kilometraje
                                </span>
                                <span className="text-xs font-extrabold text-[#0F172A] truncate block mt-1">
                                  {activeVehicle.mileage}
                                </span>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                                <Wrench className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[9px] font-bold uppercase text-slate-400 block leading-none">
                                  Motorización
                                </span>
                                <span className="text-xs font-extrabold text-[#0F172A] truncate block mt-1">
                                  {activeVehicle.engineSpec}
                                </span>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                                <Clock className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[9px] font-bold uppercase text-slate-400 block leading-none">
                                  Ingreso Bahía
                                </span>
                                <span className="text-xs font-extrabold text-[#0F172A] truncate block mt-1">
                                  {activeVehicle.checkInTime}
                                </span>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-[#EFF6FF] border border-blue-200 flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                                <Calendar className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[9px] font-bold uppercase text-[#1D4ED8] block leading-none">
                                  Entrega Estimada
                                </span>
                                <span className="text-xs font-extrabold text-[#1D4ED8] truncate block mt-1">
                                  {activeVehicle.estimatedDelivery}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Resumen de Intervención Activa */}
                          <div className="px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                              <span className="text-slate-500 font-semibold">
                                Componente en intervención:
                              </span>
                              <strong className="text-[#0F172A] font-extrabold">
                                {activeVehicle.activeComponent}
                              </strong>
                            </div>
                            <span className="text-[11px] font-bold text-[#1D4ED8]">
                              Presupuesto: {formatARS(totalBudget)} (
                              {activeVehicle.budgetApproved
                                ? "Aprobado"
                                : "Pendiente"}
                              )
                            </span>
                          </div>
                        </div>

                        {/* Tarjeta 1B: Datos del Propietario / Cliente y Contacto Directo */}
                        <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
                          <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] border border-blue-200 text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0">
                              {activeVehicle.ownerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                  Propietario Titular
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                                  {activeVehicle.historicalServices} servicios previos
                                </span>
                              </div>
                              <h3 className="text-base font-black text-[#0F172A] mt-0.5">
                                {activeVehicle.ownerName}
                              </h3>
                              <p className="text-xs text-slate-500 font-medium">
                                {activeVehicle.phone} · {activeVehicle.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={handleWhatsAppNotify}
                              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>
                            <a
                              href={`tel:${activeVehicle.phone.replace(
                                /[^0-9+]/g,
                                ""
                              )}`}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#1D4ED8] border border-[#E2E8F0] text-xs font-bold transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                              <span>Llamar</span>
                            </a>
                            <a
                              href={`mailto:${activeVehicle.email}`}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#1D4ED8] border border-[#E2E8F0] text-xs font-bold transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                              <span>Email</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Columna Derecha (5 cols en lg): Módulo Destacado de Trazabilidad QR */}
                      <div className="lg:col-span-5 bg-gradient-to-b from-[#EFF6FF]/90 to-[#F8FAFC] border-2 border-blue-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 min-h-0">
                        <div className="flex items-center justify-between gap-2 border-b border-blue-200/70 pb-2.5">
                          <div className="flex items-center gap-2">
                            <QrCode className="w-4 h-4 text-[#2563EB]" />
                            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                              Trazabilidad QR Dinámica
                            </span>
                          </div>
                          <span className="font-mono text-[10px] font-bold bg-white text-[#0F172A] px-2 py-0.5 rounded-md border border-blue-200">
                            {activeVehicle.traceId}
                          </span>
                        </div>

                        {/* QR Code Centered Display */}
                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center gap-4 my-auto py-1">
                          <div
                            onClick={() => setIsClientDrawerOpen(true)}
                            className="cursor-pointer group shrink-0"
                            title={`Abrir Vista del Cliente: ${dynamicClientUrl}`}
                          >
                            <RealisticQrCode
                              value={`${origin}/client/${activeVehicle.plate.replace(/\s+/g, "-")}`}
                              size={116}
                              sizeClass="w-28 h-28"
                              imageSettings={{
                                src: "/SVG_redondo.svg",
                                width: 28,
                                height: 28,
                                excavate: true,
                              }}
                            />
                          </div>

                          <div className="space-y-2 text-center sm:text-left lg:text-center xl:text-left min-w-0">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white text-[#1D4ED8] border border-blue-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                              Sincronizado en Vivo
                            </span>
                            <p className="text-xs font-bold text-[#0F172A] leading-snug">
                              Escaneo directo para seguimiento móvil del cliente
                            </p>
                            <div className="font-mono text-[11px] font-bold bg-white text-[#1D4ED8] px-2.5 py-1 rounded-lg border border-blue-200 truncate">
                              /client/{activePlateSlug}
                            </div>
                          </div>
                        </div>

                        {/* Botones de Acción QR */}
                        <div className="space-y-2 pt-2 border-t border-blue-200/70">
                          <button
                            type="button"
                            onClick={() => setIsClientDrawerOpen(true)}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            <Smartphone className="w-4 h-4 shrink-0" />
                            <span>📱 Ver Vista del Cliente</span>
                          </button>

                          <div className="grid grid-cols-3 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setShowQrStickerModal(true);
                                triggerToast(
                                  `Etiqueta térmica QR generada para ${activeVehicle.plate}`,
                                  `Lista para imprimir y adherir al parabrisas (${dynamicClientUrl})`,
                                  "info"
                                );
                              }}
                              className="py-2 px-2.5 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#1D4ED8] border border-blue-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5 text-[#2563EB]" />
                              <span>Imprimir QR</span>
                            </button>

                            <Link
                              href={activeClientPath}
                              target="_blank"
                              className="py-2 px-2.5 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#1D4ED8] border border-blue-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" />
                              <span>Abrir Ruta</span>
                            </Link>

                            <button
                              type="button"
                              onClick={handleCopyLink}
                              className="py-2 px-2.5 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#1D4ED8] border border-blue-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5 text-[#2563EB]" />
                              <span>Copiar Link</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= TAB 2: 2. ESTADO & TELEMETRÍA ================= */}
                  {openAccordion === 2 && (
                    <div className="flex-1 min-h-0 flex flex-col justify-between p-4 sm:p-5 gap-3.5 lg:overflow-hidden">
                      <div className="space-y-3.5">
                        {/* Encabezado del Panel de Telemetría */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#E2E8F0]">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                              <h3 className="text-sm sm:text-base font-black text-[#0F172A]">
                                Estado Operativo y Telemetría de Bahía
                              </h3>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Tarea activa en{" "}
                              <strong className="text-[#0F172A]">
                                {activeVehicle.bayNumber}
                              </strong>
                              :{" "}
                              <span className="font-bold text-[#2563EB]">
                                {activeVehicle.activeComponent}
                              </span>{" "}
                              — Selecciona una etapa del Stepper para
                              sincronizar el avance con el QR del cliente.
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1D4ED8] bg-[#EFF6FF] px-3 py-1 rounded-xl border border-blue-200">
                              {currentStage.defaultNote}
                            </span>
                            <span className="text-sm font-black px-3 py-1 rounded-xl bg-[#2563EB] text-white shadow-2xs">
                              {currentStage.percentage}%
                            </span>
                          </div>
                        </div>

                        {/* Barra de progreso principal de gran formato */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                              Progreso General de la Orden{" "}
                              {activeVehicle.orderNumber}
                            </span>
                            <span className="font-extrabold text-[#1D4ED8]">
                              Etapa {activeVehicle.stageIndex + 1} de{" "}
                              {STAGES.length} ({currentStage.label})
                            </span>
                          </div>
                          <div className="w-full h-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full overflow-hidden p-0.5">
                            <div
                              style={{ width: `${currentStage.percentage}%` }}
                              className="h-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] transition-all duration-500 rounded-full"
                            />
                          </div>
                        </div>

                        {/* Stepper Interactivo de 6 Etapas Desplegado en Grande */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                          {STAGES.map((stage, index) => {
                            const isCompleted =
                              index < activeVehicle.stageIndex;
                            const isCurrent =
                              index === activeVehicle.stageIndex;

                            return (
                              <button
                                key={stage.id}
                                type="button"
                                onClick={() => handleStageChange(stage.id)}
                                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[125px] ${
                                  isCurrent
                                    ? "bg-[#EFF6FF] border-2 border-[#2563EB] shadow-sm ring-2 ring-[#2563EB]/10"
                                    : isCompleted
                                    ? "bg-[#F8FAFC] border-blue-200 hover:bg-[#EFF6FF]/60"
                                    : "bg-white border-[#E2E8F0] hover:border-[#3B82F6] hover:bg-[#F8FAFC]/50"
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span
                                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                                      isCompleted
                                        ? "bg-[#1D4ED8] text-white"
                                        : isCurrent
                                        ? "bg-[#2563EB] text-white ring-4 ring-blue-200/80"
                                        : "bg-[#F8FAFC] text-slate-400 border border-[#CBD5E1]"
                                    }`}
                                  >
                                    {isCompleted ||
                                    (isCurrent && stage.id === 5) ? (
                                      <Check className="w-4 h-4 stroke-[3]" />
                                    ) : (
                                      index + 1
                                    )}
                                  </span>
                                  <span
                                    className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                                      isCurrent
                                        ? "bg-[#2563EB] text-white"
                                        : isCompleted
                                        ? "bg-blue-100 text-[#1D4ED8]"
                                        : "bg-slate-100 text-slate-400"
                                    }`}
                                  >
                                    {stage.percentage}%
                                  </span>
                                </div>

                                <div className="my-2">
                                  <p
                                    className={`text-xs sm:text-sm leading-tight ${
                                      isCurrent
                                        ? "font-black text-[#0F172A]"
                                        : isCompleted
                                        ? "font-bold text-[#1D4ED8]"
                                        : "font-semibold text-slate-500"
                                    }`}
                                  >
                                    {stage.label}
                                  </p>
                                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                                    {stage.defaultNote}
                                  </p>
                                </div>

                                <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold">
                                  <span
                                    className={
                                      isCurrent
                                        ? "text-[#2563EB]"
                                        : isCompleted
                                        ? "text-[#1D4ED8]"
                                        : "text-slate-400"
                                    }
                                  >
                                    {isCurrent
                                      ? "● En curso"
                                      : isCompleted
                                      ? "✓ Completada"
                                      : "Pendiente"}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Barra Inferior de Acciones de Estado y WhatsApp */}
                      <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 shrink-0">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            disabled={activeVehicle.stageIndex === 0}
                            onClick={() =>
                              handleStageChange(
                                Math.max(
                                  0,
                                  activeVehicle.stageIndex - 1
                                ) as StageIndex
                              )
                            }
                            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] disabled:opacity-40 text-xs font-bold text-[#0F172A] border border-[#E2E8F0] transition-colors cursor-pointer"
                          >
                            ← Etapa Anterior
                          </button>
                          <button
                            type="button"
                            disabled={activeVehicle.stageIndex === 5}
                            onClick={() =>
                              handleStageChange(
                                Math.min(
                                  5,
                                  activeVehicle.stageIndex + 1
                                ) as StageIndex
                              )
                            }
                            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                          >
                            Avanzar Etapa →
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => setOpenAccordion(5)}
                            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-xs font-bold text-[#0F172A] border border-[#E2E8F0] transition-colors cursor-pointer"
                          >
                            Ver Bitácora ({activeVehicle.timeline.length})
                          </button>
                          <button
                            type="button"
                            onClick={handleWhatsAppNotify}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#2563EB] text-[#1D4ED8] hover:text-white border border-blue-200 text-xs font-bold transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Notificar Avance por WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= TAB 3: 3. PRESUPUESTO Y COSTOS ================= */}
                  {openAccordion === 3 && (
                    <div className="flex-1 min-h-0 flex flex-col justify-between p-4 sm:p-5 gap-3.5 lg:overflow-hidden">
                      {/* 4 Tarjetas Superiores de Resumen Financiero */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">
                            Subtotal Repuestos
                          </span>
                          <p className="text-lg font-black text-[#0F172A] mt-0.5">
                            {formatARS(financialSummary.partsSubtotal)}
                          </p>
                          <span className="text-[11px] text-slate-500">
                            Insumos y piezas originales
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">
                            Subtotal Mano de Obra
                          </span>
                          <p className="text-lg font-black text-[#0F172A] mt-0.5">
                            {formatARS(financialSummary.laborSubtotal)}
                          </p>
                          <span className="text-[11px] text-slate-500">
                            Horas técnicas de bahía
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">
                            Estado de Aprobación
                          </span>
                          <div className="mt-1">
                            <button
                              type="button"
                              onClick={handleToggleBudgetApproval}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                                activeVehicle.budgetApproved
                                  ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                                  : "bg-slate-100 text-slate-700 border border-[#CBD5E1]"
                              }`}
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                              {activeVehicle.budgetApproved
                                ? "Aprobado por QR"
                                : "Pendiente Firma"}
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Clic para conmutar estado
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#EFF6FF] border border-blue-200">
                          <span className="text-[10px] font-extrabold uppercase text-[#1D4ED8] block">
                            Total Final Presupuesto
                          </span>
                          <p className="text-xl font-black text-[#1D4ED8] mt-0.5">
                            {formatARS(totalBudget)}
                          </p>
                          <span className="text-[11px] font-semibold text-[#2563EB]">
                            IVA Incluido · Sincronizado QR
                          </span>
                        </div>
                      </div>

                      {/* Tabla Detallada de Costos por Concepto */}
                      <div className="flex-1 min-h-0 overflow-x-auto lg:overflow-y-auto border border-[#E2E8F0] rounded-xl">
                        <table className="w-full min-w-[540px] text-left border-collapse">
                          <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                            <tr className="border-b border-[#E2E8F0] text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              <th className="py-2 px-3.5">
                                Concepto / Descripción
                              </th>
                              <th className="py-2 px-3">Rubro</th>
                              <th className="py-2 px-3">Cantidad</th>
                              <th className="py-2 px-3">Costo Unitario</th>
                              <th className="py-2 px-3">Estado</th>
                              <th className="py-2 px-3.5 text-right">
                                Subtotal
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E2E8F0] text-xs">
                            {activeVehicle.parts.map((item) => {
                              const rowTotal = item.quantity * item.unitPrice;
                              const isLabor =
                                item.category === "Mano de Obra" ||
                                item.unit === "hrs" ||
                                item.unit === "srv";
                              return (
                                <tr
                                  key={item.id}
                                  className="hover:bg-[#F8FAFC]"
                                >
                                  <td className="py-2 px-3.5 font-bold text-[#0F172A]">
                                    {item.description}
                                  </td>
                                  <td className="py-2 px-3">
                                    <span
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                        isLabor
                                          ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                                          : "bg-slate-100 text-slate-700"
                                      }`}
                                    >
                                      {isLabor ? "Mano de Obra" : "Repuesto"}
                                    </span>
                                  </td>
                                  <td className="py-2 px-3 text-slate-600 font-medium">
                                    {item.quantity} {item.unit}
                                  </td>
                                  <td className="py-2 px-3 text-slate-600 font-medium">
                                    {formatARS(item.unitPrice)}
                                  </td>
                                  <td className="py-2 px-3">
                                    <span className="text-[11px] font-bold text-[#1D4ED8]">
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="py-2 px-3.5 text-right font-extrabold text-[#0F172A]">
                                    {formatARS(rowTotal)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Barra Inferior de Acciones de Presupuesto */}
                      <div className="pt-2.5 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setOpenAccordion(4)}
                          className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-xs font-bold text-[#0F172A] border border-[#E2E8F0] cursor-pointer"
                        >
                          Ir a Inventario y Repuestos →
                        </button>

                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setIsClientDrawerOpen(true);
                              setShowBudgetInPhone(true);
                            }}
                            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-blue-100 text-[#1D4ED8] border border-blue-200 text-xs font-bold cursor-pointer"
                          >
                            Previsualizar en Celular
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              triggerToast(
                                `Presupuesto Digital enviado a ${activeVehicle.ownerName}`,
                                `Total: ${formatARS(
                                  totalBudget
                                )} · Link de aprobación QR activo.`,
                                "whatsapp"
                              )
                            }
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Enviar Presupuesto Digital</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= TAB 4: 4. INVENTARIO Y REPUESTOS ================= */}
                  {openAccordion === 4 && (
                    <div className="flex-1 min-h-0 flex flex-col justify-between p-4 sm:p-5 gap-3 lg:overflow-hidden">
                      {/* Selector Rápido desde Pañol + Formulario Inline */}
                      <div className="space-y-2.5 shrink-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-[#0F172A]">
                              Asignación Rápida de Stock del Pañol:
                            </span>
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                              {inventory.slice(0, 4).map((inv) => (
                                <button
                                  key={inv.id}
                                  type="button"
                                  disabled={inv.stock <= 0}
                                  onClick={() =>
                                    handleAssignFromInventory(inv)
                                  }
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFF6FF] hover:bg-[#2563EB] text-[#1D4ED8] hover:text-white border border-blue-200 text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-40"
                                  title={`Sumar ${inv.name} (${formatARS(
                                    inv.unitPrice
                                  )})`}
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>
                                    {inv.name.split(" ").slice(0, 2).join(" ")}
                                  </span>
                                  <span className="opacity-75">
                                    ({inv.stock})
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-blue-200">
                            {financialSummary.installedCount} Instalados ·{" "}
                            {financialSummary.inProgressCount} En progreso
                          </span>
                        </div>

                        {/* Fast Inline Add Part Bar */}
                        <form
                          onSubmit={handleAddPartSubmit}
                          className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-12 gap-2 items-center"
                        >
                          <div className="col-span-12 sm:col-span-4">
                            <input
                              type="text"
                              required
                              value={newDesc}
                              onChange={(e) => setNewDesc(e.target.value)}
                              placeholder="+ Agregar repuesto o mano de obra..."
                              className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                            />
                          </div>
                          <div className="col-span-4 sm:col-span-2">
                            <select
                              value={newCategory}
                              onChange={(e) =>
                                setNewCategory(
                                  e.target.value as
                                    | "Repuesto"
                                    | "Mano de Obra"
                                )
                              }
                              className="w-full px-2 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A]"
                            >
                              <option value="Repuesto">Repuesto</option>
                              <option value="Mano de Obra">Mano de Obra</option>
                            </select>
                          </div>
                          <div className="col-span-4 sm:col-span-2 flex gap-1">
                            <input
                              type="number"
                              min={1}
                              required
                              value={newQty}
                              onChange={(e) => setNewQty(e.target.value)}
                              className="w-12 px-2 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A]"
                            />
                            <select
                              value={newUnit}
                              onChange={(e) => setNewUnit(e.target.value)}
                              className="flex-1 px-1 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A]"
                            >
                              <option value="u.">u.</option>
                              <option value="hrs">hrs</option>
                              <option value="L">L</option>
                            </select>
                          </div>
                          <div className="col-span-4 sm:col-span-2">
                            <input
                              type="number"
                              min={1}
                              required
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              placeholder="Precio ($)"
                              className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A]"
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-2">
                            <button
                              type="submit"
                              className="w-full py-1.5 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Sumar Ítem</span>
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* Interactive Parts Table with Horizontal & Vertical Scroll */}
                      <div className="overflow-x-auto lg:overflow-y-auto w-full flex-1 min-h-0 border border-[#E2E8F0] rounded-xl">
                        <table className="w-full min-w-[540px] text-left border-collapse">
                          <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                            <tr className="border-b border-[#E2E8F0] text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              <th className="py-2.5 px-3.5">Descripción</th>
                              <th className="py-2.5 px-2.5">Cant.</th>
                              <th className="py-2.5 px-2.5">Unitario</th>
                              <th className="py-2.5 px-2.5">Subtotal</th>
                              <th className="py-2.5 px-2.5">Estado (Clic)</th>
                              <th className="py-2.5 px-2.5 text-center">
                                Acción
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E2E8F0] text-xs">
                            {activeVehicle.parts.map((item) => {
                              const rowTotal = item.quantity * item.unitPrice;
                              const isInstalled = item.status === "Instalado";
                              return (
                                <tr
                                  key={item.id}
                                  className="hover:bg-[#F8FAFC]"
                                >
                                  <td className="py-2.5 px-3.5 font-bold text-[#0F172A]">
                                    {item.description}
                                  </td>
                                  <td className="py-2.5 px-2.5 text-slate-600 font-medium">
                                    {item.quantity} {item.unit}
                                  </td>
                                  <td className="py-2.5 px-2.5 text-slate-600 font-medium">
                                    {formatARS(item.unitPrice)}
                                  </td>
                                  <td className="py-2.5 px-2.5 font-extrabold text-[#0F172A]">
                                    {formatARS(rowTotal)}
                                  </td>
                                  <td className="py-2.5 px-2.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleTogglePartStatus(item.id)
                                      }
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer ${
                                        isInstalled
                                          ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                                          : "bg-[#F8FAFC] text-[#3B82F6] border border-[#CBD5E1]"
                                      }`}
                                    >
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                          isInstalled
                                            ? "bg-[#1D4ED8]"
                                            : "bg-[#60A5FA]"
                                        }`}
                                      />
                                      {item.status}
                                    </button>
                                  </td>
                                  <td className="py-2.5 px-2.5 text-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDeletePart(item.id)
                                      }
                                      className="p-1 text-slate-400 hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded-lg cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* ================= TAB 5: 5. BITÁCORA DEL MECÁNICO ================= */}
                  {openAccordion === 5 && (
                    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-5 lg:overflow-hidden">
                      {/* Columna Izquierda (5 cols en lg): Redacción de Notas Técnicas y Evidencia */}
                      <div className="lg:col-span-5 flex flex-col justify-between gap-3 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                        <form
                          onSubmit={handleAddMechanicNote}
                          className="flex flex-col gap-2.5 flex-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-[#0F172A]">
                              Nueva Observación Técnica
                            </span>
                            <span className="text-[10px] font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded border border-blue-200">
                              Sincroniza con QR
                            </span>
                          </div>

                          <textarea
                            rows={3}
                            value={mechanicNoteInput}
                            onChange={(e) =>
                              setMechanicNoteInput(e.target.value)
                            }
                            placeholder="Redactar informe técnico de bahía, mediciones de diagnóstico o novedades para el cliente..."
                            className="w-full flex-1 min-h-[76px] p-3 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] resize-none"
                          />

                          {/* Etiquetas rápidas de inserción */}
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              "Torque verificado según manual",
                              "Prueba dinámica en ruta aprobada",
                              "Reemplazo de pieza completado",
                            ].map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => setMechanicNoteInput(preset)}
                                className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-white hover:bg-[#EFF6FF] text-slate-600 hover:text-[#1D4ED8] border border-[#E2E8F0] cursor-pointer transition-colors"
                              >
                                + {preset}
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="submit"
                              className="flex-1 py-2 px-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer shadow-2xs"
                            >
                              Registrar en Bitácora
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                triggerToast(
                                  "Evidencia fotográfica actualizada",
                                  `Sincronizada en BoxBox QR para ${activeVehicle.ownerName}.`,
                                  "info"
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 text-xs font-bold cursor-pointer shrink-0"
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>Subir Foto</span>
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* Columna Derecha (7 cols en lg): Línea de Tiempo Completa */}
                      <div className="lg:col-span-7 flex flex-col min-h-0">
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E2E8F0] shrink-0">
                          <span className="text-xs font-extrabold text-[#0F172A]">
                            Historial Cronológico de la Orden (
                            {activeVehicle.timeline.length} eventos)
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            Últ. registro: {latestEvent?.time}
                          </span>
                        </div>

                        <div className="space-y-2.5 lg:overflow-y-auto pr-1 flex-1 min-h-0">
                          {activeVehicle.timeline.map((item, idx) => (
                            <div
                              key={item.id}
                              className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs ${
                                idx === 0
                                  ? "bg-[#EFF6FF]/60 border-blue-200"
                                  : "bg-[#F8FAFC] border-[#E2E8F0]"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                                <span className="font-mono font-extrabold text-[#1D4ED8] shrink-0">
                                  {item.time}
                                </span>
                                <span className="font-semibold text-[#0F172A] break-words">
                                  {item.text}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-[#E2E8F0] shrink-0 ml-auto">
                                {item.actor}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* =====================================================================
                VISTA 2: DASHBOARD EJECUTIVO (RESPONSIVE)
               ===================================================================== */}
            {activeTab === "Dashboard" && (
              <div className="flex-1 lg:min-h-0 flex flex-col gap-3.5 lg:overflow-y-auto">
                {/* 4 KPIs Superiores (1 col en móvil, 2 en sm, 4 en lg) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
                  {[
                    {
                      label: "Vehículos en Taller",
                      value: "18",
                      delta: "85% capacidad activa",
                      icon: Car,
                    },
                    {
                      label: "Listos para Entregar",
                      value: "4",
                      delta: "Notificados por QR",
                      icon: CheckCircle2,
                    },
                    {
                      label: "Ticket Promedio",
                      value: "$245.000",
                      delta: "+12.1% vs mes ant.",
                      icon: FileText,
                    },
                    {
                      label: "Facturación Mensual",
                      value: "$4.2M",
                      delta: "+18.4% crecimiento",
                      icon: TrendingUp,
                    },
                  ].map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                      <div
                        key={kpi.label}
                        className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs p-4 flex items-start justify-between"
                      >
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {kpi.label}
                          </p>
                          <p className="text-2xl font-black text-[#0F172A] mt-1">
                            {kpi.value}
                          </p>
                          <span className="text-[11px] font-semibold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded mt-1 inline-block">
                            {kpi.delta}
                          </span>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] border border-blue-200 flex items-center justify-center text-[#2563EB]">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Gráficos + Monitor */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1 lg:min-h-0">
                  <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col justify-between gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-[#0F172A]">
                        Volumen de Órdenes por Estado
                      </h3>
                      <span className="text-[11px] font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full">
                        18 Activos
                      </span>
                    </div>
                    <div className="space-y-3 my-auto">
                      {[
                        {
                          stage: "En Espera",
                          count: 2,
                          pct: 11,
                          barColor: "bg-[#93C5FD]",
                        },
                        {
                          stage: "Diagnóstico",
                          count: 4,
                          pct: 22,
                          barColor: "bg-[#60A5FA]",
                        },
                        {
                          stage: "En Reparación",
                          count: 6,
                          pct: 34,
                          barColor: "bg-[#2563EB]",
                        },
                        {
                          stage: "Repuestos",
                          count: 2,
                          pct: 11,
                          barColor: "bg-[#3B82F6]",
                        },
                        {
                          stage: "Listo para Entrega",
                          count: 4,
                          pct: 22,
                          barColor: "bg-[#1D4ED8]",
                        },
                      ].map((row) => (
                        <div key={row.stage} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-[#0F172A]">
                              {row.stage}
                            </span>
                            <span className="font-extrabold text-[#1D4ED8]">
                              {row.count} autos ({row.pct}%)
                            </span>
                          </div>
                          <div className="w-full h-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full overflow-hidden">
                            <div
                              style={{ width: `${row.pct * 2.5}%` }}
                              className={`h-full ${row.barColor} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-[#0F172A]">
                        Monitor de Bahías en Vivo
                      </h3>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        Acceso directo
                      </span>
                    </div>
                    <div className="divide-y divide-[#E2E8F0] my-auto">
                      {vehicles.map((v) => {
                        const st = STAGES[v.stageIndex];
                        return (
                          <div
                            key={v.id}
                            className="py-2.5 flex flex-wrap items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <MercosurPlateBadge plate={v.plate} size="sm" />
                              <div className="min-w-0">
                                <p className="text-xs font-extrabold text-[#0F172A] truncate">
                                  {v.bayNumber} · {v.model}
                                </p>
                                <p className="text-[11px] text-slate-500 truncate">
                                  {v.ownerName} · {st.label} ({st.percentage}%)
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedVehicleId(v.id);
                                setActiveTab("Órdenes de Trabajo");
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shrink-0 cursor-pointer flex items-center gap-1 ml-auto"
                            >
                              <span>Abrir</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =====================================================================
                VISTA 3: INVENTARIO (PAÑOL DE REPUESTOS RESPONSIVE)
               ===================================================================== */}
            {activeTab === "Inventario" && (
              <div className="flex-1 lg:min-h-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs p-4 sm:p-5 flex flex-col gap-4 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
                  <div>
                    <h2 className="text-sm font-extrabold text-[#0F172A]">
                      Stock del Pañol de Repuestos e Insumos
                    </h2>
                    <p className="text-xs text-slate-500">
                      Asignación directa a la orden seleccionada:{" "}
                      <strong className="text-[#1D4ED8]">
                        {activeVehicle.model} ({activeVehicle.plate})
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="flex-1 lg:min-h-0 overflow-x-auto lg:overflow-y-auto w-full">
                  <table className="w-full min-w-[600px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2E8F0] text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-[#F8FAFC]">
                        <th className="py-2.5 px-3">SKU</th>
                        <th className="py-2.5 px-3">Repuesto</th>
                        <th className="py-2.5 px-3">Categoría</th>
                        <th className="py-2.5 px-3">Stock</th>
                        <th className="py-2.5 px-3">Estado</th>
                        <th className="py-2.5 px-3">Precio Unit.</th>
                        <th className="py-2.5 px-3 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-xs">
                      {inventory.map((item) => {
                        const isCritical = item.stock <= item.minStock;
                        return (
                          <tr key={item.id} className="hover:bg-[#F8FAFC]">
                            <td className="py-3 px-3 font-mono font-bold text-[#1D4ED8]">
                              {item.sku}
                            </td>
                            <td className="py-3 px-3 font-bold text-[#0F172A]">
                              {item.name}
                            </td>
                            <td className="py-3 px-3 text-slate-600">
                              {item.category}
                            </td>
                            <td className="py-3 px-3 font-extrabold text-[#0F172A]">
                              {item.stock} {item.unit}
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                  isCritical
                                    ? "bg-slate-100 text-[#0F172A] border border-[#CBD5E1]"
                                    : "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                                }`}
                              >
                                {isCritical ? "Stock Crítico" : "Stock Óptimo"}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-bold text-[#0F172A]">
                              {formatARS(item.unitPrice)}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleAssignFromInventory(item)}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#EFF6FF] hover:bg-[#2563EB] text-[#1D4ED8] hover:text-white border border-blue-200 text-xs font-bold cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Asignar</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* =====================================================================
                VISTA 4: CLIENTES (MAESTRO-DETALLE · PASAPORTE QR & TRAZADO HISTÓRICO)
               ===================================================================== */}
            {activeTab === "Clientes" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0 overflow-hidden">
                {/* COLUMNA IZQUIERDA (4 COLUMNAS - DIRECTORIO DE CLIENTES Y FLOTA) */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-3.5 flex flex-col min-h-0 overflow-hidden">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E2E8F0] shrink-0">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB] block">
                        Directorio de Clientes y Flota
                      </span>
                      <h3 className="text-sm font-black text-[#0F172A]">
                        Legajos y Vehículos Asociados
                      </h3>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                      {filteredClientDirectory.length} clientes
                    </span>
                  </div>

                  {/* Buscador superior del Directorio */}
                  <div className="relative my-2.5 shrink-0">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={clientDirectoryQuery}
                      onChange={(e) => setClientDirectoryQuery(e.target.value)}
                      placeholder="Buscar por cliente, DNI, teléfono o patente..."
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Lista interactiva de clientes con scroll interno limpio */}
                  <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-2.5">
                    {filteredClientDirectory.map((clientVeh) => {
                      const isSelected = clientVeh.id === activeVehicle.id;
                      const historyRecords = clientVeh.serviceHistory || [];
                      const accumulatedSpend = historyRecords.reduce(
                        (acc, r) => acc + r.totalBilled,
                        0
                      );
                      const fleetList =
                        clientVeh.fleetPlates &&
                        clientVeh.fleetPlates.length > 0
                          ? clientVeh.fleetPlates
                          : [
                              {
                                plate: clientVeh.plate,
                                label: `${clientVeh.plate} · ${clientVeh.model}`,
                              },
                            ];

                      return (
                        <div
                          key={clientVeh.id}
                          onClick={() => setSelectedVehicleId(clientVeh.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedVehicleId(clientVeh.id);
                            }
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                            isSelected
                              ? "bg-[#EFF6FF]/90 border-2 border-[#2563EB] shadow-xs"
                              : "bg-[#F8FAFC] hover:bg-white border-[#E2E8F0] hover:border-blue-300"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-sm font-extrabold text-[#0F172A] truncate">
                                  {clientVeh.ownerName}
                                </h4>
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />
                                )}
                              </div>
                              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                                DNI {clientVeh.ownerDni || "34.812.904"} ·{" "}
                                {clientVeh.phone}
                              </p>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#1D4ED8] border border-blue-200 shrink-0">
                              {clientVeh.clientSince || "Cliente desde 2022"}
                            </span>
                          </div>

                          {/* Píldoras con las Patentes Mercosur de sus vehículos registrados */}
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {fleetList.map((fp) => {
                              const isPrimaryPlate =
                                fp.plate === clientVeh.plate;
                              return (
                                <button
                                  key={fp.plate}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVehicleId(clientVeh.id);
                                  }}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-colors cursor-pointer ${
                                    isSelected && isPrimaryPlate
                                      ? "bg-[#2563EB] text-white border-[#1D4ED8]"
                                      : "bg-white text-[#0F172A] border-[#CBD5E1] hover:border-[#2563EB]"
                                  }`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                                  <span className="font-mono tracking-tight">
                                    {fp.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Gasto histórico acumulado y visitas */}
                          <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px]">
                            <span className="text-slate-500 font-medium">
                              {clientVeh.historicalServices} intervenciones
                              registradas
                            </span>
                            <span className="font-extrabold text-[#1D4ED8]">
                              Histórico: {formatARS(accumulatedSpend)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* COLUMNA DERECHA (8 COLUMNAS - FICHA DEL VEHÍCULO, QR DE HISTORIAL Y TRAZADO HISTÓRICO) */}
                <div className="lg:col-span-8 flex flex-col gap-3 min-h-0 overflow-hidden">
                  {/* ENCABEZADO FIJO DEL VEHÍCULO + QR DE HISTORIAL CLÍNICO */}
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-3.5 shrink-0">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-stretch">
                      {/* Datos del propietario, Chapa Patente Mercosur, VIN, Motor y Próximo Service */}
                      <div className="xl:col-span-7 flex flex-col justify-between gap-2.5">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                                Legajo Clínico Vehicular
                              </span>
                              <span className="text-[11px] font-bold text-slate-500">
                                {activeVehicle.ownerName} (DNI{" "}
                                {activeVehicle.ownerDni || "34.812.904"})
                              </span>
                            </div>
                            <h2 className="text-lg font-black text-[#0F172A] tracking-tight mt-1">
                              {activeVehicle.model} ({activeVehicle.year}) ·{" "}
                              <span className="text-[#1D4ED8]">
                                {activeVehicle.engineSpec}
                              </span>
                            </h2>
                          </div>
                          <MercosurPlateBadge plate={activeVehicle.plate} />
                        </div>

                        {/* Grilla de especificaciones clínicas (VIN/Chasis, Kilometraje, Visitas, Orden Activa) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <span className="text-[9px] font-bold uppercase text-slate-400 block">
                              VIN / Chasis
                            </span>
                            <span className="font-mono text-[11px] font-extrabold text-[#0F172A] truncate block mt-0.5">
                              {activeVehicle.vin || "8AFZZZFFCHJ409218"}
                            </span>
                          </div>
                          <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <span className="text-[9px] font-bold uppercase text-slate-400 block">
                              Odómetro Actual
                            </span>
                            <span className="text-xs font-extrabold text-[#1D4ED8] block mt-0.5">
                              {activeVehicle.mileage}
                            </span>
                          </div>
                          <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <span className="text-[9px] font-bold uppercase text-slate-400 block">
                              Contacto Titular
                            </span>
                            <span className="text-[11px] font-bold text-[#0F172A] truncate block mt-0.5">
                              {activeVehicle.phone}
                            </span>
                          </div>
                          <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <span className="text-[9px] font-bold uppercase text-slate-400 block">
                              Estado en Taller
                            </span>
                            <span className="text-[11px] font-extrabold text-[#2563EB] truncate block mt-0.5">
                              {currentStage.label} ({currentStage.percentage}%)
                            </span>
                          </div>
                        </div>

                        {/* Resumen de Próximo Service Recomendado */}
                        <div className="px-3 py-2 rounded-xl bg-[#EFF6FF] border border-blue-200 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Calendar className="w-4 h-4 text-[#2563EB] shrink-0" />
                            <p className="text-xs font-bold text-[#0F172A] truncate">
                              <span className="text-[#1D4ED8] font-extrabold uppercase text-[10px] mr-1.5">
                                Próximo Service Recomendado:
                              </span>
                              {activeVehicle.nextRecommendedService ||
                                "Próximo cambio de aceite a los 78.400 km"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveTab("Órdenes de Trabajo")}
                            className="text-[10px] font-extrabold text-[#1D4ED8] hover:text-[#2563EB] underline shrink-0 cursor-pointer"
                          >
                            Ir a OT →
                          </button>
                        </div>
                      </div>

                      {/* TARJETA DESTACADA: PASAPORTE QR · HISTORIAL CLÍNICO */}
                      <div className="xl:col-span-5 rounded-xl bg-gradient-to-br from-[#EFF6FF] via-white to-[#F8FAFC] border-2 border-[#2563EB]/30 p-3 flex flex-col justify-between gap-2.5">
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="space-y-1 min-w-0">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#2563EB] text-white text-[9px] font-extrabold uppercase tracking-wider">
                              <QrCode className="w-3 h-3" />
                              PASAPORTE QR · HISTORIAL CLÍNICO
                            </span>
                            <p className="text-[11px] font-bold text-[#0F172A] leading-snug">
                              Trazabilidad de por vida del vehículo para
                              guantera o parabrisas.
                            </p>
                            <p className="font-mono text-[10px] font-bold text-[#1D4ED8] truncate">
                              {dynamicClientHistoryUrl}
                            </p>
                          </div>

                          <RealisticQrCode
                            value={dynamicClientHistoryUrl}
                            size={80}
                            sizeClass="w-20 h-20"
                            imageSettings={{
                              src: "/SVG_redondo.svg",
                              width: 28,
                              height: 28,
                              excavate: true,
                            }}
                          />
                        </div>

                        {/* Botonera del Pasaporte QR */}
                        <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-blue-200/70">
                          <button
                            type="button"
                            onClick={() => {
                              setPhoneSimulatorTab("historial");
                              setIsClientDrawerOpen(true);
                            }}
                            className="col-span-3 sm:col-span-1 py-1.5 px-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-extrabold flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                          >
                            <span>📱 Abrir Historial Cliente</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowQrStickerModal(true)}
                            className="py-1.5 px-2 rounded-lg bg-white hover:bg-[#EFF6FF] text-[#0F172A] border border-[#CBD5E1] text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Printer className="w-3 h-3 text-[#2563EB] shrink-0" />
                            <span className="truncate">
                              Imprimir Sticker Guantera/Parabrisas
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={handleCopyHistoryUrl}
                            className="py-1.5 px-2 rounded-lg bg-white hover:bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span>Copiar Link</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LÍNEA DE TIEMPO DEL HISTORIAL CLÍNICO DE REPARACIONES (TIMELINE HISTÓRICO) */}
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-3.5 flex-1 min-h-0 flex flex-col overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#E2E8F0] shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-blue-200">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-black text-[#0F172A]">
                            Historial Clínico Completo de Intervenciones (
                            {(activeVehicle.serviceHistory || []).length}{" "}
                            visitas)
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            Trazabilidad real de kilometraje, repuestos
                            instalados y garantía certificada BoxBox
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={activeClientHistoryPath}
                          target="_blank"
                          className="px-2.5 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#1D4ED8] border border-[#E2E8F0] text-[11px] font-bold inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Vista Pública QR</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setShowAddHistoryForm((prev) => !prev)
                          }
                          className="px-3 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-extrabold inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Registrar Mantenimiento Histórico</span>
                        </button>
                      </div>
                    </div>

                    {/* Formulario inline rápido para registrar un nuevo mantenimiento histórico */}
                    {showAddHistoryForm && (
                      <form
                        onSubmit={handleAddHistoricalService}
                        className="my-2.5 p-3 rounded-xl bg-[#EFF6FF]/80 border border-blue-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-end shrink-0"
                      >
                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-extrabold uppercase text-[#1D4ED8] block mb-1">
                            Kilometraje
                          </label>
                          <input
                            type="text"
                            value={histMileage}
                            onChange={(e) => setHistMileage(e.target.value)}
                            placeholder={activeVehicle.mileage}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-blue-200 text-[#0F172A]"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <label className="text-[10px] font-extrabold uppercase text-[#1D4ED8] block mb-1">
                            Servicio / Diagnóstico Realizado
                          </label>
                          <input
                            type="text"
                            required
                            value={histTitle}
                            onChange={(e) => setHistTitle(e.target.value)}
                            placeholder="Ej: Service 70.000 km + Bujías"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-blue-200 text-[#0F172A]"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="text-[10px] font-extrabold uppercase text-[#1D4ED8] block mb-1">
                            Repuestos (sep. por coma)
                          </label>
                          <input
                            type="text"
                            value={histParts}
                            onChange={(e) => setHistParts(e.target.value)}
                            placeholder="Aceite 5W-30, Filtro Aire"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-blue-200 text-[#0F172A]"
                          />
                        </div>
                        <div className="sm:col-span-3 flex items-center gap-1.5">
                          <div className="flex-1">
                            <label className="text-[10px] font-extrabold uppercase text-[#1D4ED8] block mb-1">
                              Costo ARS
                            </label>
                            <input
                              type="number"
                              value={histCost}
                              onChange={(e) => setHistCost(e.target.value)}
                              placeholder="165000"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-blue-200 text-[#0F172A]"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-lg bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-extrabold cursor-pointer mt-4"
                          >
                            Guardar
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Timeline cronológico con scroll interno limpio */}
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1 pt-2.5 space-y-2.5">
                      {(activeVehicle.serviceHistory || []).map(
                        (record, idx) => (
                          <div
                            key={record.id}
                            className={`p-3.5 rounded-xl border transition-all ${
                              record.isCurrentOrder || idx === 0
                                ? "bg-[#EFF6FF]/60 border-2 border-[#2563EB]/40 shadow-2xs"
                                : "bg-[#F8FAFC] border-[#E2E8F0]"
                            }`}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`font-mono text-[11px] font-extrabold px-2.5 py-0.5 rounded-md ${
                                    record.isCurrentOrder
                                      ? "bg-[#2563EB] text-white"
                                      : "bg-white text-[#1D4ED8] border border-blue-200"
                                  }`}
                                >
                                  {record.date} · {record.orderNumber}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-[#CBD5E1] text-[11px] font-extrabold text-[#0F172A]">
                                  <Gauge className="w-3.5 h-3.5 text-[#2563EB]" />
                                  {record.mileage}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 text-[10px] font-bold">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                                  {record.warrantyLabel}
                                </span>
                              </div>

                              <div className="text-right">
                                <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                                  Total Facturado
                                </span>
                                <span className="text-sm font-black text-[#1D4ED8]">
                                  {formatARS(record.totalBilled)}
                                </span>
                              </div>
                            </div>

                            <h4 className="text-sm font-extrabold text-[#0F172A] mt-2">
                              {record.serviceTitle}
                            </h4>
                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                              {record.diagnosisSummary}
                            </p>

                            <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 mr-1">
                                  Repuestos:
                                </span>
                                {record.installedParts.map((part, pIdx) => (
                                  <span
                                    key={pIdx}
                                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#E2E8F0] text-[#0F172A]"
                                  >
                                    {part}
                                  </span>
                                ))}
                              </div>

                              <span className="text-[11px] font-bold text-slate-500">
                                Mecánico a cargo:{" "}
                                <strong className="text-[#0F172A]">
                                  {record.mechanic}
                                </strong>
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* ================= 5. SIMULADOR MÓVIL DEL CLIENTE (DRAWER RESPONSIVO CON 2 PESTAÑAS) ================= */}
          {isClientDrawerOpen && (
            <>
              <div
                onClick={() => setIsClientDrawerOpen(false)}
                className={`fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs z-40 ${
                  isDrawerPinned ? "lg:hidden" : ""
                }`}
              />

              <aside
                className={`${
                  isDrawerPinned
                    ? "fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] lg:static lg:w-[350px] lg:z-auto border-l border-[#E2E8F0] bg-white shrink-0 lg:h-full shadow-2xl lg:shadow-none"
                    : "fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-white border-l border-[#E2E8F0] shadow-2xl"
                } flex flex-col justify-between p-4 overflow-y-auto`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                        Vista del Cliente (QR en Vivo)
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsDrawerPinned((prev) => !prev)}
                        title="Fijar / Desacoplar panel en escritorio"
                        className={`hidden lg:inline-flex p-1.5 rounded-lg border text-xs cursor-pointer ${
                          isDrawerPinned
                            ? "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                            : "bg-[#F8FAFC] text-slate-500 border-[#E2E8F0]"
                        }`}
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsClientDrawerOpen(false)}
                        className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-slate-200/70 text-[#0F172A] border border-[#E2E8F0] cursor-pointer"
                        aria-label="Cerrar Vista del Cliente"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Smartphone Mockup Scaled for Mobile & Desktop */}
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-[292px] scale-95 sm:scale-100 origin-top bg-[#0F172A] rounded-[38px] p-2.5 shadow-xl border-4 border-slate-800 relative">
                      <div className="w-24 h-4 bg-[#0F172A] rounded-b-xl mx-auto absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                        <div className="w-8 h-1 bg-slate-700 rounded-full" />
                      </div>

                      <div className="bg-white rounded-[28px] pt-6 pb-3.5 px-3 text-center flex flex-col justify-between min-h-[450px] relative overflow-hidden">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-1 mb-1">
                          <span>9:41</span>
                          <span className="inline-flex items-center gap-1 text-[#2563EB] font-extrabold">
                            <img
                              src="/SVG_redondo.svg"
                              alt="BoxBox QR"
                              className="w-4 h-4 object-contain"
                            />
                            <span>BoxBox QR</span>
                          </span>
                          <span>5G</span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-[#0F172A]">
                            ¡HOLA {activeVehicle.ownerFirstName}!
                          </h4>
                          <p className="text-[11px] font-bold text-slate-600">
                            {activeVehicle.model} ({activeVehicle.year})
                          </p>
                          <div className="flex justify-center">
                            <MercosurPlateBadge
                              plate={activeVehicle.plate}
                              size="sm"
                            />
                          </div>
                        </div>

                        {/* 2 PESTAÑAS SUPERIORES EN LA PANTALLA DEL CELULAR */}
                        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 border border-[#E2E8F0] my-1.5">
                          <button
                            type="button"
                            onClick={() => setPhoneSimulatorTab("vivo")}
                            className={`py-1.5 px-2 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
                              phoneSimulatorTab === "vivo"
                                ? "bg-[#2563EB] text-white shadow-2xs"
                                : "text-slate-600 hover:text-[#0F172A]"
                            }`}
                          >
                            ⚡ Reparación en Vivo
                          </button>
                          <button
                            type="button"
                            onClick={() => setPhoneSimulatorTab("historial")}
                            className={`py-1.5 px-2 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
                              phoneSimulatorTab === "historial"
                                ? "bg-[#2563EB] text-white shadow-2xs"
                                : "text-slate-600 hover:text-[#0F172A]"
                            }`}
                          >
                            📋 Historial Clínico
                          </button>
                        </div>

                        {phoneSimulatorTab === "vivo" ? (
                          <>
                            <div className="my-1 py-2 px-2.5 rounded-xl bg-[#EFF6FF] border border-blue-200">
                              <p className="text-xs font-extrabold text-[#1D4ED8] uppercase">
                                {currentStage.label} ({currentStage.percentage}
                                %)
                              </p>
                              <p className="text-[10px] font-medium text-slate-600">
                                ({activeVehicle.activeComponent})
                              </p>
                              <div className="w-full h-1.5 bg-blue-200/70 rounded-full overflow-hidden mt-1.5">
                                <div
                                  style={{
                                    width: `${currentStage.percentage}%`,
                                  }}
                                  className="h-full bg-[#2563EB] transition-all duration-500 rounded-full"
                                />
                              </div>
                            </div>

                            {!showBudgetInPhone ? (
                              <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] my-1">
                                <img
                                  src={activeVehicle.photoUrl}
                                  alt={activeVehicle.photoCaption}
                                  className="w-full h-24 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-transparent to-transparent flex items-end p-2">
                                  <p className="text-[10px] text-white font-medium line-clamp-1">
                                    {activeVehicle.photoCaption}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="my-1 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-2 text-left max-h-28 overflow-y-auto">
                                <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#E2E8F0]">
                                  <span className="text-[10px] font-extrabold uppercase text-[#0F172A]">
                                    Presupuesto
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setShowBudgetInPhone(false)}
                                    className="text-[10px] font-bold text-[#2563EB] flex items-center gap-0.5 cursor-pointer"
                                  >
                                    <ArrowLeft className="w-2.5 h-2.5" /> Foto
                                  </button>
                                </div>
                                <div className="space-y-1">
                                  {activeVehicle.parts.map((p) => (
                                    <div
                                      key={p.id}
                                      className="flex justify-between text-[10px]"
                                    >
                                      <span className="font-semibold text-[#0F172A] truncate pr-1">
                                        {p.description} x{p.quantity}
                                      </span>
                                      <span className="font-bold text-[#1D4ED8] shrink-0">
                                        {formatARS(p.quantity * p.unitPrice)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="my-1">
                              <p className="text-[10px] text-slate-500">
                                Entrega estimada:{" "}
                                <strong className="text-[#0F172A]">
                                  {activeVehicle.estimatedDelivery}
                                </strong>
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setShowBudgetInPhone((prev) => !prev)
                              }
                              className="w-full py-2 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer"
                            >
                              {showBudgetInPhone
                                ? `Ocultar (${formatARS(totalBudget)})`
                                : `Ver Presupuesto (${formatARS(totalBudget)})`}
                            </button>
                          </>
                        ) : (
                          <div className="flex-1 flex flex-col justify-between text-left my-1 space-y-1.5 overflow-hidden">
                            <div className="p-2 rounded-xl bg-[#EFF6FF] border border-blue-200 flex items-center justify-between">
                              <span className="text-[10px] font-extrabold text-[#1D4ED8] uppercase">
                                Pasaporte Clínico BoxBox
                              </span>
                              <span className="font-mono text-[10px] font-bold text-[#0F172A]">
                                {activeVehicle.mileage}
                              </span>
                            </div>

                            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5">
                              {(activeVehicle.serviceHistory || []).map(
                                (rec) => (
                                  <div
                                    key={rec.id}
                                    className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5"
                                  >
                                    <div className="flex items-center justify-between text-[9px] font-bold text-[#1D4ED8]">
                                      <span>{rec.date}</span>
                                      <span className="font-mono">
                                        {rec.mileage}
                                      </span>
                                    </div>
                                    <p className="text-[10px] font-extrabold text-[#0F172A] leading-tight">
                                      {rec.serviceTitle}
                                    </p>
                                    <div className="flex items-center justify-between text-[9px] pt-0.5">
                                      <span className="text-slate-500 truncate pr-1">
                                        ✓ Garantía BoxBox
                                      </span>
                                      <span className="font-extrabold text-[#1D4ED8] shrink-0">
                                        {formatARS(rec.totalBilled)}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>

                            <div className="p-1.5 rounded-lg bg-[#EFF6FF] border border-blue-200 text-[9px] font-bold text-[#1D4ED8] text-center truncate">
                              {activeVehicle.nextRecommendedService}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2.5 w-full max-w-[292px] space-y-2">
                      <Link
                        href={
                          phoneSimulatorTab === "historial"
                            ? activeClientHistoryPath
                            : activeClientPath
                        }
                        target="_blank"
                        className="w-full py-2 px-3 rounded-xl bg-[#EFF6FF] hover:bg-blue-100 text-[#1D4ED8] border border-blue-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>
                          {phoneSimulatorTab === "historial"
                            ? `Abrir Historial /client/${activePlateSlug}`
                            : `Abrir /client/${activePlateSlug} en Vivo`}
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleWhatsAppNotify}
                        className="w-full py-2 px-3 rounded-xl bg-[#1D4ED8] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Notificar avance por WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </>
          )}
        </div>
      </div>

      {/* ================= MODAL IMPRESIÓN DE STICKER QR ================= */}
      {showQrStickerModal && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E2E8F0] text-center space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-bold text-[#0F172A] text-sm">
                  Etiqueta Térmica QR para Parabrisas
                </h3>
              </div>
              <button
                onClick={() => setShowQrStickerModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 border-2 border-dashed border-[#CBD5E1] rounded-2xl bg-[#F8FAFC] flex flex-col items-center space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src="/SVG_redondo.svg"
                  alt="Logo BoxBox"
                  className="w-6 h-6 object-contain shrink-0"
                />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1D4ED8]">
                  BOXBOX PRO · ETIQUETA PARABRISAS
                </span>
              </div>
              <div className="relative">
                <RealisticQrCode
                  value={`${origin}/client/${activeVehicle.plate.replace(/\s+/g, "-")}`}
                  size={128}
                  sizeClass="w-32 h-32"
                  imageSettings={{
                    src: "/SVG_redondo.svg",
                    width: 28,
                    height: 28,
                    excavate: true,
                  }}
                />
              </div>
              <MercosurPlateBadge plate={activeVehicle.plate} />
              <div>
                <p className="text-sm font-extrabold text-[#0F172A]">
                  {activeVehicle.model} ({activeVehicle.year})
                </p>
                <p className="text-xs text-slate-500">
                  {activeVehicle.orderNumber} · {activeVehicle.bayNumber}
                </p>
                <p className="font-mono text-[10px] font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded border border-blue-200 mt-1 break-all">
                  {dynamicClientUrl}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowQrStickerModal(false);
                  triggerToast(
                    "Sticker térmico enviado a impresora Zebra / Brother",
                    `Etiqueta QR lista para el parabrisas de ${activeVehicle.model} (${activeVehicle.plate})`,
                    "success"
                  );
                }}
                className="flex-1 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Etiqueta Parabrisas</span>
              </button>
              <button
                onClick={() => setShowQrStickerModal(false)}
                className="py-2.5 px-4 bg-[#F8FAFC] hover:bg-slate-200/70 text-[#0F172A] border border-[#E2E8F0] text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL DE AYUDA ZERO-SCROLL & RESPONSIVE ================= */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-bold text-[#0F172A] text-sm">
                  BoxBox PRO — Responsive &amp; Zero-Scroll
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <li>
                • <strong>Mobile-First + Desktop Zero-Scroll:</strong> En
                móviles y tablets permite navegación táctil con menú hamburguesa
                y scroll natural; en monitores grandes encaja en 100vh.
              </li>
              <li>
                • <strong>Tree-View de Bahías en Sidebar:</strong> Conmuta entre
                las 3 bahías activas directamente debajo de{" "}
                <em>Órdenes de Trabajo</em>.
              </li>
              <li>
                • <strong>Barra de 5 Pestañas tipo Navegador:</strong>{" "}
                Alterna sin scroll vertical entre <em>1. Ficha Técnica &amp; QR</em>,{" "}
                <em>2. Estado &amp; Telemetría</em>, <em>3. Presupuesto y Costos</em>,{" "}
                <em>4. Inventario y Repuestos</em> y <em>5. Bitácora del Mecánico</em>.
              </li>
            </ul>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* ================= TOAST DE CONFIRMACIÓN ================= */}
      {toast && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 max-w-md bg-[#0F172A] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3">
          <div className="p-2 rounded-xl shrink-0 bg-[#2563EB]/25 text-[#60A5FA]">
            {toast.type === "whatsapp" ? (
              <MessageCircle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
          </div>
          <div className="text-xs leading-relaxed pr-2">
            <p className="font-bold text-white">{toast.title}</p>
            {toast.subtitle && (
              <p className="text-slate-300 mt-0.5">{toast.subtitle}</p>
            )}
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white ml-auto cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
