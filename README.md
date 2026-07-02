<div align="center">

# Taller 3 - Sistema de gestión de tareas

Servidor **NestJS** con **API GraphQL** para gestionar tareas de proyectos de desarrollo de software.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Apollo](https://img.shields.io/badge/Apollo-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)

</div>

---

## Descripción

API GraphQL que permite crear, consultar, actualizar y eliminar tareas. Cada tarea gestiona su título, descripción, estado, etiquetas, fecha de creación, usuario asignado y proyecto.


## Características

- **CRUD completo de tareas** mediante mutations y queries de GraphQL.
- **Estados de flujo de trabajo** (Backlog, To Do, In Progress, Done) validados por un enum.
- **Etiquetas dinámicas** para clasificar cada tarea.
- **Logging automático** de todas las operaciones mediante un interceptor.
- **Manejo de errores** con excepciones descriptivas cuando una tarea no existe.

## Requisitos previos

- Node.js (versión 18 o superior)
- npm

## Instalación

```bash
git clone <url-del-repositorio>
cd Taller-3-Topicos-Program
npm install
```

## Ejecución

```bash
npm run start:dev
```

El servidor quedará disponible en **http://localhost:3000/graphql**

---
## Uso de la API

La API se prueba desde la interfaz de GraphQL en la URL anterior.

### Crear una tarea

```graphql
mutation {
  crearTarea(createTareaInput: {
    titulo: "Implementar login"
    descripcion: "Crear el módulo de autenticación"
    usuarioAsignado: "Melis"
    proyecto: "Sistema de gestión"
  }) {
    id
    titulo
    estado
    fechaCreacion
  }
}
```

### Consultar todas las tareas

```graphql
query {
  tareas {
    id
    titulo
    estado
    etiquetas
    usuarioAsignado
    proyecto
  }
}
```

### Actualizar una tarea

```graphql
mutation {
  actualizarTarea(updateTareaInput: {
    id: "<id-de-la-tarea>"
    estado: IN_PROGRESS
    etiquetas: ["backend", "urgente"]
  }) {
    id
    estado
    etiquetas
  }
}
```

### Eliminar una tarea

```graphql
mutation {
  eliminarTarea(id: "<id-de-la-tarea>") {
    id
    titulo
  }
}
```

---

## Arquitectura

- **Resolvers** exponen las operaciones GraphQL y delegan toda la lógica en la capa de servicio.
- **Servicio** concentra la lógica de negocio y gestiona los datos, de forma que el mecanismo de almacenamiento puede cambiarse sin tocar los resolvers.
- **Interceptor de logging** aplica registro transversal a todas las operaciones, manteniéndolo separado de la lógica de negocio.

## Estructura

| Carpeta | Responsabilidad |
|---------|-----------------|
| `tarea/entities` | Definición de la entidad `Tarea` |
| `tarea/dto` | Inputs de creación y actualización |
| `tarea/tarea.service.ts` | Lógica de negocio (CRUD) |
| `tarea/tarea.resolver.ts` | Operaciones GraphQL |
| `common/interceptors` | Interceptor de logging |

### ¿Cómo funciona una operación?

Cada petición atraviesa las capas en este orden:

`Interceptor (log) → Resolver → Servicio → Interceptor (log + duración)`

El resolver nunca contiene lógica de negocio, solo recibe la petición y la delega al servicio. El interceptor envuelve todo el recorrido sin que las demás capas lo sepan.