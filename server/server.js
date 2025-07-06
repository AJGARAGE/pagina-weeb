import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ajgarage';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión MongoDB:'));
db.once('open', () => console.log('Conectado a MongoDB'));

const kitSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  ano: { type: Number, required: true },
  elementos: [{ type: String }],
  nivel: { type: String, enum: ['Básico','Intermedio','Completo'], default: 'Básico' }
});
const Kit = mongoose.model('Kit', kitSchema);

app.get('/api/kits', async (req, res) => {
  try {
    const { marca, modelo, ano } = req.query;
    const filter = {};
    if (marca) filter.marca = new RegExp(`^${marca}$`, 'i');
    if (modelo) filter.modelo = new RegExp(`^${modelo}$`, 'i');
    if (ano) filter.ano = Number(ano);
    const kits = await Kit.find(filter);
    res.json(kits);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener kits' });
  }
});

app.post('/api/kits', async (req, res) => {
  const { marca, modelo, ano, elementos, nivel } = req.body;
  if (!marca || !modelo || !ano) return res.status(400).json({ message: 'Faltan campos obligatorios' });
  try {
    const newKit = new Kit({ marca, modelo, ano, elementos, nivel });
    const saved = await newKit.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar kit' });
  }
});

app.put('/api/kits/:id', async (req, res) => {
  try {
    const updated = await Kit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar kit' });
  }
});

app.delete('/api/kits/:id', async (req, res) => {
  try {
    await Kit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Kit eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar kit' });
  }
});

// Servir build de React en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));