import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader, AlertTriangle, Brain } from 'lucide-react'

export default function IAExperiments() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://dog.ceo/api/breeds/image/random')
        setData(res.data)
        setError(null)
      } catch {
        setError('Error al conectar con la IA externa.')
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section className="container my-4" aria-live="polite" aria-busy={loading}>
      <h2 className="mb-3 d-flex align-items-center gap-2">
        <Brain size={24} aria-hidden="true" />
        <span>Módulo Experimental de IA</span>
      </h2>

      {loading && (
        <p className="text-muted d-flex align-items-center gap-2" role="status">
          <Loader className="spinner-border spinner-border-sm" aria-hidden="true" />
          <span>Cargando reflexión...</span>
        </p>
      )}

      {error && !loading && (
        <p className="text-danger d-flex align-items-center gap-2" role="alert">
          <AlertTriangle size={18} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      {!loading && data && !error && (
        <div className="text-center">
          <h3>Imagen aleatoria de perro</h3>
          <img
            src={data.message}
            alt="Perro aleatorio"
            className="img-fluid rounded"
            style={{ maxHeight: 300 }}
          />
        </div>
      )}
    </section>
  )
}
