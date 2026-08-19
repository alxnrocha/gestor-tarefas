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

## ✨ Características Principales

### 🚀 Experiencia de Usuario & Frontend
- **Gestión Completa de Tareas (CRUD):** Creación, edición en línea, completado/reactivación y eliminación de tareas con confirmación.
- **Filtros Avanzados y Búsqueda Instantánea:** Búsqueda en tiempo real por título y filtrado multicriterio por estado (`Todas`, `Pendientes`, `Completadas`), nivel de prioridad (`Baja`, `Media`, `Alta`, `Urgente`) y categorías temáticas.
- **Persistencia en LocalStorage:** Esquema versionado con fallback automático a datos de demostración si el almacenamiento local está vacío.
- **Métricas Dinámicas de Productividad:** Contadores en tiempo real de tareas totales, completadas, pendientes y volumen de alta prioridad.
- **Accesibilidad Completa (WCAG):** Estados de foco visibles, soporte para navegación integral con teclado y regiones vivas para anuncios a lectores de pantalla.

---

## 🏛️ Estructura del Proyecto

```text
05-gestor-tarefas/
├── index.html
├── src/
│   ├── components/                # TaskList, TaskForm, MetricsCard, FilterBar
│   ├── types/                     # Interfaces TypeScript
│   ├── App.tsx                    # Componente raíz
│   └── main.tsx                   # Punto de entrada
├── package.json
└── vite.config.ts
```

---

## ⚡ Guía de Inicio Rápido

### 1. Clonar el Repositorio
```bash
git clone https://github.com/alxnrocha/gestor-tarefas.git
cd gestor-tarefas
```

### 2. Instalar Dependencias y Ejecutar
```bash
npm install
npm run dev
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para más detalles.
