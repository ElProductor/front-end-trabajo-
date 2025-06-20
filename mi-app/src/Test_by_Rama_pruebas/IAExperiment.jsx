import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader, AlertTriangle, Brain } from 'lucide-react'

export default function IAExperiments() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulación: Llamada a una IA externa (ejemplo: API de frases motivacionales)
    axios
      .get('https://api.quotable.io/random?tags=inspirational')
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError('Error al conectar con la IA externa.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="container my-4">
      <h2 className="mb-3 d-flex align-items-center gap-2">
        <Brain size={24} />
        Módulo Experimental de IA
      </h2>

      {loading && (
        <p className="text-muted d-flex align-items-center gap-2">
          <Loader className="spinner-border spinner-border-sm" /> Cargando reflexión...
        </p>
      )}

      {error && (
        <p className="text-danger d-flex align-items-center gap-2">
          <AlertTriangle size={18} /> {error}
        </p>
      )}

      {data && (
        <blockquote className="blockquote">
          <p className="mb-2">"{data.content}"</p>
          <footer className="blockquote-footer">{data.author}</footer>
        </blockquote>
      )}
    </div>
  )
}
