import React, { useState, useEffect } from 'react'
import MealForm from '../components/MealForm'
import MealList from '../components/MealList'
import AlertBanner from '../components/AlertBanner'
import StatsGraph from '../components/StatsGraph'

export default function Tracker({ meals, setMeals, goals }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Guardar comidas en localStorage automáticamente
  useEffect(() => {
    try {
      localStorage.setItem('alimentacionConscienteData', JSON.stringify(meals))
    } catch (err) {
      setError('Error guardando los datos localmente.')
      console.error(err)
    }
  }, [meals])

  const addMeal = (meal) => {
    setLoading(true)
    try {
      setMeals((prev) => [...prev, { ...meal, id: Date.now() }])
      setError(null)
    } catch (err) {
      setError('No se pudo agregar la comida.')
    } finally {
      setLoading(false)
    }
  }

  const updateMeal = (updatedMeal) => {
    setLoading(true)
    try {
      setMeals((prev) =>
        prev.map((m) => (m.id === updatedMeal.id ? updatedMeal : m))
      )
      setError(null)
    } catch (err) {
      setError('No se pudo actualizar la comida.')
    } finally {
      setLoading(false)
    }
  }

  const deleteMeal = (id) => {
    setLoading(true)
    try {
      setMeals((prev) => prev.filter((m) => m.id !== id))
      setError(null)
    } catch (err) {
      setError('No se pudo eliminar la comida.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container py-5" aria-labelledby="tracker-heading">
      <h1 id="tracker-heading" className="mb-4">
        Registro y Seguimiento de Comidas
      </h1>

      {error && (
        <div className="alert alert-danger" role="alert" aria-live="assertive">
          {error}
        </div>
      )}

      <MealForm onAdd={addMeal} disabled={loading} />
      <MealList meals={meals} onUpdate={updateMeal} onDelete={deleteMeal} disabled={loading} />
      <AlertBanner meals={meals} goals={goals} />
      <StatsGraph meals={meals} />
    </main>
  )
}
