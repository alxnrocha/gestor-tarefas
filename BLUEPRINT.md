# Blueprint - Gestor de Tareas

## Objetivo

Construir una aplicacion frontend responsive para gestionar tareas con datos
locales persistidos en el navegador. El proyecto debe demostrar CRUD local,
estado derivado, filtros y una interfaz clara para uso frecuente.

## Usuario objetivo

Persona que necesita organizar tareas personales, estudio o trabajo sin crear
una cuenta ni depender de un backend.

## Alcance funcional

- crear tareas;
- editar titulo, descripcion, prioridad, fecha y categoria;
- marcar tareas como completadas o pendientes;
- eliminar tareas;
- filtrar por estado, prioridad y categoria;
- buscar por texto;
- mostrar resumen de tareas activas, completadas y vencidas;
- persistir datos en `localStorage`;
- limpiar datos de demostracion cuando sea necesario.

## Modelo inicial de tarea

```ts
type Task = {
  id: string
  title: string
  description: string
  status: 'pending' | 'completed'
  priority: 'low' | 'medium' | 'high'
  category: string
  dueDate: string
  createdAt: string
  updatedAt: string
}
```

## Interfaz prevista

- cabecera con nombre del producto y acciones principales;
- formulario de tarea;
- lista de tareas con estados visibles;
- filtros por estado, prioridad y categoria;
- busqueda textual;
- panel de resumen;
- estados vacios;
- mensajes de validacion.

## Criterios de calidad

- mobile first;
- sin desbordamiento horizontal desde 320 px;
- foco visible;
- controles con nombres accesibles;
- validacion clara;
- estado persistente fiable;
- sin errores de consola;
- build de produccion validado.

## Plan de issues

1. estructura inicial del proyecto;
2. modelo de datos y utilidades de tareas;
3. layout principal;
4. formulario de creacion y edicion;
5. lista y acciones de tarea;
6. filtros, busqueda y resumen;
7. persistencia con `localStorage`;
8. pulido responsive y accesibilidad;
9. documentacion, capturas y deploy.
