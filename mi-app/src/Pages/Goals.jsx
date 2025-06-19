import React, { useState, useEffect } from 'react'

export default function Goals({ goals, setGoals }) {
  const [formState, setFormState] = useState({ agua: '', azucar: '' })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (goals) {
      setFormState({
        agua: goals.agua.toString(),
        azucar: goals.azucar.toString(),
      })
    }
  }, [goals])

  const validate = () => {
    const aguaNum = Number(formState.agua)
    const azucarNum = Number(formState.azucar)
    if (isNaN(aguaNum) || aguaNum < 0) return 'La meta de agua debe ser un número positivo.'
    if (isNaN(azucarNum) || azucarNum < 0) return 'La meta de azúcar debe ser un número positivo.'
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validate()
    if (error) {
      setMessage({ type: 'danger', text: error })
      return
    }

    setGoals({
      agua: Number(formState.agua),
      azucar: Number(formState.azucar),
    })

    setMessage({ type: 'success', text: 'Metas actualizadas correctamente.' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (/^\d*$/.test(value)) {
      setFormState((prev) => ({ ...prev, [name]: value }))
    }
  }

  return (
    <main className="container py-5" aria-labelledby="goals-heading">
      <h1 id="goals-heading" className="mb-4">Configuración de Metas Semanales</h1>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert" aria-live="polite">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mx-auto" style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label htmlFor="agua" className="form-label">Meta semanal de agua (vasos)</label>
          <input
            id="agua"
            name="agua"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            className="form-control"
            value={formState.agua}
            onChange={handleChange}
            aria-describedby="aguaHelp"
            required
          />
          <div id="aguaHelp" className="form-text">Cantidad mínima de vasos de agua que quieres tomar semanalmente.</div>
        </div>

        <div className="mb-4">
          <label htmlFor="azucar" className="form-label">Máximo semanal de azúcar (porciones)</label>
          <input
            id="azucar"
            name="azucar"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            className="form-control"
            value={formState.azucar}
            onChange={handleChange}
            aria-describedby="azucarHelp"
            required
          />
          <div id="azucarHelp" className="form-text">Cantidad máxima permitida de porciones de azúcar semanalmente.</div>
        </div>

        <button type="submit" className="btn btn-primary w-100" aria-label="Guardar metas">
          Guardar metas
        </button>
      </form>
    </main>
  )
}
