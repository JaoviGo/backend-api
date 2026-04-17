import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Backend activo");
});

app.post('/chat', (req, res) => {
  const { message } = req.body;

  res.json({
    reply: "JaoviGo activo: " + message
  });
});

app.post('/lead', (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
