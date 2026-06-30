# Decisiones Tecnicas

## Stack

El proyecto usa React, TypeScript, Vite y Tailwind CSS porque el alcance exige
componentes reutilizables, estado local tipado, filtros y una interfaz
responsive sin necesidad de backend.

Lucide React se utiliza para iconografia consistente en controles y elementos
de apoyo visual.

## Estado

El estado se mantiene con hooks de React. No se incorpora una biblioteca de
estado global porque el flujo se resuelve con estado local, datos derivados y
props sin introducir complejidad innecesaria.

Los filtros, resumen y lista visible se derivan desde la lista actual de tareas
para evitar duplicar estado calculable.

## Datos

Las tareas se modelan con tipos explicitos en TypeScript. El modelo incluye
titulo, descripcion, estado, prioridad, categoria, fecha limite y marcas de
creacion/actualizacion.

Las tareas de demostracion viven en un modulo de datos separado para mantener
la interfaz desacoplada del contenido inicial.

## Persistencia

La aplicacion usa `localStorage` con una clave versionada. La carga valida que
los datos almacenados tengan la forma esperada antes de usarlos.

Si el almacenamiento esta vacio, corrupto o no disponible, la aplicacion vuelve
a la lista de demostracion sin romper la experiencia.

## Accesibilidad

La interfaz usa etiquetas visibles, controles nativos, foco visible, mensajes
de error asociados con `aria-describedby`, estados invalidos y botones con
nombres accesibles.

Los cambios de resumen y conteo se anuncian con regiones vivas. La cabecera
incluye un enlace para saltar al contenido principal y las secciones internas
usan margen de scroll para no quedar cubiertas por el encabezado fijo.

## Responsive

La interfaz sigue un enfoque mobile first. El header, formulario, filtros,
lista y botones se adaptan desde pantallas pequenas hasta escritorio sin
desbordamiento horizontal.

## Deploy

El proyecto usa `base: '/gestor-tarefas/'` en Vite y workflow de GitHub Pages.
Cada push a `main` instala dependencias, ejecuta el build y publica el
directorio `dist`.
