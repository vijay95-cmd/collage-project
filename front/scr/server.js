// Minimal Express server to proxy to OpenAI
import express from 'express'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()
const app = express()
app.use(express.json())

const OPENAI_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_KEY) {
  console.warn('OPENAI_API_KEY not set — AI endpoints will fail until you add it.')
}

// small helper to build prompts for different actions
function buildPrompt(action, content) {
  if (action === 'summarize') {
    return `Summarize the following text into a short, clear summary (2-4 sentences):\n\n${content}`
  }
  if (action === 'rewrite') {
    return `Rewrite the following text to be more formal, clearer, and more concise, preserving meaning:\n\n${content}`
  }
  if (action === 'grammar') {
    return `Correct grammar and punctuation in the following text. Keep the text structure but fix mistakes:\n\n${content}`
  }
  // fallback: paraphrase
  return `Paraphrase and improve clarity without changing meaning:\n\n${content}`
}

app.post('/api/ai', async (req, res) => {
  const { action, content } = req.body
  if (!action || typeof content !== 'string') return res.status(400).send('bad request')

  const prompt = buildPrompt(action, content)

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // change as you like; must match your account's available models
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1200,
        temperature: 0.2
      })
    })

    if (!r.ok) {
      const t = await r.text()
      return res.status(502).send(t)
    }

    const data = await r.json()
    const result = data.choices?.[0]?.message?.content ?? ''
    res.json({ result })
  } catch (err) {
    console.error(err)
    res.status(500).send('server error')
  }
})

// static serve for client build (if you build front-end)
app.use(express.static('client/build'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))


3) package.json (root) - simple scripts
---------------------------------------
{
  "name": "ai-doc-editor",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start:server": "node --experimental-specifier-resolution=node server/server.js",
    "start:client": "cd client && npm run start",
    "dev": "concurrently \"npm: start:server\" \"npm: start:client\""
  },
  "dependencies": {
    "express": "^4.18.2",
    "node-fetch": "^3.3.1",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}


4) Notes, extensions, and security
----------------------------------
- Never commit your OPENAI_API_KEY to git. Use .env and add it to .gitignore.
- Use rate limiting & authentication in production. This example has no auth.
- To support larger documents, stream responses or increase max_tokens on the server.
- Add additional AI actions: expand, shorten, translate, list action items, convert to bullet points, create title.
- Add a richer editor (e.g., TipTap, Slate, or CodeMirror) for formatting and markdown preview.


5) Quick README commands
------------------------
# install server deps
npm install

# set OPENAI_API_KEY in .env:
# OPENAI_API_KEY=sk-...

# run server (in development you can run client separately)
npm run start:server

# open your React app (if using CRA/Vite) at localhost:3000 and server at 3001


-----

If you'd like, I can:
- Convert the frontend to a full Create React App or Vite project with Tailwind config.
- Add streaming updates from the server to show partial AI output.
- Add a richer editor (TipTap) with markdown preview.

*/
