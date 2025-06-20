import React from 'react'
import RecipeSuggestions from '../components/RecipeSuggestions'
import AlertBanner from '../components/AlertBanner'
import StatsGraph from '../components/StatsGraph'

export default function Home({ meals, goals }) {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Inicio</h1>
      <AlertBanner meals={meals} goals={goals} />
      <StatsGraph meals={meals} />
      <RecipeSuggestions />
    </div>
  )
}
