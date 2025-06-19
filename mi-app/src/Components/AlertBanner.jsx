import React from 'react'

export default function AlertBanner({ meals, goals }) {
  // Ejemplo: contar cuántas veces aparece "azúcar" en comidas de la semana
  const sugarCount = meals.filter(m =>
    m.food.toLowerCase().includes('azúcar'),
  ).length

  const waterCount = meals.filter(m =>
    m.food.toLowerCase().includes('agua'),
  ).length

  const alerts = []

  if (waterCount < goals.agua) {
    alerts.push(
      `No has cumplido tu meta de ingesta de agua semanal (${waterCount}/${goals.agua})`,
    )
  }
  if (sugarCount > goals.azucar) {
    alerts.push(
      `Has consumido más azúcar de la meta semanal (${sugarCount}/${goals.azucar})`,
    )
  }

  if (alerts.length === 0) return null

  return (
    <div className="alert alert-warning" role="alert">
      {alerts.map((alert, i) => (
        <p key={i} className="mb-0">
          ⚠️ {alert}
        </p>
      ))}
    </div>
  )
}
