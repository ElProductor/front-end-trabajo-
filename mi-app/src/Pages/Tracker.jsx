import React from 'react'
import MealForm from '../components/MealForm'
import MealList from '../components/MealList'
import IAExperiments from './Test_by_Rama_pruebas/IAExperiments'

export default function Tracker({ meals, setMeals, onAdd, onUpdate, onDelete }) {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Seguimiento Diario</h1>
      <MealForm onAdd={onAdd} />
      <MealList meals={meals} onUpdate={onUpdate} onDelete={onDelete} />
      <IAExperiments />
    </div>
  )
}
