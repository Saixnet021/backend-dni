const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permitir CORS desde cualquier origen (para pruebas)
app.use(cors());

// Ruta para consultar DNI
app.get('/dni/:numero', async (req, res) => {
  const numero = req.params.numero;

  if (!numero || numero.length !== 8) {
    return res.status(400).json({ error: 'Número de DNI inválido' });
  }

  try {
    const token = 'apis-token-15604.gu2HTAf1UueC3SG3KzwFpDAQDmepklBT';  // Tu token real aquí

    const response = await axios.get(`https://api.apis.net.pe/v2/reniec/dni?numero=${numero}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Responder con los datos tal cual llegan
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al consultar la API externa' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend DNI corriendo en http://localhost:${PORT}`);
});
