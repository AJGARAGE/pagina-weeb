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

const kitSchema = new mongoose.Schema({ marca: String, modelo: String, ano: Number, elementos: [String], nivel: String });
const Kit = mongoose.model('Kit', kitSchema);

app.get('/api/kits', async (req, res) => { res.json(await Kit.find({})); });

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  // Serve the React app from the correct build directory
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
