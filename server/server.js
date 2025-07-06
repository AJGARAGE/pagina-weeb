import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import Kit from './models/Kit.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ajgarage';

app.use(cors());
app.use(express.json());
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', seedKits);

// Simple seed data for first run
async function seedKits() {
  const count = await Kit.countDocuments();
  if (count === 0) {
    await Kit.create([
      {
        marca: 'Universal',
        modelo: 'Sedan',
        ano: 2000,
        elementos: ['Aceite', 'Filtro', 'Guantes'],
        nivel: 'Básico',
        linkCompra: 'https://ejemplo.com/kit-basico'
      },
      {
        marca: 'Universal',
        modelo: 'SUV',
        ano: 2005,
        elementos: ['Pastillas de freno', 'Gato hidráulico', 'Guantes'],
        nivel: 'Frenos',
        linkCompra: 'https://ejemplo.com/kit-frenos'
      }
    ]);
  }
}

app.get('/api/kits', async (req, res) => { res.json(await Kit.find({})); });

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
