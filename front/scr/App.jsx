// AI Document Editor — Single-file React app + Node backend (step-by-step)


Overview
--------
This example shows a simple AI-powered document editor using:
- Frontend: React (single file component) with Tailwind-style utility classes
- Backend: Node + Express endpoint that proxies requests to the OpenAI API

Features included
- Open / paste / edit documents (plain text / markdown)
- AI actions: summarize, rewrite (tone), grammar check
- Automatic versioning (simple undo stack)
- Save / download document

Prerequisites
- Node 18+ installed
- An OpenAI API key stored in an environment variable OPENAI_API_KEY

Folder layout (suggested)
- /project
  - /client  (React app)
    - src/App.jsx   <-- this file content
  - /server
    - server.js
  - package.json
  - README.md


1) Frontend: src/App.jsx
------------------------
import React, { useState, useRef } from 'react'

export default function App() {
  const [text, setText] = useState('# Welcome to AI Document Editor\n\nStart typing...')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('ready')
  const undoStack = useRef([])
  const redoStack = useRef([])

  function pushUndo(snapshot) {
    undoStack.current.push(snapshot)
    // cap stack to avoid excessive memory
    if (undoStack.current.length > 50) undoStack.current.shift()
  }

  function handleChange(e) {
    pushUndo(text)
    setText(e.target.value)
    // clear redo on new edit
    redoStack.current = []
  }

  function undo() {
    if (undoStack.current.length === 0) return
    const last = undoStack.current.pop()
    redoStack.current.push(text)
    setText(last)
  }

  function redo() {
    if (redoStack.current.length === 0) return
    const next = redoStack.current.pop()
    pushUndo(text)
    setText(next)
  }

  async function callAI(action) {
    setLoading(true)
    setStatus(`${action}...`)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, content: text })
      })
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      // server returns { result: '...' }
      pushUndo(text)
      setText(json.result)
      setStatus('ready')
    } catch (err) {
      console.error(err)
      setStatus('error')
      alert('AI action failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  function downloadFile() {
    const blob = new Blob([text], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.md'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-50">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">AI Document Editor</h1>
        <p className="text-sm text-gray-600">Edit, ask AI to improve, and save.</p>
      </header>

      <main className="flex gap-4">
        { Editor area */}
        <section className="flex-1">
          <textarea
            className="w-full h-[60vh] p-4 border rounded-md font-mono text-sm"
            value={text}
            onChange={handleChange}
          />

          <div className="flex gap-2 mt-3">
            <button onClick={() => callAI('summarize')} disabled={loading} className="px-3 py-2 rounded bg-blue-600 text-white">Summarize</button>
            <button onClick={() => callAI('rewrite')} disabled={loading} className="px-3 py-2 rounded bg-yellow-600 text-black">Rewrite (formal)</button>
            <button onClick={() => callAI('grammar')} disabled={loading} className="px-3 py-2 rounded bg-green-600 text-white">Grammar Check</button>
            <button onClick={undo} className="px-3 py-2 rounded border">Undo</button>
            <button onClick={redo} className="px-3 py-2 rounded border">Redo</button>
            <button onClick={downloadFile} className="px-3 py-2 rounded border">Download</button>
          </div>

          <div className="mt-2 text-xs text-gray-500">Status: {status}</div>
        </section>

        {/* Sidebar - quick actions and metadata */}
        <aside style={{width: 320}} className="p-3 border rounded-md bg-white">
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <p className="text-sm text-gray-600">You can also paste a document or drag-and-drop support if you extend the file input below.</p>
          <div className="mt-3">
            <input type="file" accept=".txt,.md" onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              pushUndo(text)
              const txt = await f.text()
              setText(txt)
            }} />
          </div>

          <hr className="my-3" />
          <h4 className="font-medium">AI Settings</h4>
          <p className="text-sm text-gray-600">Model and temperature are set on the server. To change them, edit server config.</p>
        </aside>
      </main>
    </div>
  
