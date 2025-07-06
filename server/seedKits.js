// seedKits.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ajgarage';

const kitSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  ano: { type: Number, required: true },
  nivel: { type: String, enum: ['Básico','Intermedio','Completo'], default: 'Básico' },
  elementos: [{ type: String }],
  manualRefs: [
    {
      elemento: String,
      partNumber: String,
      fabricante: String
    }
  ],
  liquidos: [
    {
      tipo: String,
      especificacion: String,
      cantidadLitros: Number
    }
  ]
});

const Kit = mongoose.model('Kit', kitSchema);

async function seed() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Conectado a MongoDB para seeding');

  await Kit.deleteMany({});

  const kits = [
    {
      marca: 'Toyota', modelo: 'Corolla', ano: 2018, nivel: 'Básico',
      elementos: ['Filtro de aceite', 'Filtro de aire'],
      manualRefs: [
        { elemento: 'Filtro de aceite', partNumber: '90915-YZZD2', fabricante: 'Toyota' },
        { elemento: 'Filtro de aire', partNumber: '17801-0T030', fabricante: 'Toyota' }
      ],
      liquidos: [
        { tipo: 'Aceite Motor', especificacion: 'SAE 0W-20 API SN', cantidadLitros: 4.2 }
      ]
    },
    {
      marca: 'Volkswagen', modelo: 'Golf', ano: 2017, nivel: 'Intermedio',
      elementos: ['Filtro de aceite', 'Filtro de aire', 'Filtro de combustible'],
      manualRefs: [
        { elemento: 'Filtro de aceite', partNumber: '06J115562AB', fabricante: 'VW' },
        { elemento: 'Filtro de aire', partNumber: '5Q0129620', fabricante: 'VW' },
        { elemento: 'Filtro de combustible', partNumber: '5Q0127401B', fabricante: 'VW' }
      ],
      liquidos: [
        { tipo: 'Aceite Motor', especificacion: 'SAE 5W-30 VW 502 00', cantidadLitros: 4.5 },
        { tipo: 'Refrigerante', especificacion: 'G12', cantidadLitros: 7.0 }
      ]
    },
    {
      marca: 'BMW', modelo: 'Serie 3', ano: 2019, nivel: 'Completo',
      elementos: ['Filtro de aceite', 'Filtro de aire', 'Filtro de combustible', 'Bujías'],
      manualRefs: [
        { elemento: 'Filtro de aceite', partNumber: '11 42 7 831 389', fabricante: 'BMW' },
        { elemento: 'Filtro de aire', partNumber: '13 71 7 826 127', fabricante: 'BMW' },
        { elemento: 'Filtro de combustible', partNumber: '13 71 7 516 826', fabricante: 'BMW' },
        { elemento: 'Bujías', partNumber: '12 12 8 335 601', fabricante: 'BMW' }
      ],
      liquidos: [
        { tipo: 'Aceite Motor', especificacion: 'BMW LL-01 FE', cantidadLitros: 5.0 },
        { tipo: 'Líquido de frenos', especificacion: 'DOT 4', cantidadLitros: 0.5 }
      ]
    },
    {
      marca: 'Honda', modelo: 'Civic', ano: 2020, nivel: 'Básico',
      elementos: ['Filtro de aceite', 'Filtro de aire'],
      manualRefs: [
        { elemento: 'Filtro de aceite', partNumber: '15400-PLM-A02', fabricante: 'Honda' },
        { elemento: 'Filtro de aire', partNumber: '17220-5AA-A00', fabricante: 'Honda' }
      ],
      liquidos: [
        { tipo: 'Aceite Motor', especificacion: 'SAE 0W-20 API SN', cantidadLitros: 3.7 }
      ]
    },
    {
      marca: 'Ford', modelo: 'Fiesta', ano: 2016, nivel: 'Intermedio',
      elementos: ['Filtro de aceite', 'Filtro de combustible', 'Filtro de aire'],
      manualRefs: [
        { elemento: 'Filtro de aceite', partNumber: 'CV6Z-6731-A', fabricante: 'Ford' },
        { elemento: 'Filtro de combustible', partNumber: 'YM21-9N184-BA', fabricante: 'Ford' },
        { elemento: 'Filtro de aire', partNumber: 'YM21-9601-AB', fabricante: 'Ford' }
      ],
      liquidos: [
        { tipo: 'Aceite Motor', especificacion: '5W-30 Ford WSS-M2C913-D', cantidadLitros: 4.3 }
      ]
    }
  ];

  await Kit.insertMany(kits);
  console.log('Base de datos poblada con kits de ejemplo');
  mongoose.disconnect();
}

seed().catch(err => console.error(err));
