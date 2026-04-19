import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// TEST
app.get('/', (req, res) => {
  res.send("Backend activo");
});

// CHAT IA
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres el asistente de JaoviGo. Explica la plataforma y capta riders e inversionistas."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    // 🔥 VER ERROR REAL EN LOGS
    console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2));

    // ❌ SI OPENAI FALLA
    if (data.error) {
      return res.json({
        reply: "Error IA: " + data.error.message
      });
    }

    // ❌ SI NO HAY RESPUESTA
    if (!data.choices || !data.choices.length) {
      return res.json({
        reply: "IA no respondió"
      });
    }

    // ✅ RESPUESTA OK
    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.json({
      reply: "Error conexión IA"
    });
  }
});

// LEADS
app.post('/lead', (req, res) => {
  console.log("Nuevo lead:", req.body);
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
