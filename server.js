const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws'); 

const app = express();

app.use(cors());
app.use(express.json());

// CONFIGURACIÓN DE SUPABASE
const supabaseUrl = 'https://mgzryyktqhwfoskctxtd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nenJ5eWt0cWh3Zm9za2N0eGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNDA2NzksImV4cCI6MjA5NzgxNjY3OX0.QqZxMU-qdKEoQyclctz20EoJQBxVQ0f1jd-Egp4ITpY';
// Inicialización corregida
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
        // Asegúrate de cambiar 'nombre_de_tu_tabla' por el nombre real de una tabla en tu Supabase
        // Cambia 'nombre_de_tu_tabla' por 'historial' (o 'Estudiantes')
const { data, error } = await supabase.from('historial').select('*').limit(1);
        if (error) throw error;
        
        res.json({ mensaje: "¡Conexión exitosa con Supabase!", datos: data });
    } catch (err) {
        res.status(500).json({ mensaje: "Error conectando a la DB", error: err.message });
    }
});

// PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});