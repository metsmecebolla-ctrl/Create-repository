const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws');

const app = express();

app.use(cors());
app.use(express.json());

const supabaseUrl = 'https://mgzryyktqhwfoskctxtd.supabase.co';
// Asegúrate de pegar tu clave anon aquí adentro
const supabaseKey = 'TU_CLAVE_AQUI'; 

// Inicialización corregida con transporte de WebSocket
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { 
    transport: WebSocket 
  }
});

// RUTA PRINCIPAL
app.get('/', (req, res) => {
    res.send('Servidor del Proyecto Convivencial Activo y sin errores');
});

// RUTA DE PRUEBA DE CONEXIÓN A LA BASE DE DATOS
app.get('/test-db', async (req, res) => {
    try {
        const { data, error } = await supabase.from('historial').select('*').limit(1);
        if (error) throw error;
        res.json({ mensaje: "Conexión exitosa con Supabase!", datos: data });
    } catch (err) {
        res.status(500).json({ mensaje: "Error conectando a la DB", error: err.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});