import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function MealForm({ onAdd }) {
  const [food, setFood] = useState('')
  const [satiety, setSatiety] = useState(5)
  const [emotion, setEmotion] = useState('Neutral')

  function handleSubmit(e) {
    e.preventDefault()
    if (!food) return alert('Ingrese lo que comió')

    onAdd({
      id: uuidv4(),
      food,
      satiety: Number(satiety),
      emotion,
      date: new Date().toISOString(),
    })

    setFood('')
    setSatiety(5)
    setEmotion('Neutral')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">¿Qué comiste?</label>
        <input
          type="text"
          className="form-control"
          value={food}
          onChange={e => setFood(e.target.value)}
          placeholder="Ej: Ensalada de pollo"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nivel de saciedad (0-10)</label>
        <input
          type="range"
          min="0"
          max="10"
          value={satiety}
          onChange={e => setSatiety(e.target.value)}
          className="form-range"
        />
        <div>{satiety}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Estado emocional</label>
        <select
          className="form-select"
          value={emotion}
          onChange={e => setEmotion(e.target.value)}
        >
          <option>Feliz</option>
          <option>Ansioso</option>
          <option>Estresado</option>
          <option>Neutral</option>
          <option>Triste</option>
        </select>
      </div>

      <button className="btn btn-primary" type="submit">
        Registrar comida
      </button>
    </form>
  )
}
