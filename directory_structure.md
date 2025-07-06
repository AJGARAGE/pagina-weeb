
# Estructura y Configuración Completa del Proyecto

Este documento contiene la **estructura de directorios** y los **archivos base** con su contenido, listos para copiar y pegar en tu repositorio **ajgarage-platform**.

```
ajgarage-platform/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
│
├── server/
│   ├── models/
│   │   └── Kit.js
│   ├── seedKits.js
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── .github/
│   └── workflows/
│       └── deploy_railway.yml
│
├── .gitignore
├── README.md
└── package.json  (opcional unificado)
```

## 1. Archivo raíz: `package.json` (opcional)

\`\`\`json
{
  "name": "ajgarage-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server/server.js",
    "build-client": "npm install --prefix client && npm run build --prefix client",
    "postinstall": "npm install --prefix client && npm install --prefix server"
  }
}
\`\`\`

## 2. `.gitignore`

\`\`\`
# Node
node_modules/
client/node_modules/
server/node_modules/

# Build
client/build/

# Env
.env
\`\`\`

## 3. Frontend (`client/`)

### 3.1 `client/package.json`

\`\`\`json
{
  "name": "ajgarage-client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
\`\`\`

### 3.2 `client/public/index.html`

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AJ Garage DIY</title>
</head>
<body>
  <div id="root"></div>
  <script src="../src/index.js"></script>
</body>
</html>
\`\`\`

### 3.3 `client/src/App.jsx`

\`\`\`jsx
import React from 'react';

export default function App() {
  return (
    <div>
      <h1>Bienvenido a AJ Garage DIY</h1>
    </div>
  );
}
\`\`\`

### 3.4 `client/README.md`

\`\`\`
# Cliente React

## Instalación
\`\`\`
npm install
\`\`\`
## Desarrollo
\`\`\`
npm start
\`\`\`
## Build
\`\`\`
npm run build
\`\`\`
\`\`\`

## 4. Backend (`server/`)

### 4.1 `server/package.json`

\`\`\`json
{
  "name": "ajgarage-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^6.0.0"
  }
}
\`\`\`

### 4.2 `server/models/Kit.js`

\`\`\`js
import mongoose from 'mongoose';

const kitSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  ano: Number,
  elementos: [String],
  nivel: { type: String, enum: ['Básico','Intermedio','Completo'] }
});

export default mongoose.model('Kit', kitSchema);
\`\`\`

### 4.3 `server/seedKits.js`

*(copia el script de seedKits que ya tienes generado)*

### 4.4 `server/server.js`

*(copia el servidor Express con rutas `/api/kits` y servicio de React build)*

### 4.5 `server/README.md`

\`\`\`
# Servidor Express

## Instalación
\`\`\`
cd server && npm install
\`\`\`
## Uso
\`\`\`
npm start
\`\`\`
\`\`\`

## 5. CI/CD (`.github/workflows/deploy_railway.yml`)

\`\`\`yaml
name: Deploy to Railway
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g railway
      - env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: railway up --detach
\`\`\`

¡Con esto tienes **todos los ficheros base** ya listos!
