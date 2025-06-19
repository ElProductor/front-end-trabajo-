import React, { useState, useEffect } from 'react'
import MealForm from './components/MealForm'
import MealList from './components/MealList'
import StatsGraph from './components/StatsGraph'
import GoalsManager from './components/GoalsManager'
import AlertBanner from './components/AlertBanner'
import RecipeSuggestions from './components/RecipeSuggestions'

const MEALS_KEY = 'alimentacionConscienteData'
const GOALS_KEY = 'alimentacionConscienteGoals'

export default function App() {
  const [meals, setMeals] = useState([])
  const [goals, setGoals] = useState({ agua: 8, azucar: 3 })

  // --- Funciones auxiliares de almacenamiento ---
  const loadFromStorage = () => {
    const storedMeals = localStorage.getItem(MEALS_KEY)
    const storedGoals = localStorage.getItem(GOALS_KEY)

    if (storedMeals) setMeals(JSON.parse(storedMeals))
    if (storedGoals) setGoals(JSON.parse(storedGoals))
  }

  const saveMeals = (data) => {
    setMeals(data)
    localStorage.setItem(MEALS_KEY, JSON.stringify(data))
  }

  const saveGoals = (data) => {
    setGoals(data)
    localStorage.setItem(GOALS_KEY, JSON.stringify(data))
  }

  // --- Efecto inicial ---
  useEffect(() => {
    loadFromStorage()
  }, [])

  // --- Acciones principales ---
  const addMeal = (meal) => {
    const newMeals = [...meals, { ...meal, id: Date.now() }]
    saveMeals(newMeals)
  }

  const updateMeal = (updatedMeal) => {
    const updated = meals.map((m) => (m.id === updatedMeal.id ? updatedMeal : m))
    saveMeals(updated)
  }

  const deleteMeal = (id) => {
    const filtered = meals.filter((m) => m.id !== id)
    saveMeals(filtered)
  }

  const resetAllData = () => {
    if (window.confirm('¿Estás seguro que deseas borrar todos los datos?')) {
      setMeals([])
      setGoals({ agua: 8, azucar: 3 })
      localStorage.removeItem(MEALS_KEY)
      localStorage.removeItem(GOALS_KEY)
    }
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">🥗 Gestor de Alimentación Consciente</h1>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-danger btn-sm" onClick={resetAllData}>
          Reiniciar todo
        </button>
      </div>

      <MealForm onAdd={addMeal} />
      <MealList meals={meals} onUpdate={updateMeal} onDelete={deleteMeal} />
      <GoalsManager goals={goals} setGoals={saveGoals} />
      <AlertBanner meals={meals} goals={goals} />
      <StatsGraph meals={meals} />
      <RecipeSuggestions meals={meals} />
    </div>
  )
}
