import mongoose from 'mongoose';

const kitSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  ano: Number,
  elementos: [String],
  nivel: { type: String, enum: ['Básico','Intermedio','Completo'] }
});

export default mongoose.model('Kit', kitSchema);
