# Gestor de Tareas — Productividad y Gestión de Flujos de Trabajo

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success?style=flat-square&logo=github&logoColor=white)](https://alxnrocha.github.io/gestor-tarefas/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **Proyecto 05 del Portafolio Profesional** — Aplicación web SPA para la organización de flujos de trabajo, seguimiento de productividad y control de tareas.  
> 🔗 **Demo en Vivo en GitHub Pages:** [https://alxnrocha.github.io/gestor-tarefas/](https://alxnrocha.github.io/gestor-tarefas/)

---

## 🌟 Visión General & Propuesta de Valor

**Gestor de Tareas** es una herramienta web ágil para la gestión del flujo de trabajo y productividad individual.

Permite organizar tareas por prioridades y categorías temáticas, realizar búsquedas instantáneas, alternar estados de completado y sincronizar datos en el almacenamiento local del navegador de forma persistente y segura.

---

## ✨ Características Principales

- **Gestión Completa de Tareas (CRUD):** Creación, edición en línea, marcado de completado y eliminación con confirmación.
- **Filtros Avanzados y Búsqueda Instantánea:** Filtrado multicriterio por estado (`Todas`, `Pendientes`, `Completadas`), prioridad (`Baja`, `Media`, `Alta`, `Urgente`) y categorías.
- **Persistencia en LocalStorage:** Almacenamiento versionado con fallback automático a datos de demostración si está vacío.
- **Métricas Dinámicas de Productividad:** Contadores en tiempo real de tareas totales, completadas, pendientes y volumen de alta prioridad.
- **Accesibilidad Completa (WCAG):** Focos visibles, navegación con teclado y soporte para lectores de pantalla.

---

## 🏛️ Arquitectura del Proyecto

```text
05-gestor-tarefas/
├── index.html
├── src/
│   ├── components/                # TaskList, TaskForm, MetricsCard, FilterBar
│   ├── types/                     # Interfaces TypeScript
│   ├── App.tsx                    # Componente raíz
│   └── main.tsx                   # Punto de entrada
├── LICENSE
├── package.json
└── vite.config.ts
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/alxnrocha/gestor-tarefas.git
   cd gestor-tarefas
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🛡️ Calidad de Código & Testing

- **Tipado Estricto:** Tipos e interfaces TypeScript para todas las entidades de tarea.
- **Accesibilidad (a11y):** Verificación de WCAG 2.1 AA y navegación por teclado.

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
