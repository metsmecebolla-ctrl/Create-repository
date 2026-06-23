const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws'); 

const app = express();

app.use(cors());
app.use(express.json());

// CONFIGURACIÓN DE SUPABASE
const supabaseUrl = 'https://mgzryyktqhwfoskctxtd.supabase.co';
const supabaseKey = 'PEGA_TU_CLAVE_AQUI'; 

// Aquí está el truco: le pasamos explícitamente el WebSocket
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { 
    transport: WebSocket 
  }
});

app.get('/', (req, res) => {
    res.send('Servidor del Proyecto Convivencial Activo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});