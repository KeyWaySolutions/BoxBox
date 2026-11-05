# BoxBox — Design System Master (`design-system/MASTER.md`)

## 1. Brand & Product Architecture (Linear / Vercel Aesthetic)
- **Product Name**: BoxBox (`BoxBox OS · Taller Mecánica Central`, `BoxBox QR`)
- **Design Philosophy**: Zero cognitive overload. Executive financial metrics, operational bay management, inventory control, clinical vehicle history, and the live customer mobile simulator are cleanly separated into dedicated, high-breathing-room views connected through the functional Left Sidebar (`activeTab`).
- **Slide-Over / Dockable Customer Simulator**: Instead of cramping desktop layouts with a permanent 4th column, the customer iPhone simulator (`Vista Cliente QR (En Vivo)`) opens on demand from the top-right header CTA or by clicking the vehicle's QR code, and supports both **Pinned Split-Screen Mode** (for live demos) and **Floating Drawer Mode**.

## 2. Color Palette (Strict Corporate Blue & White)
| Token | Hex | Usage |
|---|---|---|
| `surface-primary` | `#FFFFFF` | Cards, Sidebar, Header, Modals, Mercosur Plate surface |
| `bg-canvas` | `#F8FAFC` | Main viewport background, subtle table headers, secondary inputs |
| `text-primary` | `#0F172A` | Headings, vehicle model, QR code modules, primary figures |
| `brand-primary-dark` | `#1D4ED8` | Mercosur top band, completed stepper stages, primary active text |
| `brand-primary` | `#2563EB` | Primary brand actions, active bay ring, progress bars |
| `brand-accent` | `#3B82F6` | Secondary chart bars, interactive hover borders |
| `brand-accent-light` | `#60A5FA` | Tertiary chart bars, subtle status indicators |
| `brand-tint` | `#EFF6FF` | Active navigation pill, status badges, phone status card background |
| `border-subtle` | `#E2E8F0` | Card borders, dividers, table rules |

## 3. Multi-View Specifications
1. **`Órdenes de Trabajo` (Operational Default)**:
   - Top Paddock Bay Bar (`Bahía 01 · Ford Focus`, `Bahía 02 · VW Gol Trend`, `Bahía 03 · Toyota Hilux`) with live progress bars.
   - 4/12 Left Column: Technical Spec Card with **Argentine Mercosur License Plate** (`REPÚBLICA ARGENTINA` on `#1D4ED8` top strip) + Die-Cut Thermal QR Sticker (`TRK-BOX-104`).
   - 8/12 Right Column: Wide 6-Step Telemetry Stepper + Interactive Parts & Services Table + Chronological Traceability Audit Log (`Bitácora de Trazabilidad`).
2. **`Dashboard` (Executive Owner View)**:
   - 4 Numeric KPIs (`Vehículos en Taller`, `Listos para Entregar`, `Ticket Promedio`, `Facturación Mensual`).
   - Horizontal progress bar chart for `Volumen de Órdenes por Estado` (zero overlapping labels) + Vertical column chart for `Evolución de Ingresos Mensuales`.
   - `Monitor de Bahías en Vivo` with direct `"Abrir Orden →"` navigation.
3. **`Inventario` (Pañol de Repuestos)**:
   - SKU catalog with stock levels, `"Stock Óptimo"` / `"Stock Crítico"` badges, and one-click `"+ Cargar a Orden"` assignment.
4. **`Clientes` (Historial Clínico Vehicular)**:
   - Client cards with associated vehicles, Mercosur plates, last visit date, historical service count, and direct order access.
