# Decisiones Tecnicas

## Stack

El proyecto usa React, TypeScript, Vite y Tailwind CSS porque el alcance exige
componentes reutilizables, estado local tipado, filtros y una interfaz
responsive sin necesidad de backend.

## Persistencia

La primera version usara `localStorage`. Es suficiente para demostrar
persistencia local, serializacion de datos y recuperacion del estado al volver
a abrir la aplicacion.

## Estado

El estado se mantendra con hooks de React. No se incorpora una biblioteca de
estado global en esta etapa porque el flujo puede resolverse con estado local y
props sin introducir complejidad innecesaria.

## Datos

Las tareas se modelan con tipos explicitos en TypeScript. Los filtros y resumen
se derivaran desde la lista actual para evitar duplicar estado calculable.

## Accesibilidad

Los formularios usaran labels visibles, mensajes de error asociados, foco
visible y botones reales para las acciones. Los cambios relevantes de resumen
podran anunciarse con regiones vivas cuando se implemente la experiencia
funcional.

## Deploy

El proyecto se preparara para GitHub Pages con `base: '/gestor-tarefas/'` en
Vite y workflow de publicacion al finalizar la fase de release.
