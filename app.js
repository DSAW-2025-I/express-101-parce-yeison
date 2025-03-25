const express = require('express');

const app = express();

const estudiantes = {
  '1': {
    name: "Juan Felipe",
    lastName: "López Moncada",
    email: "juanlopemon@unisabana.edu.co",
    id: "329645"
  },
  '2': {
    name: "Julian Eduardo",
    lastName: "Romero Martínez",
    email: "julianroma@unisabana.edu.co",
    id: "325312"
  }
};

app.get('/user-info/:id', (req, res) => {
  const id = req.params.id;

  if (id !== '1' && id !== '2') {
    return res.status(400).json({ error: 'ID inválido. Sólo se aceptan "1" o "2".' });
  }

  if (!estudiantes[id]) {
    return res.status(404).json({ error: 'No se encontró información para este usuario.' });
  }

  res.json(estudiantes[id]);
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

module.exports = app;