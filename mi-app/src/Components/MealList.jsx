import React from 'react'

export default function MealList({ meals, onUpdate, onDelete }) {
  if (meals.length === 0)
    return <p className="text-center">No hay comidas registradas aún.</p>

  return (
    <div className="mb-4">
      <h3>Registros de comidas</h3>
      <ul className="list-group">
        {meals.map(meal => (
          <li
            key={meal.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{meal.food}</strong> - Saciedad: {meal.satiety} - Emoción:{' '}
              {meal.emotion}
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(meal.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
