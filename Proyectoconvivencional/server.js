const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws'); // <-- Aquí añadimos el paquete que faltaba

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// CONFIGURACIÓN DE SUPABASE
const supabaseUrl = 'https://mgzryyktqhwfoskctxtd.supabase.co';
// ¡OJO AQUÍ! Borra el texto de abajo y pega tu clave súper larga de Supabase entre las comillas
const supabaseKey = 'PEGA_TU_CLAVE_AQUI'; 

// Inicializamos Supabase con la configuración corregida para que no dé el error
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket }
});

// RUTA PRINCIPAL
app.get('/', (req, res) => {
    res.send('Servidor del Proyecto Convivencial Activo y sin errores');
});

// PUERTO Y ENCENDIDO DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});