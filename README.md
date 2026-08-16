# Gestor de Tareas — Productividad y Gestión de Flujos de Trabajo

[![Demo GitHub Pages](https://img.shields.io/badge/Demo-GitHub_Pages-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://alxnrocha.github.io/gestor-tarefas/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**Gestor de Tareas** es una aplicación web SPA para la organización y seguimiento de productividad personal o de equipo. Permite gestionar ciclos de vida de tareas con prioridades, categorías, fechas límite, filtros combinados y persistencia local versionada.

- 🌐 **Demo en Vivo (GitHub Pages):** [https://alxnrocha.github.io/gestor-tarefas/](https://alxnrocha.github.io/gestor-tarefas/)
- 📦 **Repositorio GitHub:** [https://github.com/alxnrocha/gestor-tarefas](https://github.com/alxnrocha/gestor-tarefas)

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
├── index.html                     # Entrypoint HTML5
├── screenshots/                   # Capturas de pantalla reales
│   ├── desktop.png
│   └── mobile.png
├── src/
│   ├── components/                # Formulario de creación, listado y filtros
│   ├── data/                      # Tareas de demostración predefinidas
│   ├── types/                     # Tipos de tareas, prioridades y filtros
│   ├── utils/                     # Persistencia en localStorage y utilidades de fecha
│   ├── App.tsx                    # Shell principal de la aplicación
│   └── index.css                  # Tokens y temas de Tailwind CSS
└── vite.config.ts                 # Configuración de Vite
```

---

## ⚡ Guía de Inicio Rápido

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/alxnrocha/gestor-tarefas.git
cd gestor-tarefas
npm install
```

### 2. Iniciar en Modo Desarrollo
```bash
npm run dev
```

---

## 🧪 Calidad de Código y Pruebas

```bash
# Análisis estático de código
npm run lint

# Compilar para producción
npm run build
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para más detalles.

**Autor:** [Alexandre Rocha](https://github.com/alxnrocha)
