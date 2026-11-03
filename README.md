# BoxBox — Plataforma SaaS de Gestión de Órdenes de Trabajo con Trazabilidad QR

MVP funcional de **BoxBox**, plataforma web SaaS para talleres mecánicos con seguimiento en tiempo real mediante código QR y simulador sincronizado de **Vista del Cliente (BoxBox QR)**.

## Sistema de Diseño (UI/UX Pro Max)

- **Branding**: **BoxBox** (Sidebar, Header Superior, Etiqueta de Impresión y Simulador Móvil **BoxBox QR**).
- **Paleta Corporativa Estricta (Azul y Blanco)**:
  - Superficies y Tarjetas: `#FFFFFF` con bordes suaves `#E2E8F0`
  - Fondo General de Aplicación: `#F8FAFC`
  - Textos Principales y Código QR: `#0F172A`
  - Azul Primario de Marca: `#1D4ED8` y `#2563EB`
  - Acentos y Series de Gráficos: `#3B82F6`, `#60A5FA` y `#93C5FD`
  - Fondos de Badges y Estados Activos: `#EFF6FF` y `#DBEAFE`
- **Jerarquía y Micro-UI**:
  - **Ficha del Vehículo**: Modelo en una sola línea limpia acompañado de un badge estilizado como chapa patente moderna (`AE 123 CD`, `AA 456 ZZ`, `AF 890 XY`) en tipografía monoespaciada en negrita.
  - **Código QR Realista (25×25)**: SVG detallado con los 3 cuadros localizadores de esquina (7×7), patrón de alineación y matriz de datos en `#0F172A`.
  - **KPIs Compactos y Sin Truncamiento**: Etiquetas completas (`Espera`, `Diagnóstico`, `Reparación`, `Listo`) y altura optimizada para visualizar la tabla de **Repuestos y Servicios** sin necesidad de scroll vertical.

## Ejecución Local

```bash
npm install
npm run dev
```
