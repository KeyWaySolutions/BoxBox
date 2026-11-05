"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";

// Types
export type StageIndex = 0 | 1 | 2 | 3 | 4 | 5;
export type NavigationTab =
  | "Órdenes de Trabajo"
  | "Dashboard"
  | "Inventario"
  | "Clientes";
export type AccordionId = 1 | 2 | 3 | 4;

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

const INITIAL_VEHICLES: VehicleOrder[] = [
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
function formatARS(amount: number): string {
  return "$" + Math.round(amount).toLocaleString("es-AR");
}

// Realistic 25x25 Version-2 QR Code SVG component with 3 standard 7x7 finder patterns + alignment square in #0F172A
function RealisticQrCode({
  seed,
  sizeClass = "w-20 h-20",
}: {
  seed: string;
  sizeClass?: string;
}) {
  const gridSize = 25;
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

  for (let r = 16; r <= 20; r++) {
    for (let c = 16; c <= 20; c++) {
      reserved[r][c] = true;
      const isBorder = r === 16 || r === 20 || c === 16 || c === 20;
      const isCenter = r === 18 && c === 18;
      matrix[r][c] = isBorder || isCenter;
    }
  }

  for (let i = 8; i < gridSize - 8; i++) {
    reserved[6][i] = true;
    reserved[i][6] = true;
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!reserved[r][c]) {
        const mix = Math.abs(
          Math.imul(r + 11, 374761393) ^
            Math.imul(c + 23, 668265263) ^
            hash
        );
        matrix[r][c] = mix % 11 < 5;
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${gridSize} ${gridSize}`}
      shapeRendering="crispEdges"
      className={`${sizeClass} bg-white p-1.5 rounded-xl border border-[#E2E8F0] shadow-2xs shrink-0`}
      aria-label="Código QR de trazabilidad BoxBox"
    >
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
    </svg>
  );
}

// Chapa Patente Estilo Mercosur Argentino
function MercosurPlateBadge({
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
    const url = `https://boxbox.app/qr/${activeVehicle.traceId}`;
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
      } (${currentStage.percentage}%). Seguimiento QR: boxbox.app/qr/${
        activeVehicle.traceId
      }"`,
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
        {/* HEADER SUPERIOR COMPACTO Y RESPONSIVO */}
        <header className="bg-white px-4 lg:px-5 py-3 lg:py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] shrink-0 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-extrabold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-blue-200/80 shrink-0">
              {activeTab}
            </span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <h1 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight truncate hidden sm:block">
              Gestión de Reparaciones — Taller Mecánica Central
            </h1>
            <span className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 ml-2">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              18 Vehículos en Taller
            </span>
          </div>

          {/* Search & Quick Header Icons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="relative flex-1 sm:flex-initial w-full sm:w-64 lg:w-80">
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
              className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-slate-600 hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer shrink-0"
              title="Guía de estación BoxBox PRO"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <div className="relative shrink-0">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-slate-600 hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors relative cursor-pointer"
                title="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-white" />
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
          <main className="flex-1 flex flex-col lg:h-full lg:min-h-0 min-w-0 p-3.5 sm:p-4 gap-3 lg:overflow-hidden">
            {/* =====================================================================
                VISTA 1: ÓRDENES DE TRABAJO (ENCABEZADO COMPACTO + 4 ACORDEONES EXCLUSIVOS)
               ===================================================================== */}
            {activeTab === "Órdenes de Trabajo" && (
              <>
                {/* 3. TARJETA DE ENCABEZADO UNIFICADA (FICHA TÉCNICA + QR ADAPTABLES) */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E2E8F0] shadow-xs shrink-0">
                  {/* Bloque Izquierdo y Central (8 columnas en lg - Ficha Técnica) */}
                  <div className="col-span-1 lg:col-span-8 flex flex-col gap-3 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <MercosurPlateBadge plate={activeVehicle.plate} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                              {activeVehicle.bayNumber}
                            </span>
                            <span className="font-mono text-xs font-bold text-slate-500">
                              {activeVehicle.orderNumber}
                            </span>
                          </div>
                          <h2 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight truncate mt-0.5">
                            {activeVehicle.model} {activeVehicle.engineSpec}
                          </h2>
                        </div>
                      </div>

                      {/* Propietario con Contacto Rápido */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 bg-[#F8FAFC] px-3 py-1.5 rounded-xl border border-[#E2E8F0] w-full sm:w-auto">
                        <div className="text-left sm:text-right">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                            Propietario
                          </span>
                          <span className="text-xs font-extrabold text-[#0F172A]">
                            {activeVehicle.ownerName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 pl-2 border-l border-[#E2E8F0]">
                          <button
                            type="button"
                            onClick={handleWhatsAppNotify}
                            title={`WhatsApp a ${activeVehicle.phone}`}
                            className="p-1.5 rounded-lg bg-[#EFF6FF] hover:bg-[#2563EB] text-[#1D4ED8] hover:text-white transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={`tel:${activeVehicle.phone.replace(
                              /[^0-9+]/g,
                              ""
                            )}`}
                            title={activeVehicle.phone}
                            className="p-1.5 rounded-lg bg-white hover:bg-[#EFF6FF] text-slate-600 hover:text-[#2563EB] border border-[#E2E8F0] transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`mailto:${activeVehicle.email}`}
                            title={activeVehicle.email}
                            className="p-1.5 rounded-lg bg-white hover:bg-[#EFF6FF] text-slate-600 hover:text-[#2563EB] border border-[#E2E8F0] transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Grilla Adaptable de Píldoras de Datos Técnicos */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="px-2.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                        <Gauge className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold uppercase text-slate-400 block leading-none">
                            Kilometraje
                          </span>
                          <span className="text-xs font-extrabold text-[#0F172A] truncate block mt-0.5">
                            {activeVehicle.mileage}
                          </span>
                        </div>
                      </div>

                      <div className="px-2.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold uppercase text-slate-400 block leading-none">
                            Motorización
                          </span>
                          <span className="text-xs font-extrabold text-[#0F172A] truncate block mt-0.5">
                            {activeVehicle.engineSpec}
                          </span>
                        </div>
                      </div>

                      <div className="px-2.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold uppercase text-slate-400 block leading-none">
                            Ingreso
                          </span>
                          <span className="text-xs font-extrabold text-[#0F172A] truncate block mt-0.5">
                            {activeVehicle.checkInTime}
                          </span>
                        </div>
                      </div>

                      <div className="px-2.5 py-1.5 rounded-xl bg-[#EFF6FF]/60 border border-blue-200/80 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold uppercase text-[#1D4ED8] block leading-none">
                            Entrega Estimada
                          </span>
                          <span className="text-xs font-extrabold text-[#1D4ED8] truncate block mt-0.5">
                            {activeVehicle.estimatedDelivery}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bloque Derecho (4 columnas en lg - Recuadro QR y Vista Cliente) */}
                  <div className="col-span-1 lg:col-span-4 w-full bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div
                      onClick={() => setIsClientDrawerOpen(true)}
                      className="relative cursor-pointer shrink-0 group"
                      title="Abrir Vista del Cliente"
                    >
                      <RealisticQrCode
                        seed={
                          activeVehicle.id +
                          "-" +
                          activeVehicle.traceId +
                          "-" +
                          activeVehicle.stageIndex
                        }
                        sizeClass="w-20 h-20"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white p-0.5 rounded-md shadow-2xs border border-[#E2E8F0]">
                          <img
                            src="/SVG_redondo.svg"
                            alt="BoxBox QR"
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex-1 min-w-0 flex flex-col justify-between gap-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                          Trazabilidad QR
                        </span>
                        <span className="font-mono text-[10px] font-bold bg-white text-[#0F172A] px-1.5 py-0.5 rounded border border-blue-200">
                          {activeVehicle.traceId}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsClientDrawerOpen((prev) => !prev)}
                        className="w-full py-2 px-3 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Smartphone className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Ver Vista del Cliente</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setShowQrStickerModal(true)}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#1D4ED8] border border-blue-200 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Printer className="w-3 h-3 text-[#2563EB]" />
                          <span>Imprimir QR</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          title="Copiar link de seguimiento"
                          className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#1D4ED8] border border-blue-200 text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          <Copy className="w-3 h-3 text-[#2563EB]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. CONTENIDO EN 4 ACORDEONES EXCLUSIVOS (ADAPTABLES EN MÓVIL Y ZERO-SCROLL EN DESKTOP) */}
                <section className="flex-1 lg:min-h-0 flex flex-col gap-2.5 lg:overflow-hidden">
                  {/* ================= ACORDEÓN 1: GESTIÓN DE ESTADO Y TELEMETRÍA ================= */}
                  {openAccordion === 1 ? (
                    <div className="flex-1 lg:min-h-0 flex flex-col bg-white rounded-2xl border-2 border-[#2563EB]/30 shadow-xs overflow-hidden">
                      {/* Accordion Header (Open) */}
                      <div className="px-3.5 sm:px-4 py-2.5 bg-[#EFF6FF]/60 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-[#2563EB] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                            1
                          </span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                            Gestión de Estado y Telemetría
                          </h3>
                        </div>
                        <span className="text-[11px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white">
                          {currentStage.label} · {currentStage.percentage}%
                          Completado
                        </span>
                      </div>

                      {/* Accordion Body */}
                      <div className="flex-1 lg:min-h-0 lg:overflow-y-auto p-3.5 sm:p-4 flex flex-col justify-between gap-4">
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold text-[#0F172A]">
                                Tarea Activa en {activeVehicle.bayNumber}:{" "}
                                <span className="text-[#2563EB]">
                                  {activeVehicle.activeComponent}
                                </span>
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Toca cualquier etapa del Stepper para actualizar
                                el avance en tiempo real
                              </p>
                            </div>
                            <span className="text-[11px] sm:text-xs font-bold text-[#1D4ED8] bg-[#EFF6FF] px-3 py-1 rounded-lg border border-blue-200">
                              {currentStage.defaultNote}
                            </span>
                          </div>

                          {/* Barra de progreso animada */}
                          <div className="w-full h-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full overflow-hidden">
                            <div
                              style={{ width: `${currentStage.percentage}%` }}
                              className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] transition-all duration-500 rounded-full"
                            />
                          </div>

                          {/* Stepper Interactivo de 6 Etapas (2 cols en móvil, 3 en sm, 6 en md+) */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
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
                                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                    isCurrent
                                      ? "bg-[#EFF6FF] border-2 border-[#2563EB] shadow-xs"
                                      : isCompleted
                                      ? "bg-[#F8FAFC] border-blue-200 hover:bg-[#EFF6FF]/50"
                                      : "bg-white border-[#E2E8F0] hover:border-[#3B82F6]"
                                  }`}
                                >
                                  <div className="flex items-center justify-between w-full mb-2">
                                    <span
                                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
                                        isCompleted
                                          ? "bg-[#1D4ED8] text-white"
                                          : isCurrent
                                          ? "bg-[#2563EB] text-white ring-4 ring-blue-200/70"
                                          : "bg-[#F8FAFC] text-slate-400 border border-[#CBD5E1]"
                                      }`}
                                    >
                                      {isCompleted ||
                                      (isCurrent && stage.id === 5) ? (
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      ) : (
                                        index + 1
                                      )}
                                    </span>
                                    <span
                                      className={`text-[10px] font-bold ${
                                        isCurrent
                                          ? "text-[#1D4ED8]"
                                          : "text-slate-400"
                                      }`}
                                    >
                                      {stage.percentage}%
                                    </span>
                                  </div>
                                  <p
                                    className={`text-xs leading-snug ${
                                      isCurrent
                                        ? "font-extrabold text-[#0F172A]"
                                        : isCompleted
                                        ? "font-bold text-[#1D4ED8]"
                                        : "font-semibold text-slate-500"
                                    }`}
                                  >
                                    {stage.label}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Botones Rápidos Inferiores del Acordeón 1 */}
                        <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2">
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
                              className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] disabled:opacity-40 text-xs font-bold text-[#0F172A] border border-[#E2E8F0] transition-colors cursor-pointer"
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
                              className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                            >
                              Avanzar Etapa →
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={handleWhatsAppNotify}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EFF6FF] hover:bg-[#2563EB] text-[#1D4ED8] hover:text-white border border-blue-200 text-xs font-bold transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Notificar Avance por WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Accordion 1 Collapsed Bar */
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(1)}
                      className="min-h-[3.25rem] py-2 shrink-0 w-full bg-white hover:bg-[#EFF6FF]/40 rounded-xl border border-[#E2E8F0] hover:border-blue-300 px-3.5 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-xs font-extrabold flex items-center justify-center border border-blue-200 shrink-0">
                          1
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                          Gestión de Estado y Telemetría
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                          {currentStage.label} · {currentStage.percentage}%
                          Completado
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    </button>
                  )}

                  {/* ================= ACORDEÓN 2: PRESUPUESTO Y COSTOS ================= */}
                  {openAccordion === 2 ? (
                    <div className="flex-1 lg:min-h-0 flex flex-col bg-white rounded-2xl border-2 border-[#2563EB]/30 shadow-xs overflow-hidden">
                      <div className="px-3.5 sm:px-4 py-2.5 bg-[#EFF6FF]/60 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-[#2563EB] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                            2
                          </span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                            Presupuesto y Costos
                          </h3>
                        </div>
                        <span className="text-[11px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white">
                          Total: {formatARS(totalBudget)} · Mano de Obra +
                          Repuestos
                        </span>
                      </div>

                      <div className="flex-1 lg:min-h-0 lg:overflow-y-auto p-3.5 sm:p-4 flex flex-col justify-between gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">
                              Subtotal Repuestos
                            </span>
                            <p className="text-lg font-black text-[#0F172A] mt-1">
                              {formatARS(financialSummary.partsSubtotal)}
                            </p>
                            <span className="text-[11px] text-slate-500">
                              Insumos y piezas originales
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">
                              Subtotal Mano de Obra
                            </span>
                            <p className="text-lg font-black text-[#0F172A] mt-1">
                              {formatARS(financialSummary.laborSubtotal)}
                            </p>
                            <span className="text-[11px] text-slate-500">
                              Horas técnicas de bahía
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">
                              Estado de Aprobación
                            </span>
                            <div className="mt-1.5">
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
                            <span className="text-[10px] text-slate-400 block mt-1">
                              Clic para conmutar estado
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-blue-200">
                            <span className="text-[10px] font-extrabold uppercase text-[#1D4ED8] block">
                              Total Final Presupuesto
                            </span>
                            <p className="text-xl font-black text-[#1D4ED8] mt-1">
                              {formatARS(totalBudget)}
                            </p>
                            <span className="text-[11px] font-semibold text-[#2563EB]">
                              IVA Incluido · Sincronizado QR
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setOpenAccordion(3)}
                            className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-xs font-bold text-[#0F172A] border border-[#E2E8F0] cursor-pointer"
                          >
                            Ir a Editar Ítems de Repuestos →
                          </button>

                          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={() => {
                                setIsClientDrawerOpen(true);
                                setShowBudgetInPhone(true);
                              }}
                              className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-[#EFF6FF] hover:bg-blue-100 text-[#1D4ED8] border border-blue-200 text-xs font-bold cursor-pointer"
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
                              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Emitir Presupuesto Digital</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Accordion 2 Collapsed Bar */
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(2)}
                      className="min-h-[3.25rem] py-2 shrink-0 w-full bg-white hover:bg-[#EFF6FF]/40 rounded-xl border border-[#E2E8F0] hover:border-blue-300 px-3.5 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-xs font-extrabold flex items-center justify-center border border-blue-200 shrink-0">
                          2
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                          Presupuesto y Costos
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-[11px] sm:text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]">
                          Total: {formatARS(totalBudget)} · Mano de Obra +
                          Repuestos
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    </button>
                  )}

                  {/* ================= ACORDEÓN 3: INVENTARIO Y REPUESTOS ASIGNADOS ================= */}
                  {openAccordion === 3 ? (
                    <div className="flex-1 lg:min-h-0 flex flex-col bg-white rounded-2xl border-2 border-[#2563EB]/30 shadow-xs overflow-hidden">
                      <div className="px-3.5 sm:px-4 py-2.5 bg-[#EFF6FF]/60 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-[#2563EB] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                            3
                          </span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                            Inventario y Repuestos Asignados
                          </h3>
                        </div>
                        <span className="text-[11px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white">
                          {activeVehicle.parts.length} ítems asignados ·{" "}
                          {financialSummary.installedCount} Instalados,{" "}
                          {financialSummary.inProgressCount} En progreso
                        </span>
                      </div>

                      <div className="flex-1 lg:min-h-0 lg:overflow-y-auto p-3.5 flex flex-col justify-between gap-3">
                        {/* Fast Inline Add Part Bar */}
                        <form
                          onSubmit={handleAddPartSubmit}
                          className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-12 gap-2 items-center shrink-0"
                        >
                          <div className="col-span-12 sm:col-span-4">
                            <input
                              type="text"
                              required
                              value={newDesc}
                              onChange={(e) => setNewDesc(e.target.value)}
                              placeholder="+ Agregar repuesto o servicio..."
                              className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                            />
                          </div>
                          <div className="col-span-4 sm:col-span-2">
                            <select
                              value={newCategory}
                              onChange={(e) =>
                                setNewCategory(
                                  e.target.value as "Repuesto" | "Mano de Obra"
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
                              <span>Sumar</span>
                            </button>
                          </div>
                        </form>

                        {/* Interactive Parts Table with Horizontal Scroll Protection */}
                        <div className="overflow-x-auto w-full flex-1 lg:min-h-0">
                          <table className="w-full min-w-[540px] text-left border-collapse">
                            <thead>
                              <tr className="border-b border-[#E2E8F0] text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-[#F8FAFC]">
                                <th className="py-2 px-3">Descripción</th>
                                <th className="py-2 px-2">Cant.</th>
                                <th className="py-2 px-2">Unitario</th>
                                <th className="py-2 px-2">Subtotal</th>
                                <th className="py-2 px-2">Estado</th>
                                <th className="py-2 px-2 text-center">
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
                                    <td className="py-2 px-3 font-bold text-[#0F172A]">
                                      {item.description}
                                    </td>
                                    <td className="py-2 px-2 text-slate-600 font-medium">
                                      {item.quantity} {item.unit}
                                    </td>
                                    <td className="py-2 px-2 text-slate-600 font-medium">
                                      {formatARS(item.unitPrice)}
                                    </td>
                                    <td className="py-2 px-2 font-extrabold text-[#0F172A]">
                                      {formatARS(rowTotal)}
                                    </td>
                                    <td className="py-2 px-2">
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
                                    <td className="py-2 px-2 text-center">
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
                    </div>
                  ) : (
                    /* Accordion 3 Collapsed Bar */
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(3)}
                      className="min-h-[3.25rem] py-2 shrink-0 w-full bg-white hover:bg-[#EFF6FF]/40 rounded-xl border border-[#E2E8F0] hover:border-blue-300 px-3.5 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-xs font-extrabold flex items-center justify-center border border-blue-200 shrink-0">
                          3
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                          Inventario y Repuestos Asignados
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                          {activeVehicle.parts.length} ítems asignados ·{" "}
                          {financialSummary.installedCount} Instalados,{" "}
                          {financialSummary.inProgressCount} En progreso
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    </button>
                  )}

                  {/* ================= ACORDEÓN 4: BITÁCORA Y NOTAS DEL MECÁNICO ================= */}
                  {openAccordion === 4 ? (
                    <div className="flex-1 lg:min-h-0 flex flex-col bg-white rounded-2xl border-2 border-[#2563EB]/30 shadow-xs overflow-hidden">
                      <div className="px-3.5 sm:px-4 py-2.5 bg-[#EFF6FF]/60 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-[#2563EB] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                            4
                          </span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                            Bitácora y Notas del Mecánico
                          </h3>
                        </div>
                        <span className="text-[11px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white">
                          Últ. actualización: {latestEvent?.time} por{" "}
                          {latestEvent?.actor}
                        </span>
                      </div>

                      <div className="flex-1 lg:min-h-0 lg:overflow-y-auto p-3.5 flex flex-col justify-between gap-3">
                        {/* Fast Note Input + Photo Evidence Button */}
                        <form
                          onSubmit={handleAddMechanicNote}
                          className="flex flex-wrap items-center gap-2 shrink-0"
                        >
                          <input
                            type="text"
                            value={mechanicNoteInput}
                            onChange={(e) =>
                              setMechanicNoteInput(e.target.value)
                            }
                            placeholder="Escribir observación técnica para la bitácora o el cliente..."
                            className="flex-1 min-w-[200px] px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:border-[#2563EB]"
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer shrink-0"
                          >
                            Registrar Nota
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
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EFF6FF] hover:bg-blue-100 text-[#1D4ED8] border border-blue-200 text-xs font-bold cursor-pointer shrink-0"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>Subir Foto</span>
                          </button>
                        </form>

                        {/* Compact Timeline List */}
                        <div className="space-y-2 lg:overflow-y-auto pr-1">
                          {activeVehicle.timeline.map((item) => (
                            <div
                              key={item.id}
                              className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-xs"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
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
                  ) : (
                    /* Accordion 4 Collapsed Bar */
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(4)}
                      className="min-h-[3.25rem] py-2 shrink-0 w-full bg-white hover:bg-[#EFF6FF]/40 rounded-xl border border-[#E2E8F0] hover:border-blue-300 px-3.5 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-xs font-extrabold flex items-center justify-center border border-blue-200 shrink-0">
                          4
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                          Bitácora y Notas del Mecánico
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F8FAFC] text-slate-600 border border-[#E2E8F0]">
                          Últ. actualización: {latestEvent?.time} por{" "}
                          {latestEvent?.actor}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    </button>
                  )}
                </section>
              </>
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
                VISTA 4: CLIENTES (HISTORIAL CLÍNICO VEHICULAR RESPONSIVE)
               ===================================================================== */}
            {activeTab === "Clientes" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 lg:min-h-0 lg:overflow-y-auto items-start">
                {vehicles.map((v) => {
                  const st = STAGES[v.stageIndex];
                  const budget = v.parts.reduce(
                    (sum, p) => sum + p.quantity * p.unitPrice,
                    0
                  );
                  return (
                    <div
                      key={v.id}
                      className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs p-5 flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base font-extrabold text-[#0F172A]">
                              {v.ownerName}
                            </h3>
                            <p className="text-xs text-slate-500">{v.email}</p>
                          </div>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                            {v.historicalServices} visitas
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-2">
                          <div>
                            <p className="text-xs font-extrabold text-[#0F172A]">
                              {v.model} ({v.year})
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {v.mileage} · {v.engineSpec}
                            </p>
                          </div>
                          <MercosurPlateBadge plate={v.plate} size="sm" />
                        </div>

                        <div className="flex justify-between text-xs pt-1">
                          <span className="text-slate-500">Orden activa:</span>
                          <span className="font-extrabold text-[#1D4ED8]">
                            {st.label} · {formatARS(budget)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVehicleId(v.id);
                          setActiveTab("Órdenes de Trabajo");
                        }}
                        className="w-full py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer"
                      >
                        Abrir Estación de Trabajo →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </main>

          {/* ================= 5. SIMULADOR MÓVIL DEL CLIENTE (DRAWER RESPONSIVO) ================= */}
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
                        Vista del Cliente (En Vivo)
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
                    <div className="w-full max-w-[285px] scale-95 sm:scale-100 origin-top bg-[#0F172A] rounded-[38px] p-2.5 shadow-xl border-4 border-slate-800 relative">
                      <div className="w-24 h-4 bg-[#0F172A] rounded-b-xl mx-auto absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                        <div className="w-8 h-1 bg-slate-700 rounded-full" />
                      </div>

                      <div className="bg-white rounded-[28px] pt-6 pb-3.5 px-3.5 text-center flex flex-col justify-between min-h-[430px] relative overflow-hidden">
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
                          <h4 className="text-base font-black text-[#0F172A]">
                            ¡HOLA {activeVehicle.ownerFirstName}!
                          </h4>
                          <p className="text-xs font-bold text-slate-600">
                            Tu {activeVehicle.model}
                          </p>
                          <div className="flex justify-center">
                            <MercosurPlateBadge
                              plate={activeVehicle.plate}
                              size="sm"
                            />
                          </div>
                        </div>

                        <div className="my-2 py-2 px-2.5 rounded-xl bg-[#EFF6FF] border border-blue-200">
                          <p className="text-xs font-extrabold text-[#1D4ED8] uppercase">
                            {currentStage.label} ({currentStage.percentage}%)
                          </p>
                          <p className="text-[10px] font-medium text-slate-600">
                            ({activeVehicle.activeComponent})
                          </p>
                          <div className="w-full h-1.5 bg-blue-200/70 rounded-full overflow-hidden mt-1.5">
                            <div
                              style={{ width: `${currentStage.percentage}%` }}
                              className="h-full bg-[#2563EB] transition-all duration-500 rounded-full"
                            />
                          </div>
                        </div>

                        {!showBudgetInPhone ? (
                          <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] my-1">
                            <img
                              src={activeVehicle.photoUrl}
                              alt={activeVehicle.photoCaption}
                              className="w-full h-28 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-transparent to-transparent flex items-end p-2">
                              <p className="text-[10px] text-white font-medium line-clamp-1">
                                {activeVehicle.photoCaption}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="my-1 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-2.5 text-left max-h-32 overflow-y-auto">
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
                          onClick={() => setShowBudgetInPhone((prev) => !prev)}
                          className="w-full py-2 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer"
                        >
                          {showBudgetInPhone
                            ? `Ocultar (${formatARS(totalBudget)})`
                            : `Ver Presupuesto (${formatARS(totalBudget)})`}
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleWhatsAppNotify}
                      className="mt-2.5 w-full max-w-[285px] py-2 px-3 rounded-xl bg-[#1D4ED8] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Notificar avance por WhatsApp</span>
                    </button>
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
                  Impresión de Sticker Térmico BoxBox
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
                  BOXBOX · TALLER MECÁNICA CENTRAL
                </span>
              </div>
              <div className="relative">
                <RealisticQrCode
                  seed={activeVehicle.id + "-sticker-print"}
                  sizeClass="w-32 h-32"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-0.5 rounded-md shadow-2xs border border-[#E2E8F0]">
                    <img
                      src="/SVG_redondo.svg"
                      alt="Insignia QR BoxBox"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                </div>
              </div>
              <MercosurPlateBadge plate={activeVehicle.plate} />
              <div>
                <p className="text-sm font-extrabold text-[#0F172A]">
                  {activeVehicle.model} ({activeVehicle.year})
                </p>
                <p className="text-xs text-slate-500">
                  {activeVehicle.orderNumber} · {activeVehicle.traceId}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowQrStickerModal(false);
                  triggerToast(
                    "Sticker QR enviado a impresora térmica",
                    `${activeVehicle.model} (${activeVehicle.plate}) · ${activeVehicle.traceId}`,
                    "success"
                  );
                }}
                className="flex-1 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Ahora</span>
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
                • <strong>4 Acordeones Exclusivos:</strong> Alterna entre{" "}
                <em>Telemetría</em>, <em>Presupuesto</em>, <em>Repuestos</em> y{" "}
                <em>Bitácora</em> con resúmenes en vivo.
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
