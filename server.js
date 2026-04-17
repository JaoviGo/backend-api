import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Replace with your OpenAI API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Eres el asistente oficial de JaoviGo. Explica el proyecto, capta riders e inversionistas." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: "Error en IA" });
  }
});

app.post('/lead', (req, res) => {
  console.log("Nuevo lead:", req.body);
  res.json({ status: "ok" });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
