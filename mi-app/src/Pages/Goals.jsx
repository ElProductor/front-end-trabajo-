import React from 'react'
import GoalsManager from '../components/GoalsManager'

export default function Goals({ goals, setGoals }) {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Tus Metas Nutricionales</h1>
      <GoalsManager goals={goals} setGoals={setGoals} />
    </div>
  )
}
