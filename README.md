# E-Commerce Catalog Platform

  Descripción del Proyecto

Este proyecto es una plataforma de e-commerce desarrollada desde cero, diseñada para ofrecer una experiencia de usuario fluida, predecible y altamente reactiva. La aplicación presenta un catálogo de productos segmentado por categorías, optimizado para destacar inicialmente los 4 productos con mejor calificación (rating) en cada sección.

La arquitectura se centra en un manejo de estado robusto y una navegación segura, garantizando la fiabilidad de la aplicación mediante un control estricto de rutas (incluyendo el manejo de wildcard routes para evitar estados o URLs inesperadas) y el aprovechamiento de las capacidades reactivas del framework.

  Características Principales

- Catálogo Dinámico y Paginación: Vista principal categorizada con un límite inicial de los 4 mejores productos por categoría. Se implementó un botón "Ver más" que, mediante parámetros de ruta, despliega el catálogo completo y específico de dicha categoría.
- Enrutamiento Seguro (Robust Routing): Configuración estricta de rutas (app.routes.ts) que maneja de forma proactiva las URLs inválidas, redirigiendo al usuario a flujos seguros y reduciendo comportamientos imprevistos.
- Gestión de Estado de Navegación (RxJS): Uso de BehaviorSubject para memorizar el estado de la categoría previa. Al ingresar a los detalles de un producto y presionar "Volver", la aplicación retorna exactamente a la categoría y catálogo que el usuario estaba explorando anteriormente.
- Carrito de Compras Reactivo (Signals): Implementación de Signals nativos para el manejo del estado global del carrito de compras. Esto permite evaluar la existencia de un producto en tiempo real, alternando dinámicamente la acción del botón entre "Agregar al carrito" o "Eliminar del carrito" desde la vista de detalles.
- Barra de Navegación Inteligente (Navbar): Refleja de manera síncrona la cantidad total de artículos en el carrito y el precio acumulado, consumiendo directamente el estado reactivo de las Signals. Además, actúa como punto de enlace para redirigir al catálogo principal.
- Vista de Detalles del Producto: Sección dedicada que expone la información extendida del artículo y su puntuación (rating), manteniendo una coherencia visual y de navegación limpia.

  Tecnologías y Arquitectura

- Framework Principal: Angular (Arquitectura moderna basada en Standalone Components)
- Lenguaje: TypeScript / HTML / SCSS
- Gestores de Estado:
  - Signals: Para el estado síncrono, óptimo y reactivo del carrito de compras.
  - RxJS (BehaviorSubject): Para el control del historial y estado persistente de navegación.
- Enrutamiento: Angular Router con control de excepciones de rutas (Wildcard).

  Estructura del Proyecto

El proyecto sigue una organización limpia y escalable basada en la separación de responsabilidades:

src/app/
├── compartidos/      # Componentes UI reutilizables globalmente (ej. Navbar)
├── modelos/          # Tipado estricto e interfaces de datos (ej. productos.ts)
├── paginas/          # Componentes asociados al enrutamiento principal (Catálogo, Detalles)
└── servicios/        # Lógica de negocio y manejo de flujos de datos:
    ├── cart-service.ts      # Estado reactivo global del carrito (Signals)
    ├── catalog-service.ts   # Gestión de categorías y segmentación de productos
    └── product-service.ts   # Control y consumo de la información detallada de productos

  Instalación

Para configurar y ejecutar este proyecto en un entorno local, asegúrese de tener instalado Node.js y Angular CLI

  1. git clone https://github.com/Leo150602/dito-ecommerce.git
  2. cd dito-ecommerce
  3. npm install
  4. ng serve
  5. acceder a http://localhost:4200/ desde un buscador

o entrar a " https://dito-ecommerce.vercel.app/ " para ver el proyecto desplegado
