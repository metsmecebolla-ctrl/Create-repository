const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = 'https://mgzryyktqhwfoskctxtd.supabase.co';
// Pega aquí tu clave anon (la que empieza con eyJ...)
const supabaseKey = 'TU_CLAVE_AQUI'; 

// Inicialización estándar sin forzar transporte, esto es lo más estable
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.send('Servidor Activo');
});

app.get('/test-db', async (req, res) => {
    try {
        const { data, error } = await supabase.from('historial').select('*').limit(1);
        if (error) throw error;
        res.json({ mensaje: "Conexión exitosa", datos: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});