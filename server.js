import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ROOT (para probar)
app.get('/', (req, res) => {
  res.send("Backend activo");
});

// CHAT (clave)
app.post('/chat', (req, res) => {
  const { message } = req.body;

  res.json({
    reply: "JaoviGo activo: " + message
  });
});

// LEAD
app.post('/lead', (req, res) => {
  console.log("Nuevo lead:", req.body);
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
