"use client";

import React, { useState, useMemo } from "react";
import {
  Car,
  LayoutDashboard,
  ClipboardList,
  Users,
  Package,
  BarChart3,
  Settings,
  Search,
  HelpCircle,
  Bell,
  Phone,
  Mail,
  ExternalLink,
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
} from "lucide-react";

// Types
export type StageIndex = 0 | 1 | 2 | 3 | 4 | 5;

export interface StageInfo {
  id: StageIndex;
  label: string;
  percentage: number;
  defaultNote: string;
}

export interface PartItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  status: "Instalado" | "En progreso";
}

export interface TimelineEvent {
  id: string;
  time: string;
  text: string;
  completed: boolean;
}

export interface VehicleOrder {
  id: string;
  name: string;
  model: string;
  plate: string;
  orderNumber: string;
  engineSpec: string;
  ownerName: string;
  ownerFirstName: string;
  phone: string;
  email: string;
  stageIndex: StageIndex;
  activeComponent: string;
  estimatedDelivery: string;
  photoUrl: string;
  photoCaption: string;
  parts: PartItem[];
  timeline: TimelineEvent[];
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
    defaultNote: "Reparación en progreso",
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
    name: "Ford Focus (AE 123 CD)",
    model: "Ford Focus",
    plate: "AE 123 CD",
    orderNumber: "OT-2026-104",
    engineSpec: "Motor 2.0L Duratec · 68.400 km",
    ownerName: "Luis Pérez",
    ownerFirstName: "LUIS",
    phone: "(116) 656 1670",
    email: "luisperez@gmail.com",
    stageIndex: 2, // En Reparación (65%)
    activeComponent: "Embrague",
    estimatedDelivery: "Miércoles 14:00hs",
    photoUrl:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=85",
    photoCaption: "Reemplazo de Kit de Embrague y revisión de carcasa",
    parts: [
      {
        id: "p1",
        description: "Kit Embrague",
        quantity: 1,
        unit: "",
        unitPrice: 180000,
        status: "Instalado",
      },
      {
        id: "p2",
        description: "Mano de Obra",
        quantity: 3,
        unit: "hrs",
        unitPrice: 25000,
        status: "En progreso",
      },
      {
        id: "p3",
        description: "Aceite Transmisión",
        quantity: 2,
        unit: "L",
        unitPrice: 15000,
        status: "Instalado",
      },
    ],
    timeline: [
      {
        id: "t1",
        time: "12:00",
        text: "Reparación en progreso - Embrague (Carlos García)",
        completed: true,
      },
      {
        id: "t2",
        time: "09:30",
        text: "Diagnóstico completo - Falla en embrague detectada",
        completed: true,
      },
      {
        id: "t3",
        time: "08:15",
        text: "Vehículo ingresado",
        completed: false,
      },
    ],
  },
  {
    id: "gol-aa456zz",
    name: "VW Gol Trend (AA 456 ZZ)",
    model: "VW Gol Trend",
    plate: "AA 456 ZZ",
    orderNumber: "OT-2026-108",
    engineSpec: "Motor 1.6L MSI · 94.120 km",
    ownerName: "María Gómez",
    ownerFirstName: "MARÍA",
    phone: "(114) 892 3310",
    email: "mariagomez@gmail.com",
    stageIndex: 1, // Diagnóstico (35%)
    activeComponent: "Tren Delantero y Frenos ABS",
    estimatedDelivery: "Jueves 11:30hs",
    photoUrl:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=85",
    photoCaption: "Inspección de discos ventilados y sensores ABS",
    parts: [
      {
        id: "g1",
        description: "Juego Pastillas de Freno Bosch",
        quantity: 1,
        unit: "",
        unitPrice: 68000,
        status: "Instalado",
      },
      {
        id: "g2",
        description: "Rectificación Discos Delanteros",
        quantity: 2,
        unit: "u.",
        unitPrice: 22000,
        status: "En progreso",
      },
      {
        id: "g3",
        description: "Diagnóstico Escáner Electrónico",
        quantity: 1,
        unit: "srv",
        unitPrice: 35000,
        status: "Instalado",
      },
    ],
    timeline: [
      {
        id: "gt1",
        time: "11:15",
        text: "Diagnóstico en progreso - Sistema ABS (Carlos García)",
        completed: true,
      },
      {
        id: "gt2",
        time: "09:00",
        text: "Recepción e inspección de tren delantero",
        completed: true,
      },
      {
        id: "gt3",
        time: "08:30",
        text: "Vehículo ingresado",
        completed: false,
      },
    ],
  },
  {
    id: "hilux-af890xy",
    name: "Toyota Hilux (AF 890 XY)",
    model: "Toyota Hilux",
    plate: "AF 890 XY",
    orderNumber: "OT-2026-112",
    engineSpec: "Motor 2.8L TDI 4x4 · 50.200 km",
    ownerName: "Roberto Sánchez",
    ownerFirstName: "ROBERTO",
    phone: "(115) 421 9088",
    email: "rsanchez@agro.com.ar",
    stageIndex: 4, // Control Final (92%)
    activeComponent: "Kit Distribución y Service 50k",
    estimatedDelivery: "Hoy 18:00hs",
    photoUrl:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=85",
    photoCaption: "Control final de tensión de correa e inyección",
    parts: [
      {
        id: "h1",
        description: "Kit Distribución Original Toyota",
        quantity: 1,
        unit: "",
        unitPrice: 245000,
        status: "Instalado",
      },
      {
        id: "h2",
        description: "Aceite Sintético 5W-30 + Filtros",
        quantity: 8,
        unit: "L",
        unitPrice: 14000,
        status: "Instalado",
      },
      {
        id: "h3",
        description: "Mano de Obra Especializada 4x4",
        quantity: 4,
        unit: "hrs",
        unitPrice: 30000,
        status: "Instalado",
      },
    ],
    timeline: [
      {
        id: "ht1",
        time: "15:10",
        text: "Control Final - Prueba dinámica aprobada (Carlos García)",
        completed: true,
      },
      {
        id: "ht2",
        time: "11:45",
        text: "Instalación de Kit de Distribución completada",
        completed: true,
      },
      {
        id: "ht3",
        time: "08:00",
        text: "Vehículo ingresado",
        completed: false,
      },
    ],
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

  // Draw standard 7x7 QR Finder Pattern (outer 7x7 ring, 5x5 white ring, 3x3 solid center) + 1px quiet separator
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

  // Three corner finder squares
  placeFinderPattern(0, 0);
  placeFinderPattern(0, gridSize - 7);
  placeFinderPattern(gridSize - 7, 0);

  // Standard 5x5 Alignment Pattern at bottom-right (row 16, col 16)
  for (let r = 16; r <= 20; r++) {
    for (let c = 16; c <= 20; c++) {
      reserved[r][c] = true;
      const isBorder = r === 16 || r === 20 || c === 16 || c === 20;
      const isCenter = r === 18 && c === 18;
      matrix[r][c] = isBorder || isCenter;
    }
  }

  // Timing patterns (row 6 and col 6)
  for (let i = 8; i < gridSize - 8; i++) {
    reserved[6][i] = true;
    reserved[i][6] = true;
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Deterministic hash from vehicle seed
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  // Populate remaining data modules
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
      className={`${sizeClass} bg-white p-1.5 rounded-lg border border-[#E2E8F0] shadow-2xs shrink-0`}
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

// Stylized License Plate Badge (Chapa Patente Moderna)
function LicensePlateBadge({ plate }: { plate: string }) {
  return (
    <div className="inline-flex flex-col overflow-hidden rounded-md border-2 border-[#CBD5E1] bg-white shadow-2xs shrink-0">
      <div className="bg-[#2563EB] h-1.5 w-full flex items-center justify-center" />
      <span className="px-2.5 py-0.5 font-mono text-xs font-extrabold tracking-widest text-[#0F172A] leading-tight">
        {plate}
      </span>
    </div>
  );
}

export default function MecaniQDashboard() {
  const [vehicles, setVehicles] = useState<VehicleOrder[]>(INITIAL_VEHICLES);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    INITIAL_VEHICLES[0].id
  );
  const [activeNav, setActiveNav] = useState<string>("Dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddPartModal, setShowAddPartModal] = useState<boolean>(false);
  const [showBudgetInPhone, setShowBudgetInPhone] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [showOrdersDrawer, setShowOrdersDrawer] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // New part form states
  const [newDesc, setNewDesc] = useState<string>("");
  const [newQty, setNewQty] = useState<string>("1");
  const [newUnit, setNewUnit] = useState<string>("u.");
  const [newPrice, setNewPrice] = useState<string>("");
  const [newStatus] = useState<"Instalado" | "En progreso">("En progreso");

  // Toast message state
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
    }, 4200);
  };

  // Currently active vehicle
  const activeVehicle = useMemo(
    () =>
      vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0],
    [vehicles, selectedVehicleId]
  );

  const currentStage = STAGES[activeVehicle.stageIndex];

  // Calculate total budget for the active vehicle
  const totalBudget = useMemo(() => {
    return activeVehicle.parts.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
  }, [activeVehicle.parts]);

  // Search filter matching vehicles
  const matchingVehicles = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.plate.toLowerCase().includes(q) ||
        v.ownerName.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q)
    );
  }, [vehicles, searchQuery]);

  // Filtered parts if search matches part names
  const displayedParts = useMemo(() => {
    if (!searchQuery.trim()) return activeVehicle.parts;
    const q = searchQuery.toLowerCase();
    const matchesVehicle =
      activeVehicle.name.toLowerCase().includes(q) ||
      activeVehicle.ownerName.toLowerCase().includes(q);
    if (matchesVehicle) return activeVehicle.parts;
    const filtered = activeVehicle.parts.filter((p) =>
      p.description.toLowerCase().includes(q)
    );
    return filtered.length > 0 ? filtered : activeVehicle.parts;
  }, [activeVehicle, searchQuery]);

  // Handler: Change Stage in Stepper
  const handleStageChange = (newStageIdx: StageIndex) => {
    const stageObj = STAGES[newStageIdx];
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);

    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== activeVehicle.id) return v;
        const newEvent: TimelineEvent = {
          id: `ev-${Date.now()}`,
          time: timeStr,
          text: `${stageObj.label} - ${v.activeComponent} (Carlos García)`,
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
      `Se registró en el historial de ${activeVehicle.model} (${activeVehicle.plate}) y se sincronizó con BoxBox QR.`,
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
        "El presupuesto total se recalculó automáticamente.",
        "info"
      );
    }
  };

  // Handler: Add New Part / Service
  const handleAddPartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Math.max(1, Number(newQty) || 1);
    const price = Math.max(0, Number(newPrice.replace(/\./g, "")) || 0);
    if (!newDesc.trim() || price <= 0) return;

    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);

    const createdPart: PartItem = {
      id: `part-${Date.now()}`,
      description: newDesc.trim(),
      quantity: qty,
      unit: newUnit === "u." ? "" : newUnit,
      unitPrice: price,
      status: newStatus,
    };

    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== activeVehicle.id) return v;
        const newEvent: TimelineEvent = {
          id: `ev-${Date.now()}`,
          time: timeStr,
          text: `Repuesto/Servicio agregado: ${createdPart.description} (${formatARS(
            qty * price
          )})`,
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
    setShowAddPartModal(false);

    triggerToast(
      `Agregado: ${createdPart.description}`,
      `Nuevo total actualizado en vivo: ${formatARS(totalBudget + qty * price)}`,
      "success"
    );
  };

  // Handler: Copy tracking link
  const handleCopyLink = () => {
    const url = `https://boxbox.app/qr/${activeVehicle.plate.replace(
      /\s+/g,
      "-"
    )}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    triggerToast(
      "Link de seguimiento BoxBox copiado",
      url,
      "success"
    );
  };

  // Handler: WhatsApp notification
  const handleWhatsAppNotify = () => {
    triggerToast(
      `Notificación enviada a ${activeVehicle.ownerName} (${activeVehicle.phone})`,
      `"¡Hola ${
        activeVehicle.ownerName.split(" ")[0]
      }! Tu ${activeVehicle.model} (${activeVehicle.plate}) está en etapa: ${
        currentStage.label
      } (${currentStage.percentage}%). Presupuesto: ${formatARS(
        totalBudget
      )}."`,
      "whatsapp"
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row font-sans selection:bg-[#EFF6FF] selection:text-[#1D4ED8]">
      {/* ================= 1. SIDEBAR IZQUIERDO FIJO ================= */}
      <aside className="w-full lg:w-60 bg-white border-b lg:border-b-0 lg:border-r border-[#E2E8F0] flex flex-col justify-between shrink-0 lg:min-h-screen z-20">
        <div>
          {/* Logo Brand: BoxBox */}
          <div className="px-5 pt-4 pb-3.5 flex items-center gap-3 border-b border-[#E2E8F0]">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-blue-200/80 flex items-center justify-center text-[#2563EB] shadow-2xs">
              <Car className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-[#0F172A]">
                  Box<span className="text-[#2563EB]">Box</span>
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200/70">
                  PRO
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500">
                Taller Central
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1" aria-label="Menú Principal">
            {[
              {
                name: "Dashboard",
                icon: LayoutDashboard,
                badge: null,
                subItem: null,
              },
              {
                name: "Órdenes de Trabajo",
                icon: ClipboardList,
                badge: "18",
                subItem: "Lista Activa",
              },
              { name: "Clientes", icon: Users, badge: null, subItem: null },
              { name: "Inventario", icon: Package, badge: null, subItem: null },
              { name: "Reportes", icon: BarChart3, badge: null, subItem: null },
              {
                name: "Configuraciones",
                icon: Settings,
                badge: null,
                subItem: null,
              },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name;
              return (
                <div key={item.name}>
                  <button
                    onClick={() => {
                      setActiveNav(item.name);
                      if (item.name === "Órdenes de Trabajo") {
                        setShowOrdersDrawer(true);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#EFF6FF] text-[#1D4ED8] font-semibold shadow-2xs ring-1 ring-[#2563EB]/15"
                        : "text-slate-600 hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? "text-[#2563EB]" : "text-slate-400"
                        }`}
                      />
                      {item.name}
                    </span>
                    {item.badge && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? "bg-[#2563EB] text-white"
                            : "bg-[#EFF6FF] text-[#1D4ED8]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                  {item.subItem && (
                    <button
                      onClick={() => setShowOrdersDrawer(true)}
                      className="ml-10 mt-0.5 mb-1 text-xs font-medium text-slate-400 hover:text-[#2563EB] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>• {item.subItem}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Mechanic Profile & Secondary Logo */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-blue-200/60 flex items-center justify-center text-[#2563EB]">
              <Car className="w-4 h-4" />
            </div>
            <div className="leading-none">
              <p className="text-xs font-bold text-[#0F172A]">
                BoxBox · Taller Central
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sucursal Principal · Bahías 1-6
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1D4ED8] to-[#3B82F6] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                  CG
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-2 ring-white"
                  title="Activo"
                />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-[#0F172A]">
                  Carlos García
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Mecánico Jefe
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </aside>

      {/* ================= CONTENEDOR PRINCIPAL ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER SUPERIOR */}
        <header className="bg-white px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] font-extrabold text-xs border border-blue-200/80">
                BoxBox
              </span>
              <h1 className="text-lg md:text-xl font-extrabold text-[#0F172A] tracking-tight">
                Gestión de Reparaciones - Taller Mecánica Central
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2563EB]" />
              Órdenes Activas: 18 Vehículos en Taller
              <span className="text-slate-300">|</span>
              <span className="text-[#1D4ED8] font-semibold">
                Trazabilidad BoxBox QR en Vivo
              </span>
            </p>
          </div>

          {/* Search Bar & Header Icons */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <div className="relative w-72 sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por patente, cliente o modelo..."
                className="w-full pl-9 pr-8 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Search Dropdown Results */}
              {searchQuery.trim() !== "" && matchingVehicles.length > 0 && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-1.5 z-40">
                  <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Vehículos encontrados ({matchingVehicles.length})
                  </div>
                  {matchingVehicles.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVehicleId(v.id);
                        setSearchQuery("");
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-[#EFF6FF] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">
                          {v.model} · {v.plate}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Cliente: {v.ownerName}
                        </p>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8]">
                        {STAGES[v.stageIndex].label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-slate-600 hover:text-[#2563EB] hover:bg-[#EFF6FF] hover:border-blue-200 transition-colors cursor-pointer"
              title="Guía rápida de BoxBox"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-slate-600 hover:text-[#2563EB] hover:bg-[#EFF6FF] hover:border-blue-200 transition-colors relative cursor-pointer"
                title="Notificaciones del taller"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-white" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-3 z-40">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A]">
                      Notificaciones BoxBox
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#EFF6FF] border border-blue-200/70">
                      <p className="font-semibold text-[#0F172A]">
                        {activeVehicle.ownerName} escaneó el código QR
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Consultó el avance de {activeVehicle.model} (
                        {activeVehicle.plate}) hace 4 min.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                      <p className="font-semibold text-[#0F172A]">
                        Repuesto verificado en bahía
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Control técnico registrado por Carlos García.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ================= GRID PRINCIPAL DE 3 COLUMNAS DEL DASHBOARD ================= */}
        <main className="flex-1 p-4 lg:p-5 grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          {/* -------- COLUMNA IZQUIERDA (3 cols): FICHA DEL VEHÍCULO, QR REALISTA Y TIMELINE -------- */}
          <section className="xl:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs p-4 flex flex-col justify-between space-y-3.5">
            {/* Selector Rápido de Vehículos de Prueba */}
            <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
              <label
                htmlFor="vehicle-selector"
                className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] mb-1.5 flex items-center justify-between"
              >
                <span>Vehículo Activo</span>
                <span className="text-[10px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded">
                  3 en bahía
                </span>
              </label>
              <select
                id="vehicle-selector"
                value={selectedVehicleId}
                onChange={(e) => {
                  setSelectedVehicleId(e.target.value);
                  setShowBudgetInPhone(false);
                }}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#0F172A] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.model} · {v.plate} ({v.ownerName})
                  </option>
                ))}
              </select>
            </div>

            {/* Datos del Vehículo (Jerarquía corregida: Modelo en una sola línea limpia + Badge Patente) */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Vehículo
              </span>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight leading-none">
                  {activeVehicle.model}
                </h2>
                <LicensePlateBadge plate={activeVehicle.plate} />
              </div>
              <p className="text-xs text-slate-500 pt-0.5">
                Orden{" "}
                <span className="font-semibold text-[#0F172A]">
                  {activeVehicle.orderNumber}
                </span>{" "}
                · {activeVehicle.engineSpec}
              </p>
            </div>

            {/* Datos del Propietario */}
            <div className="pt-2.5 border-t border-[#E2E8F0] space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Propietario
              </span>
              <a
                href={`mailto:${activeVehicle.email}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline"
              >
                <span>{activeVehicle.ownerName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="space-y-1 pt-0.5 text-xs text-slate-600">
                <a
                  href={`tel:${activeVehicle.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 hover:text-[#2563EB] transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                  <span>{activeVehicle.phone}</span>
                </a>
                <a
                  href={`mailto:${activeVehicle.email}`}
                  className="flex items-center gap-2 hover:text-[#2563EB] transition-colors font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                  <span className="truncate">{activeVehicle.email}</span>
                </a>
              </div>
            </div>

            {/* Bloque Código QR Realista */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 space-y-2.5">
              <div className="flex items-center gap-3">
                <RealisticQrCode
                  seed={
                    activeVehicle.id +
                    "-" +
                    activeVehicle.plate +
                    "-" +
                    activeVehicle.stageIndex
                  }
                />
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded-md border border-blue-200/80">
                    <QrCode className="w-3 h-3 text-[#2563EB]" /> BoxBox QR
                  </span>
                  <p className="text-xs font-bold text-[#0F172A] leading-snug">
                    Escanea para historial del vehículo
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Trazabilidad en vivo 24/7
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] hover:text-[#2563EB] hover:border-[#3B82F6] hover:bg-[#EFF6FF]/50 text-[11px] font-semibold shadow-2xs transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Imprimir QR</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] hover:text-[#2563EB] hover:border-[#3B82F6] hover:bg-[#EFF6FF]/50 text-[11px] font-semibold shadow-2xs transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Copiar Link</span>
                </button>
              </div>
            </div>

            {/* Timeline de Historial */}
            <div className="pt-2 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Historial del Vehículo
                </h3>
                <span className="text-[11px] text-[#2563EB] font-semibold">
                  {activeVehicle.timeline.length} registros
                </span>
              </div>

              <div className="relative pl-1.5 space-y-3 max-h-48 overflow-y-auto pr-1">
                {activeVehicle.timeline.map((item, idx) => {
                  const isLast = idx === activeVehicle.timeline.length - 1;
                  return (
                    <div
                      key={item.id}
                      className="relative flex items-start gap-2.5 text-xs"
                    >
                      {/* Vertical connector line */}
                      {!isLast && (
                        <span
                          className="absolute left-[7px] top-4 -bottom-3.5 w-[1.5px] bg-[#E2E8F0]"
                          aria-hidden="true"
                        />
                      )}

                      {item.completed ? (
                        <span className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-white border-2 border-[#CBD5E1] shrink-0 mt-0.5" />
                      )}

                      <div className="leading-snug text-slate-600">
                        <span className="font-bold text-[#0F172A]">
                          {item.time}:
                        </span>{" "}
                        <span>{item.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* -------- COLUMNA CENTRAL (6 cols): KPIs COMPACTOS, STEPPER AZUL Y TABLA DE REPUESTOS -------- */}
          <section className="xl:col-span-6 space-y-3.5">
            {/* Fila Superior de KPIs Compactos (para que Repuestos y Servicios se vea completa sin scroll) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Tarjeta 1: Volumen por Estado (Etiquetas completas sin truncar y paleta Azul) */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
                    Volumen por Estado
                  </h3>
                  <span className="text-[11px] font-semibold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                    18 activos
                  </span>
                </div>

                <div className="flex items-end gap-2 h-24 pt-2">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between h-full text-[10px] text-slate-400 font-medium pr-1 pb-5">
                    <span>200</span>
                    <span>100</span>
                    <span>0</span>
                  </div>

                  {/* 4 Bars with full readable labels ("Espera", "Diagnóstico", "Reparación", "Listo") */}
                  <div className="flex-1 grid grid-cols-4 gap-1.5 items-end h-full">
                    {[
                      {
                        label: "Espera",
                        height: "82%",
                        value: "142",
                        color: "bg-[#1D4ED8]",
                      },
                      {
                        label: "Diagnóstico",
                        height: "56%",
                        value: "86",
                        color: "bg-[#2563EB]",
                      },
                      {
                        label: "Reparación",
                        height: "46%",
                        value: "68",
                        color: "bg-[#3B82F6]",
                      },
                      {
                        label: "Listo",
                        height: "28%",
                        value: "34",
                        color: "bg-[#60A5FA]",
                      },
                    ].map((bar) => (
                      <div
                        key={bar.label}
                        className="flex flex-col items-center justify-end h-full group"
                      >
                        <div className="w-full flex-1 flex items-end justify-center border-b border-[#E2E8F0] pb-1">
                          <div
                            style={{ height: bar.height }}
                            className={`w-full max-w-[30px] rounded-t-md ${bar.color} transition-all duration-200 group-hover:opacity-90 relative`}
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-[#0F172A] text-white px-1.5 py-0.5 rounded pointer-events-none">
                              {bar.value}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600 mt-1 whitespace-nowrap">
                          {bar.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tarjeta 2: Ingresos Mensuales (Paleta Azul Corporativa) */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
                    Ingresos Mensuales
                  </h3>
                  <span className="text-[11px] font-semibold text-[#1D4ED8] bg-[#EFF6FF] border border-blue-200/60 px-2 py-0.5 rounded-full">
                    +18.4% mes
                  </span>
                </div>

                <div className="flex items-end gap-2 h-24 pt-2">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between h-full text-[10px] text-slate-400 font-medium pr-1 pb-5">
                    <span>$150k</span>
                    <span>$100k</span>
                    <span>$0</span>
                  </div>

                  {/* Bars */}
                  <div className="flex-1 grid grid-cols-4 gap-2 items-end h-full">
                    {[
                      {
                        label: "Ago",
                        height: "45%",
                        value: "$64k",
                        color: "bg-[#93C5FD]",
                      },
                      {
                        label: "Sep",
                        height: "68%",
                        value: "$105k",
                        color: "bg-[#60A5FA]",
                      },
                      {
                        label: "Oct",
                        height: "56%",
                        value: "$88k",
                        color: "bg-[#3B82F6]",
                      },
                      {
                        label: "Nov",
                        height: "88%",
                        value: "$142k",
                        color: "bg-[#1D4ED8]",
                      },
                    ].map((bar) => (
                      <div
                        key={bar.label}
                        className="flex flex-col items-center justify-end h-full group"
                      >
                        <div className="w-full flex-1 flex items-end justify-center border-b border-[#E2E8F0] pb-1">
                          <div
                            style={{ height: bar.height }}
                            className={`w-full max-w-[30px] rounded-t-md ${bar.color} transition-all duration-200 group-hover:opacity-90 relative`}
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-[#0F172A] text-white px-1.5 py-0.5 rounded pointer-events-none">
                              {bar.value}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600 mt-1">
                          {bar.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta Central: GESTIÓN DE ESTADO (STEPPER DE 6 PASOS EN AZUL CORPORATIVO) */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Gestión de Estado
                  </h3>
                  <p className="text-xs text-slate-500">
                    Haz clic en cualquier etapa para actualizar el progreso en
                    vivo
                  </p>
                </div>

                <button
                  onClick={() => setShowBudgetInPhone(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFF6FF] hover:bg-blue-100/80 text-[#1D4ED8] border border-blue-200/80 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Ver Presupuesto</span>
                </button>
              </div>

              {/* Stepper Horizontal de 6 Pasos (Estricto Azul y Blanco) */}
              <div className="relative pt-5 pb-1 px-1">
                <div className="grid grid-cols-6 relative">
                  {STAGES.map((stage, index) => {
                    const isCompleted = index < activeVehicle.stageIndex;
                    const isCurrent = index === activeVehicle.stageIndex;
                    const isLastStep = index === STAGES.length - 1;

                    return (
                      <div
                        key={stage.id}
                        className="flex flex-col items-center relative z-10"
                      >
                        {/* Línea conectora hacia el siguiente paso */}
                        {!isLastStep && (
                          <div
                            className="absolute top-3.5 left-1/2 w-full h-[3px] -z-10"
                            aria-hidden="true"
                          >
                            <div
                              className={`h-full transition-all duration-300 ${
                                isCompleted
                                  ? "bg-[#1D4ED8]"
                                  : isCurrent
                                  ? "bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#E2E8F0]"
                                  : "bg-[#E2E8F0]"
                              }`}
                            />
                          </div>
                        )}

                        {/* Porcentaje flotante sobre el paso actual */}
                        {isCurrent && (
                          <span className="absolute -top-6 text-[11px] font-extrabold px-2 py-0.5 rounded-full text-[#1D4ED8] bg-[#EFF6FF] border border-blue-200 shadow-2xs">
                            {stage.percentage}%
                          </span>
                        )}

                        {/* Botón Circular del Paso */}
                        <button
                          type="button"
                          onClick={() => handleStageChange(stage.id)}
                          title={`Cambiar a ${stage.label} (${stage.percentage}%)`}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none ${
                            isCompleted
                              ? "bg-[#1D4ED8] text-white shadow-2xs hover:bg-[#2563EB]"
                              : isCurrent
                              ? "bg-[#2563EB] text-white ring-4 ring-[#DBEAFE] shadow-xs"
                              : "bg-white border-2 border-[#CBD5E1] text-slate-400 hover:border-[#3B82F6] hover:text-[#2563EB]"
                          }`}
                        >
                          {isCompleted || (isCurrent && stage.id === 5) ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : isCurrent ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-white" />
                          ) : (
                            <span className="text-[10px] font-bold">
                              {index + 1}
                            </span>
                          )}
                        </button>

                        {/* Etiqueta del Paso */}
                        <button
                          type="button"
                          onClick={() => handleStageChange(stage.id)}
                          className={`mt-2 text-[11px] text-center leading-tight transition-colors cursor-pointer ${
                            isCurrent
                              ? "font-extrabold text-[#0F172A]"
                              : isCompleted
                              ? "font-semibold text-[#1D4ED8]"
                              : "font-medium text-slate-500 hover:text-[#0F172A]"
                          }`}
                        >
                          {stage.label}
                        </button>

                        {/* Sub-indicador de porcentaje debajo del paso actual */}
                        {isCurrent && (
                          <span className="text-[10px] font-extrabold mt-0.5 text-[#2563EB]">
                            {stage.percentage}%
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tarjeta Inferior: TABLA DE REPUESTOS Y SERVICIOS (INTERACTIVA, VISIBLE SIN SCROLL) */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Repuestos y Servicios
                  </h3>
                  <p className="text-xs text-slate-500">
                    Haz clic en el estado para alternar entre Instalado y En
                    progreso
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddPartModal((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Repuesto / Servicio</span>
                </button>
              </div>

              {/* Formulario Desplegable para Agregar Repuesto / Servicio en Vivo */}
              {showAddPartModal && (
                <form
                  onSubmit={handleAddPartSubmit}
                  className="mb-3 p-3 rounded-xl bg-[#EFF6FF]/70 border border-blue-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-end"
                >
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-bold text-[#0F172A] mb-1">
                      Descripción
                    </label>
                    <input
                      type="text"
                      required
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Ej. Filtro Hidráulico / Alineación"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-[#0F172A] mb-1">
                      Cant. / Unidad
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        min={1}
                        required
                        value={newQty}
                        onChange={(e) => setNewQty(e.target.value)}
                        className="w-14 px-2 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      />
                      <select
                        value={newUnit}
                        onChange={(e) => setNewUnit(e.target.value)}
                        className="flex-1 px-1.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A]"
                      >
                        <option value="u.">u.</option>
                        <option value="hrs">hrs</option>
                        <option value="L">L</option>
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-[#0F172A] mb-1">
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      min={1}
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="35000"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="sm:col-span-3 flex gap-1.5">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 px-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddPartModal(false)}
                      className="py-1.5 px-2 bg-white border border-[#E2E8F0] text-slate-600 hover:bg-slate-100 text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}

              {/* Tabla */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-[#F8FAFC]">
                      <th className="py-2 px-3 rounded-tl-lg">Descripción</th>
                      <th className="py-2 px-2">Cantidad</th>
                      <th className="py-2 px-2">Precio Unitario</th>
                      <th className="py-2 px-2">Total</th>
                      <th className="py-2 px-2">Estado</th>
                      <th className="py-2 px-2 text-center rounded-tr-lg">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] text-xs">
                    {displayedParts.map((item) => {
                      const rowTotal = item.quantity * item.unitPrice;
                      const isInstalled = item.status === "Instalado";
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-[#F8FAFC] transition-colors"
                        >
                          <td className="py-2.5 px-3 font-semibold text-[#0F172A]">
                            {item.description}
                          </td>
                          <td className="py-2.5 px-2 text-slate-600 font-medium">
                            {item.quantity}
                            {item.unit ? ` ${item.unit}` : ""}
                          </td>
                          <td className="py-2.5 px-2 text-slate-600 font-medium">
                            {formatARS(item.unitPrice)}
                          </td>
                          <td className="py-2.5 px-2 font-bold text-[#0F172A]">
                            {formatARS(rowTotal)}
                          </td>
                          <td className="py-2.5 px-2">
                            <button
                              type="button"
                              onClick={() => handleTogglePartStatus(item.id)}
                              title="Clic para cambiar estado del ítem"
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                                isInstalled
                                  ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 hover:bg-blue-100"
                                  : "bg-[#F8FAFC] text-[#3B82F6] border border-[#CBD5E1] hover:bg-[#EFF6FF]"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isInstalled ? "bg-[#1D4ED8]" : "bg-[#60A5FA]"
                                }`}
                              />
                              {item.status}
                            </button>
                          </td>
                          <td className="py-2.5 px-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeletePart(item.id)}
                              className="p-1 text-slate-400 hover:text-[#1D4ED8] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                              title="Eliminar ítem"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[#E2E8F0] bg-[#F8FAFC]">
                      <td
                        colSpan={3}
                        className="py-2.5 px-3 text-xs font-extrabold text-[#0F172A] uppercase tracking-wide"
                      >
                        Total Presupuesto
                      </td>
                      <td
                        colSpan={3}
                        className="py-2.5 px-2 text-sm font-extrabold text-[#1D4ED8]"
                      >
                        {formatARS(totalBudget)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </section>

          {/* -------- COLUMNA DERECHA (3 cols): ÓRDENES RECIENTES LIMPIAS Y SIMULADOR "VISTA DEL CLIENTE" -------- */}
          <section className="xl:col-span-3 space-y-3.5 flex flex-col items-center">
            {/* Bloque Superior: "Órdenes recientes" (Fondo blanco limpio y bordes suaves #E2E8F0) */}
            <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs p-3.5 space-y-2">
              <div className="px-1 pb-2 border-b border-[#E2E8F0] flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#0F172A]">
                  Órdenes recientes
                </h3>
                <span className="text-[10px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                  Acceso rápido
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowOrdersDrawer(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-blue-200 text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#2563EB]" />
                  <span>Órdenes de Trabajo</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setShowNotifications(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-blue-200 text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-[#2563EB]" />
                  <span>Notificaciones</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* SIMULADOR DE CELULAR: "VISTA DEL CLIENTE" EN VIVO (GAMA AZUL CORPORATIVA) */}
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                  VISTA DEL CLIENTE
                </h3>
              </div>

              {/* Marco de Smartphone */}
              <div className="w-full max-w-[292px] bg-[#0F172A] rounded-[38px] p-2.5 shadow-xl border-4 border-slate-800 relative">
                {/* Notch superior del iPhone */}
                <div className="w-28 h-5 bg-[#0F172A] rounded-b-2xl mx-auto absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-700 rounded-full" />
                </div>

                {/* Pantalla interna del celular */}
                <div className="bg-white rounded-[28px] pt-6 pb-3.5 px-3.5 text-center flex flex-col justify-between min-h-[435px] relative overflow-hidden">
                  {/* Barra de estado móvil: BoxBox QR */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-1 mb-1.5">
                    <span>9:41</span>
                    <span className="text-[#2563EB] font-extrabold tracking-tight">
                      BoxBox QR
                    </span>
                    <span>5G 100%</span>
                  </div>

                  {/* Encabezado de saludo personalizado al cliente */}
                  <div className="space-y-0.5">
                    <h4 className="text-base font-black text-[#0F172A] tracking-tight">
                      ¡HOLA {activeVehicle.ownerFirstName}!
                    </h4>
                    <p className="text-xs font-bold text-slate-600">
                      Tu {activeVehicle.model} ({activeVehicle.plate})
                    </p>
                  </div>

                  {/* Tarjeta de Estado sincronizada en tiempo real (Gama de Azules #2563EB / #EFF6FF) */}
                  <div className="my-2 py-2 px-3 rounded-xl bg-[#EFF6FF] border border-blue-200/80">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                      <p className="text-xs font-extrabold text-[#1D4ED8] uppercase tracking-wide">
                        {currentStage.label}
                      </p>
                    </div>
                    <p className="text-[11px] font-medium text-slate-600 mt-0.5">
                      ({currentStage.id === 5 ? "Finalizado" : "En progreso"}:{" "}
                      {activeVehicle.activeComponent})
                    </p>

                    {/* Barra de progreso azul dentro del celular */}
                    <div className="w-full h-1.5 bg-blue-200/70 rounded-full overflow-hidden mt-2">
                      <div
                        style={{ width: `${currentStage.percentage}%` }}
                        className="h-full bg-[#2563EB] transition-all duration-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Vista condicional dentro del celular: Foto del motor O Desglose de Presupuesto */}
                  {!showBudgetInPhone ? (
                    <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-2xs group my-1">
                      <img
                        src={activeVehicle.photoUrl}
                        alt={activeVehicle.photoCaption}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-transparent to-transparent flex items-end p-2.5">
                        <div className="text-left text-white">
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase bg-[#0F172A]/70 backdrop-blur-xs px-1.5 py-0.5 rounded mb-0.5 border border-white/15">
                            <Camera className="w-2.5 h-2.5 text-[#60A5FA]" />{" "}
                            Evidencia BoxBox
                          </span>
                          <p className="text-[10px] font-medium leading-tight line-clamp-1">
                            {activeVehicle.photoCaption}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="my-1 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-2.5 text-left max-h-36 overflow-y-auto">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#E2E8F0]">
                        <span className="text-[10px] font-extrabold uppercase text-[#0F172A]">
                          Detalle del Presupuesto
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowBudgetInPhone(false)}
                          className="text-[10px] font-bold text-[#2563EB] flex items-center gap-0.5 cursor-pointer"
                        >
                          <ArrowLeft className="w-2.5 h-2.5" /> Foto
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {activeVehicle.parts.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between text-[11px]"
                          >
                            <div className="truncate pr-1">
                              <span className="font-semibold text-[#0F172A]">
                                {p.description}
                              </span>
                              <span className="text-slate-400 ml-1">
                                x{p.quantity}
                                {p.unit}
                              </span>
                            </div>
                            <span className="font-bold text-[#1D4ED8] shrink-0">
                              {formatARS(p.quantity * p.unitPrice)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fecha Estimada de Entrega */}
                  <div className="my-1">
                    <p className="text-[11px] font-medium text-slate-500">
                      Fecha estimada de entrega
                    </p>
                    <p className="text-xs font-extrabold text-[#0F172A]">
                      {activeVehicle.estimatedDelivery}
                    </p>
                  </div>

                  {/* Botón Ver Presupuesto ($285.000) sincronizado */}
                  <button
                    type="button"
                    onClick={() => setShowBudgetInPhone((prev) => !prev)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                  >
                    {showBudgetInPhone
                      ? `Ocultar Detalle (${formatARS(totalBudget)})`
                      : `Ver Presupuesto (${formatARS(totalBudget)})`}
                  </button>

                  {/* Home indicator bar */}
                  <div className="w-24 h-1 bg-slate-300 rounded-full mx-auto mt-2" />
                </div>
              </div>

              {/* Botón Simulado "Notificar avance por WhatsApp" en Azul Corporativo */}
              <button
                type="button"
                onClick={handleWhatsAppNotify}
                className="mt-2.5 w-full max-w-[292px] py-2.5 px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#2563EB] text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/15" />
                <span>Notificar avance por WhatsApp</span>
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* ================= MODAL ETIQUETA QR PARA IMPRIMIR ================= */}
      {showQrModal && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E2E8F0] text-center space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-bold text-[#0F172A] text-sm">
                  Etiqueta BoxBox QR
                </h3>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-2 border-dashed border-[#CBD5E1] rounded-xl bg-[#F8FAFC] flex flex-col items-center space-y-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1D4ED8]">
                BOXBOX · TALLER CENTRAL
              </span>
              <RealisticQrCode
                seed={activeVehicle.id + "-print-hq"}
                sizeClass="w-28 h-28"
              />
              <div className="flex items-center gap-2 pt-1">
                <span className="text-sm font-extrabold text-[#0F172A]">
                  {activeVehicle.model}
                </span>
                <LicensePlateBadge plate={activeVehicle.plate} />
              </div>
              <p className="text-xs text-slate-500">
                Orden {activeVehicle.orderNumber} · Cliente:{" "}
                {activeVehicle.ownerName}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowQrModal(false);
                  triggerToast(
                    "Etiqueta BoxBox enviada a impresora térmica",
                    `Vehículo: ${activeVehicle.model} (${activeVehicle.plate})`,
                    "success"
                  );
                }}
                className="flex-1 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Ahora</span>
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="py-2.5 px-4 bg-[#F8FAFC] hover:bg-slate-200/70 text-[#0F172A] border border-[#E2E8F0] text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL DE ÓRDENES DE TRABAJO ACTIVAS ================= */}
      {showOrdersDrawer && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h3 className="font-bold text-[#0F172A] text-base">
                  Órdenes de Trabajo — BoxBox
                </h3>
                <p className="text-xs text-slate-500">
                  Selecciona un vehículo para abrir su trazabilidad QR en vivo
                </p>
              </div>
              <button
                onClick={() => setShowOrdersDrawer(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {vehicles.map((v) => {
                const st = STAGES[v.stageIndex];
                const isSelected = v.id === activeVehicle.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVehicleId(v.id);
                      setShowOrdersDrawer(false);
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#EFF6FF] border-[#2563EB] ring-1 ring-[#2563EB]/20"
                        : "bg-white hover:bg-[#F8FAFC] border-[#E2E8F0]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-sm text-[#0F172A]">
                          {v.model}
                        </span>
                        <LicensePlateBadge plate={v.plate} />
                        <span className="text-[11px] font-semibold text-slate-400">
                          {v.orderNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Cliente:{" "}
                        <span className="font-semibold text-[#0F172A]">
                          {v.ownerName}
                        </span>{" "}
                        · Tarea: {v.activeComponent}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200/70">
                        {st.label} ({st.percentage}%)
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL DE AYUDA / DEMO INTERACTIVA ================= */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-bold text-[#0F172A] text-sm">
                  Guía Interactiva — BoxBox MVP
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li>
                • <strong>Selector de Vehículos:</strong> Alterna entre Ford
                Focus, VW Gol Trend y Toyota Hilux en la columna izquierda.
              </li>
              <li>
                • <strong>Stepper de 6 Etapas en Vivo:</strong> Haz clic en
                cualquier etapa (<em>Recepción</em> a <em>Listo</em>) para
                actualizar el % de avance, sumar un registro al historial y
                sincronizar el teléfono del cliente.
              </li>
              <li>
                • <strong>Tabla de Repuestos Reactiva:</strong> Agrega nuevos
                ítems, alterna su estado o elimínalos; el total se recalcula
                automáticamente en toda la interfaz.
              </li>
              <li>
                • <strong>Simulador BoxBox QR:</strong> Haz clic en{" "}
                <em>Ver Presupuesto</em> dentro del smartphone o envía el avance
                por WhatsApp.
              </li>
            </ul>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* ================= TOAST DE CONFIRMACIÓN FLOTANTE ================= */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-[#0F172A] text-white px-4 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3">
          <div className="p-2 rounded-xl shrink-0 bg-[#2563EB]/25 text-[#60A5FA]">
            {toast.type === "whatsapp" ? (
              <MessageCircle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
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
