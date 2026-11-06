"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Clock,
  Calendar,
  Wrench,
  Gauge,
  MessageCircle,
  ShieldCheck,
  FileText,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Phone,
  MapPin,
  QrCode,
  RefreshCw,
} from "lucide-react";
import {
  INITIAL_VEHICLES,
  STAGES,
  STORAGE_KEY_VEHICLES,
  VehicleOrder,
  formatARS,
  plateToSlug,
  findVehicleByPlateParam,
  MercosurPlateBadge,
  RealisticQrCode,
} from "@/components/MecaniQDashboard";

export default function ClientLiveTrackingPage() {
  const params = useParams<{ patente: string }>();
  const rawPatente = Array.isArray(params?.patente)
    ? params.patente[0]
    : params?.patente || "AE-123-CD";

  const [vehicles, setVehicles] = useState<VehicleOrder[]>(INITIAL_VEHICLES);
  const [origin, setOrigin] = useState<string>("https://boxbox.app");
  const [approvalBanner, setApprovalBanner] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"vivo" | "historial">(
    "vivo"
  );

  // Sync with localStorage, URL query (?view=historial) & live storage events from Mechanic Dashboard
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location?.origin) {
      setOrigin(window.location.origin);
    }

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("view") === "historial") {
      setActiveMobileTab("historial");
    }

    const loadVehicles = () => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY_VEHICLES);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setVehicles(parsed);
          }
        }
      } catch {
        // Ignore storage errors
      }
    };

    loadVehicles();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_VEHICLES) {
        loadVehicles();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const vehicle = useMemo(
    () => findVehicleByPlateParam(rawPatente, vehicles),
    [rawPatente, vehicles]
  );

  const currentStage = STAGES[vehicle.stageIndex];
  const currentPlateSlug = plateToSlug(vehicle.plate);
  const currentLiveUrl = `${origin}/client/${currentPlateSlug}`;
  const currentHistoryUrl = `${origin}/client/${currentPlateSlug}?view=historial`;

  // Financial summary calculation
  const financialSummary = useMemo(() => {
    let partsSubtotal = 0;
    let laborSubtotal = 0;

    vehicle.parts.forEach((item) => {
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
    });

    return {
      partsSubtotal,
      laborSubtotal,
      total: partsSubtotal + laborSubtotal,
    };
  }, [vehicle.parts]);

  // Approve budget directly from client mobile view
  const handleApproveBudgetFromClient = () => {
    const updated = vehicles.map((v) =>
      v.id === vehicle.id ? { ...v, budgetApproved: true } : v
    );
    setVehicles(updated);
    try {
      window.localStorage.setItem(
        STORAGE_KEY_VEHICLES,
        JSON.stringify(updated)
      );
    } catch {
      // Ignore storage errors
    }
    setApprovalBanner(true);
    setTimeout(() => setApprovalBanner(false), 4000);
  };

  // Pre-filled WhatsApp message to contact the workshop
  const whatsappUrl = useMemo(() => {
    const workshopPhone = "5491166561670";
    const message = `Hola Taller Mecánica Central (BoxBox PRO), soy ${vehicle.ownerName}. Consulto por mi ${vehicle.model} patente ${vehicle.plate} (Orden ${vehicle.orderNumber}), actualmente en estado "${currentStage.label}" (${currentStage.percentage}% de avance).`;
    return `https://wa.me/${workshopPhone}?text=${encodeURIComponent(message)}`;
  }, [
    vehicle.ownerName,
    vehicle.model,
    vehicle.plate,
    vehicle.orderNumber,
    currentStage.label,
    currentStage.percentage,
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pb-28 selection:bg-[#EFF6FF] selection:text-[#1D4ED8]">
      {/* ================= TOP BRAND HEADER (MOBILE-FIRST) ================= */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-2xs">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/SVG_redondo.svg"
              alt="Isotipo Oficial BoxBox"
              className="w-11 h-11 rounded-xl object-contain p-0 shrink-0"
            />
            <div className="leading-tight min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-[#0F172A]">
                  Box<span className="text-[#2563EB]">Box</span>
                </span>
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                  PRO QR
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 truncate">
                Taller Mecánica Central · Seguimiento en Vivo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 text-[10px] font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              En Vivo
            </span>
          </div>
        </div>
      </header>

      {/* ================= MAIN MOBILE CONTAINER ================= */}
      <main className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {/* Quick Navigation Bar back to Workshop & Other Active Plates */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Panel del Taller</span>
          </Link>

          <div className="flex items-center gap-1.5 flex-wrap">
            {vehicles.map((v) => {
              const slug = plateToSlug(v.plate);
              const isCurrent = v.id === vehicle.id;
              return (
                <Link
                  key={v.id}
                  href={`/client/${slug}`}
                  className={`font-mono text-[10px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                    isCurrent
                      ? "bg-[#2563EB] text-white border-[#2563EB]"
                      : "bg-[#F8FAFC] text-slate-600 border-[#E2E8F0] hover:bg-[#EFF6FF] hover:text-[#1D4ED8]"
                  }`}
                >
                  {v.plate}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ================= 1. TARJETA DE BIENVENIDA E IDENTIFICACIÓN DEL VEHÍCULO ================= */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-0.5 rounded-md border border-blue-200">
                {vehicle.bayNumber} · Orden {vehicle.orderNumber}
              </span>
              <h1 className="text-xl font-black text-[#0F172A] tracking-tight mt-1.5">
                ¡Hola, {vehicle.ownerName.split(" ")[0]}!
              </h1>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Estado en tiempo real de tu{" "}
                <strong className="text-[#0F172A]">
                  {vehicle.model} ({vehicle.year})
                </strong>
              </p>
            </div>

            <MercosurPlateBadge plate={vehicle.plate} />
          </div>

          {/* 4 Technical Specs Pills */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                  Motorización
                </span>
                <span className="text-xs font-extrabold text-[#0F172A] truncate block mt-0.5">
                  {vehicle.engineSpec}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                <Gauge className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                  Kilometraje
                </span>
                <span className="text-xs font-extrabold text-[#0F172A] truncate block mt-0.5">
                  {vehicle.mileage}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                  Ingreso a Taller
                </span>
                <span className="text-xs font-extrabold text-[#0F172A] truncate block mt-0.5">
                  {vehicle.checkInTime}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#EFF6FF] border border-blue-200 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase text-[#1D4ED8] block leading-none">
                  Entrega Estimada
                </span>
                <span className="text-xs font-extrabold text-[#1D4ED8] truncate block mt-0.5">
                  {vehicle.estimatedDelivery}
                </span>
              </div>
            </div>
          </div>

          {/* ================= 2 PESTAÑAS SUPERIORES EN LA PANTALLA DEL CELULAR ================= */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-[#E2E8F0] pt-1.5">
            <button
              type="button"
              onClick={() => setActiveMobileTab("vivo")}
              className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeMobileTab === "vivo"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white/70 text-slate-600 hover:text-[#0F172A] border border-transparent"
              }`}
            >
              <span>⚡ Reparación en Vivo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMobileTab("historial")}
              className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeMobileTab === "historial"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white/70 text-slate-600 hover:text-[#0F172A] border border-transparent"
              }`}
            >
              <span>📋 Historial Clínico</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  activeMobileTab === "historial"
                    ? "bg-white/20 text-white"
                    : "bg-[#EFF6FF] text-[#1D4ED8]"
                }`}
              >
                {(vehicle.serviceHistory || []).length}
              </span>
            </button>
          </div>
        </section>

        {activeMobileTab === "vivo" ? (
          <>
            {/* ================= 2. ESTADO ACTUAL Y STEPPER DE AVANCE EN TIEMPO REAL ================= */}
            <section className="bg-white rounded-2xl border-2 border-[#2563EB]/25 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB] block">
                    Progreso de Reparación
                  </span>
                  <h2 className="text-lg font-black text-[#0F172A] mt-0.5">
                    {currentStage.label}
                  </h2>
                  <p className="text-xs font-semibold text-slate-600">
                    Tarea activa:{" "}
                    <span className="text-[#1D4ED8] font-bold">
                      {vehicle.activeComponent}
                    </span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-2xl bg-[#2563EB] text-white text-lg font-black shadow-2xs">
                    {currentStage.percentage}%
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1">
                    Etapa {vehicle.stageIndex + 1} de {STAGES.length}
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  style={{ width: `${currentStage.percentage}%` }}
                  className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] transition-all duration-500 rounded-full"
                />
              </div>

              <p className="text-xs font-medium text-[#1D4ED8] bg-[#EFF6FF] px-3 py-2 rounded-xl border border-blue-200">
                {currentStage.defaultNote}
              </p>

              {/* 6-Stage Stepper Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                {STAGES.map((stage, idx) => {
                  const isCompleted = idx < vehicle.stageIndex;
                  const isCurrent = idx === vehicle.stageIndex;

                  return (
                    <div
                      key={stage.id}
                      className={`p-2.5 rounded-xl border flex flex-col justify-between gap-1.5 ${
                        isCurrent
                          ? "bg-[#EFF6FF] border-2 border-[#2563EB] shadow-2xs"
                          : isCompleted
                          ? "bg-[#F8FAFC] border-blue-200"
                          : "bg-white border-[#E2E8F0] opacity-70"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                            isCompleted
                              ? "bg-[#1D4ED8] text-white"
                              : isCurrent
                              ? "bg-[#2563EB] text-white ring-2 ring-blue-200"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {isCompleted || (isCurrent && stage.id === 5) ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : (
                            idx + 1
                          )}
                        </span>
                        <span
                          className={`text-[9px] font-bold ${
                            isCurrent ? "text-[#1D4ED8]" : "text-slate-400"
                          }`}
                        >
                          {stage.percentage}%
                        </span>
                      </div>
                      <span
                        className={`text-[11px] leading-tight truncate ${
                          isCurrent
                            ? "font-extrabold text-[#0F172A]"
                            : isCompleted
                            ? "font-bold text-[#1D4ED8]"
                            : "font-semibold text-slate-500"
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ================= 3. EVIDENCIA FOTOGRÁFICA DE BAHÍA ================= */}
            <section className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#0F172A]">
                  Evidencia Técnica en {vehicle.bayNumber}
                </span>
                <span className="text-[10px] font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-blue-200">
                  Verificado por Mecánico Jefe
                </span>
              </div>
              <div className="relative">
                <img
                  src={vehicle.photoUrl}
                  alt={vehicle.photoCaption}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-transparent to-transparent flex items-end p-4">
                  <p className="text-xs text-white font-semibold">
                    {vehicle.photoCaption}
                  </p>
                </div>
              </div>
            </section>

            {/* ================= 4. PRESUPUESTO TRANSPARENTE Y REPUESTOS ================= */}
            <section className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-blue-200">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0F172A]">
                      Presupuesto y Repuestos
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Desglose en vivo de piezas y mano de obra
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    vehicle.budgetApproved
                      ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                      : "bg-slate-100 text-slate-700 border border-[#CBD5E1]"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                  {vehicle.budgetApproved ? "Aprobado por QR" : "Pendiente"}
                </span>
              </div>

              {/* Itemized List */}
              <div className="divide-y divide-[#E2E8F0]">
                {vehicle.parts.map((item) => {
                  const subtotal = item.quantity * item.unitPrice;
                  const isInstalled = item.status === "Instalado";
                  return (
                    <div
                      key={item.id}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-bold text-[#0F172A] truncate">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-slate-500">
                            {item.quantity} {item.unit} ×{" "}
                            {formatARS(item.unitPrice)}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isInstalled
                                ? "bg-[#EFF6FF] text-[#1D4ED8]"
                                : "bg-[#F8FAFC] text-[#3B82F6] border border-[#CBD5E1]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isInstalled ? "bg-[#1D4ED8]" : "bg-[#60A5FA]"
                              }`}
                            />
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <span className="font-extrabold text-[#0F172A] shrink-0">
                        {formatARS(subtotal)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Subtotals & Final Total */}
              <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-blue-200 space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal Repuestos:</span>
                  <span className="font-bold text-[#0F172A]">
                    {formatARS(financialSummary.partsSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal Mano de Obra:</span>
                  <span className="font-bold text-[#0F172A]">
                    {formatARS(financialSummary.laborSubtotal)}
                  </span>
                </div>
                <div className="pt-2 border-t border-blue-200 flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-[#1D4ED8]">
                    Total Presupuesto
                  </span>
                  <span className="text-lg font-black text-[#1D4ED8]">
                    {formatARS(financialSummary.total)}
                  </span>
                </div>
              </div>

              {!vehicle.budgetApproved && (
                <button
                  type="button"
                  onClick={handleApproveBudgetFromClient}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aprobar Presupuesto Digitalmente</span>
                </button>
              )}

              {approvalBanner && (
                <div className="p-3 rounded-xl bg-[#EFF6FF] border border-blue-200 text-xs font-bold text-[#1D4ED8] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>
                    ¡Presupuesto aprobado con éxito! El mecánico fue notificado
                    en bahía.
                  </span>
                </div>
              )}
            </section>

            {/* ================= 5. BITÁCORA DE TRAZABILIDAD PASO A PASO ================= */}
            <section className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0F172A]">
                    Bitácora Técnica de Reparación
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Historial cronológico auditado por BoxBox QR
                  </p>
                </div>
                <span className="text-[10px] font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-blue-200">
                  {vehicle.timeline.length} eventos
                </span>
              </div>

              <div className="space-y-2.5">
                {vehicle.timeline.map((event, idx) => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-xl border flex items-start gap-3 ${
                      idx === 0
                        ? "bg-[#EFF6FF]/60 border-blue-200"
                        : "bg-[#F8FAFC] border-[#E2E8F0]"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        idx === 0
                          ? "bg-[#2563EB] text-white"
                          : "bg-white text-[#1D4ED8] border border-blue-200"
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-extrabold text-[#1D4ED8]">
                          {event.time}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                          {event.actor}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#0F172A] mt-1 leading-relaxed">
                        {event.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* ================= PESTAÑA 2: 📋 HISTORIAL CLÍNICO COMPLETO DEL VEHÍCULO ================= */
          <section className="space-y-4">
            {/* Resumen Clínico + VIN + Próximo Service Recomendado */}
            <div className="bg-white rounded-2xl border-2 border-[#2563EB]/25 shadow-xs p-5 space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#2563EB] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    PASAPORTE QR · HISTORIAL CLÍNICO
                  </span>
                  <h2 className="text-lg font-black text-[#0F172A] mt-1.5">
                    Legajo Histórico de {vehicle.model}
                  </h2>
                  <p className="text-xs text-slate-500">
                    VIN / Chasis:{" "}
                    <strong className="font-mono text-[#0F172A]">
                      {vehicle.vin || "8AFZZZFFCHJ409218"}
                    </strong>{" "}
                    · {vehicle.clientSince || "Cliente desde 2022"}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-blue-200 flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#1D4ED8] block">
                    Próximo Service Recomendado
                  </span>
                  <p className="text-xs font-bold text-[#0F172A] mt-0.5">
                    {vehicle.nextRecommendedService ||
                      "Próximo cambio de aceite sintético a los 78.400 km"}
                  </p>
                </div>
              </div>
            </div>

            {/* Línea de Tiempo Cronológica de Visitas Anteriores */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0F172A]">
                    Intervenciones Registradas
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Trazabilidad real de odómetro y repuestos instalados
                  </p>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                  {(vehicle.serviceHistory || []).length} visitas
                </span>
              </div>

              <div className="space-y-3">
                {(vehicle.serviceHistory || []).map((rec, idx) => (
                  <div
                    key={rec.id}
                    className={`p-4 rounded-2xl border space-y-2.5 ${
                      rec.isCurrentOrder || idx === 0
                        ? "bg-[#EFF6FF]/60 border-2 border-[#2563EB]/40"
                        : "bg-[#F8FAFC] border-[#E2E8F0]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                            rec.isCurrentOrder
                              ? "bg-[#2563EB] text-white"
                              : "bg-white text-[#1D4ED8] border border-blue-200"
                          }`}
                        >
                          {rec.date} · {rec.orderNumber}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-[#CBD5E1] text-[10px] font-extrabold text-[#0F172A]">
                          <Gauge className="w-3 h-3 text-[#2563EB]" />
                          {rec.mileage}
                        </span>
                      </div>

                      <span className="text-sm font-black text-[#1D4ED8]">
                        {formatARS(rec.totalBilled)}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                        {rec.serviceTitle}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        {rec.diagnosisSummary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {rec.installedParts.map((part, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#E2E8F0] text-[#0F172A]"
                        >
                          {part}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-[10px]">
                      <span className="font-bold text-slate-500">
                        Mecánico:{" "}
                        <strong className="text-[#0F172A]">
                          {rec.mechanic}
                        </strong>
                      </span>
                      <span className="inline-flex items-center gap-1 font-extrabold text-[#1D4ED8]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                        {rec.warrantyLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= 6. FICHA QR DE VERIFICACIÓN DEL VEHÍCULO ================= */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-4 flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-extrabold text-[#0F172A]">
                {activeMobileTab === "historial"
                  ? "Pasaporte QR de Historial Clínico"
                  : "Código QR Oficial de tu Orden"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Presenta este código al retirar tu{" "}
              <strong>{vehicle.model}</strong> en recepción.
            </p>
            <p className="font-mono text-[10px] font-bold text-[#1D4ED8] truncate">
              {activeMobileTab === "historial"
                ? currentHistoryUrl
                : currentLiveUrl}
            </p>
          </div>
          <RealisticQrCode
            value={
              activeMobileTab === "historial"
                ? currentHistoryUrl
                : currentLiveUrl
            }
            size={80}
            sizeClass="w-20 h-20"
            imageSettings={{
              src: "/SVG_redondo.svg",
              width: 28,
              height: 28,
              excavate: true,
            }}
          />
        </section>
      </main>

      {/* ================= STICKY BOTTOM CTA: WHATSAPP DIRECTO AL TALLER ================= */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] p-3 shadow-2xl">
        <div className="max-w-lg mx-auto flex items-center gap-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Contactar al Taller por WhatsApp</span>
          </a>
          <a
            href="tel:+5491166561670"
            title="Llamar al Taller"
            className="p-3 rounded-xl bg-[#EFF6FF] hover:bg-blue-100 text-[#1D4ED8] border border-blue-200 transition-colors shrink-0"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

