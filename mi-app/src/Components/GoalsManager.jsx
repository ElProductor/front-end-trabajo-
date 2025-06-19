import React from 'react'

export default function GoalsManager({ goals, setGoals }) {
  function handleChange(e) {
    const { name, value } = e.target
    setGoals({ ...goals, [name]: Number(value) })
  }

  return (
    <div className="mb-4">
      <h3>Metas semanales</h3>
      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Vasos de agua (objetivo semanal)</label>
          <input
            type="number"
            className="form-control"
            name="agua"
            min="0"
            value={goals.agua}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-2">
          <label>Consumo de azúcar máximo (veces por semana)</label>
          <input
            type="number"
            className="form-control"
            name="azucar"
            min="0"
            value={goals.azucar}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}
