# BoxBox — Design System Master (`design-system/MASTER.md`)

## 1. Brand Identity
- **Product Name**: BoxBox (`BoxBox · Taller Central`, `BoxBox QR`)
- **Category**: Automotive Workshop Management SaaS & Live QR Traceability Dashboard
- **Aesthetic Direction**: Corporate Clean Light Mode — High-contrast typographic hierarchy, crisp borders, zero visual clutter, strict corporate blue & white palette.

## 2. Color Palette (Strict Blue & White)
| Token | Hex | Usage |
|---|---|---|
| `surface-primary` | `#FFFFFF` | Cards, Sidebar, Header, Modals, License Plate surface |
| `bg-canvas` | `#F8FAFC` | Main dashboard background, subtle table headers, secondary inputs |
| `text-primary` | `#0F172A` | Headings, vehicle model, QR code modules, primary figures |
| `brand-primary-dark` | `#1D4ED8` | Completed stepper stages, primary active text, high-emphasis chart bar |
| `brand-primary` | `#2563EB` | Primary brand actions, active stepper node, mobile progress bar, plate header band |
| `brand-accent` | `#3B82F6` | Secondary chart bars, icons, "En progreso" status text |
| `brand-accent-light` | `#60A5FA` | Tertiary chart bars, subtle status indicators |
| `brand-tint` | `#EFF6FF` | Active navigation pill, status badges, phone status card background |
| `border-subtle` | `#E2E8F0` | Card borders, dividers, table rules |

## 3. Typography & Micro-UI Rules
- **Font Family**: `Inter` (UI & Data), `ui-monospace` (License Plate Badge `AE 123 CD`, `AA 456 ZZ`, `AF 890 XY`).
- **Vehicle Header**: Single-line vehicle model + stylized license plate badge (no redundant subtitle repetition).
- **QR Code**: 25×25 Version-2 QR matrix in `#0F172A` with 3 standard 7×7 corner finder squares and 5×5 alignment pattern.
- **KPI Charts**: Compact height (`h-24`) with full non-truncated labels (`Espera`, `Diagnóstico`, `Reparación`, `Listo`) so the Parts & Services table fits in the viewport without vertical scrolling.
