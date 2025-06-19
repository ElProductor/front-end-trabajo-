import React, { useState } from 'react'
import MealForm from './components/MealForm'
import MealList from './components/MealList'
import StatsGraph from './components/StatsGraph'
import GoalsManager from './components/GoalsManager'
import AlertBanner from './components/AlertBanner'
import RecipeSuggestions from './components/RecipeSuggestions'

export default function App() {
  const [meals, setMeals] = React.useState([])
  const [goals, setGoals] = React.useState({
    agua: 8,
    azucar: 3,
  })
  const [alerts, setAlerts] = React.useState([])

  React.useEffect(() => {
    // Cargar datos del localStorage al inicio
    const storedMeals = localStorage.getItem('alimentacionConscienteData')
    if(storedMeals) setMeals(JSON.parse(storedMeals))
  }, [])

  // Actualizar LocalStorage y estado
  function addMeal(meal) {
    const newMeals = [...meals, meal]
    setMeals(newMeals)
    localStorage.setItem('alimentacionConscienteData', JSON.stringify(newMeals))
  }

  function updateMeal(updatedMeal) {
    const updated = meals.map(m => (m.id === updatedMeal.id ? updatedMeal : m))
    setMeals(updated)
    localStorage.setItem('alimentacionConscienteData', JSON.stringify(updated))
  }

  function deleteMeal(id) {
    const filtered = meals.filter(m => m.id !== id)
    setMeals(filtered)
    localStorage.setItem('alimentacionConscienteData', JSON.stringify(filtered))
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestor de Alimentación Consciente</h1>
      <MealForm onAdd={addMeal} />
      <MealList meals={meals} onUpdate={updateMeal} onDelete={deleteMeal} />
      <GoalsManager goals={goals} setGoals={setGoals} />
      <AlertBanner meals={meals} goals={goals} />
      <StatsGraph meals={meals} />
      <RecipeSuggestions />
    </div>
  )
}
