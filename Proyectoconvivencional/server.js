const express = require('express');
const cors = require('cors'); // Necesario para evitar errores de conexión web
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());

// CONFIGURACIÓN DE SUPABASE
const supabaseUrl = 'https://mgzryyktqhwfoskctxtd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nenJ5eWt0cWh3Zm9za2N0eGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNDA2NzksImV4cCI6MjA5NzgxNjY3OX0.QqZxMU-qdKEoQyclctz20EoJQBxVQ0f1jd-Egp4ITpY';
const supabase = createClient(supabaseUrl, supabaseKey);

// RUTA PRINCIPAL (Para evitar el mensaje de "Cannot GET /")
app.get('/', (req, res) => {
    res.send('Servidor del Proyecto Convivencial Activo');
});

// RUTA PARA REGISTRAR FALTA
app.post('/api/registrar-falta', async (req, res) => {
    const { estudiante_id, tipo, descripcion, estado } = req.body;
    
    const { data, error } = await supabase
        .from('historial')
        .insert([{ estudiante_id, tipo, descripcion, estado }]);

    if (error) {
        console.error("Error al insertar:", error.message);
        return res.status(500).json({ error: error.message });
    }
    res.json({ success: true, data });
});

// PUERTO DINÁMICO (Crucial para Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));