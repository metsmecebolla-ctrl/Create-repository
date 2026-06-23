const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

// Usamos el cliente SIN ninguna configuración de realtime
const supabase = createClient(
  'https://mgzryyktqhwfoskctxtd.supabase.co', 
  'TU_CLAVE_ANON_AQUI'
);

app.get('/test-db', async (req, res) => {
    try {
        const { data, error } = await supabase.from('historial').select('*').limit(1);
        if (error) throw error;
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(10000, () => console.log('Servidor en puerto 10000'));
