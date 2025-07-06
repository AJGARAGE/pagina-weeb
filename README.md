# AJ Garage DIY

Este proyecto es una demostraci\u00f3n sencilla de una web para vender kits de mantenimiento de veh\u00edculos desde el a\u00f1o 2000 en adelante. Incluye un backend con Express y MongoDB y un frontend creado con React.

## Estructura
- **server**: servidor Express con una colecci\u00f3n `Kit`.
- **client**: aplicaci\u00f3n React que consume la API y muestra los kits disponibles.

## Puesta en marcha
1. Instalar dependencias en `server` y `client`:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
2. Iniciar MongoDB en local y ejecutar el servidor:
   ```bash
   cd ../server
   npm start
   ```
3. En otra terminal arrancar el cliente React:
   ```bash
   cd ../client
   npm start
   ```

Al iniciarse el servidor, se poblar\u00e1 la base de datos con algunos kits de ejemplo.
