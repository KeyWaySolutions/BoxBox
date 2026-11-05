# BoxBox — Plataforma SaaS de Gestión de Órdenes de Trabajo con Trazabilidad QR

Aplicación web SaaS multi-vista para talleres mecánicos diseñada bajo una arquitectura limpia estilo **Linear / Vercel**, con trazabilidad en tiempo real mediante código QR y simulador acoplable de **Vista del Cliente (`BoxBox QR`)**.

## Arquitectura Multi-Vista (Sidebar 100% Funcional)

1. **`Órdenes de Trabajo` (Foco 100% Operativo)**:
   - **Selector Superior de Bahías Activas (Paddock)**: Tarjetas horizontales interactivas (`Bahía 01 · Ford Focus`, `Bahía 02 · VW Gol Trend`, `Bahía 03 · Toyota Hilux`) con porcentaje de avance en vivo.
   - **Columna Izquierda (4/12 — Ficha Técnica y Ticket QR Térmico)**:
     - **Chapa Patente Mercosur Argentino**: Banda superior `#1D4ED8` con leyenda `REPÚBLICA ARGENTINA` y patente monoespaciada (`AE 123 CD`, `AA 456 ZZ`, `AF 890 XY`).
     - Grilla técnica limpia (Orden, Kilometraje, Motorización, Entrega Estimada) y contacto directo por WhatsApp.
     - **Ticket QR Troquelado de Taller**: Etiqueta física con borde punteado, QR SVG 25×25 con los 3 localizadores reales, ID de trazabilidad (`TRK-BOX-104`) y botones **Imprimir Sticker** y **Copiar Link**.
   - **Columna Derecha (8/12 — Telemetría, Repuestos y Bitácora)**:
     - **Stepper de 6 Pasos** con barra de progreso animada.
     - **Tabla de Repuestos y Servicios** con cálculo automático de subtotal/total, cambio de estado con un clic y alta rápida inline.
     - **Bitácora de Trazabilidad** cronológica con hora exacta y responsable.
2. **`Dashboard` (Foco Ejecutivo del Dueño del Taller)**:
   - **4 KPIs Numéricos**: Vehículos en Taller (`18`), Listos para Entregar (`4`), Ticket Promedio (`$245.000`) y Facturación Mensual (`$4.2M +18.4%`).
   - **Gráficos Amplios sin Superposición**: Barras horizontales para **Volumen por Estado** y columnas verticales para **Ingresos Mensuales**.
   - **Monitor de Bahías en Vivo** con botón **`Abrir Orden →`** que redirige automáticamente a la orden seleccionada.
3. **`Inventario` (Pañol de Repuestos)**:
   - Tabla de stock con código SKU, disponibilidad, indicador **Stock Óptimo / Stock Crítico**, precio unitario y asignación directa a la orden activa.
4. **`Clientes` (Historial Clínico Vehicular)**:
   - Tarjetas de clientes registrados con sus vehículos asociados, patentes Mercosur, última visita y cantidad de servicios históricos.
5. **Simulador Móvil `Vista Cliente QR (En Vivo)` (Slide-Over / Acoplable)**:
   - Accesible desde el botón destacado en el Header superior derecho o haciendo clic sobre el código QR del vehículo, con soporte para fijarlo a un costado durante presentaciones en vivo.

## Ejecución Local

```bash
npm install
npm run dev
```
