import React, { useEffect, useState } from 'react'

export default function RecipeSuggestions() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch(
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian',
    )
      .then(res => res.json())
      .then(data => setRecipes(data.meals.slice(0, 5)))
      .catch(console.error)
  }, [])

  return (
    <div className="mb-4">
      <h3>Recetas saludables sugeridas</h3>
      {recipes.length === 0 ? (
        <p>Cargando recetas...</p>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {recipes.map(recipe => (
            <div
              key={recipe.idMeal}
              className="card"
              style={{ width: '12rem' }}
            >
              <img
                src={recipe.strMealThumb}
                className="card-img-top"
                alt={recipe.strMeal}
              />
              <div className="card-body p-2">
                <h6 className="card-title">{recipe.strMeal}</h6>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
