import React, { useEffect, useState, useCallback } from 'react'
import { RefreshCw, Clock, Users, ExternalLink } from 'lucide-react'

export default function RecipeSuggestions() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('Vegetarian')

  const categories = [
    'Vegetarian',
    'Seafood',
    'Chicken',
    'Beef',
    'Dessert',
    'Breakfast'
  ]

  const fetchRecipes = useCallback(async (selectedCategory) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      )
      
      if (!response.ok) {
        throw new Error('Error al cargar las recetas')
      }
      
      const data = await response.json()
      
      if (data.meals) {
        // Mezclar aleatoriamente y tomar 6 recetas
        const shuffled = data.meals.sort(() => 0.5 - Math.random())
        setRecipes(shuffled.slice(0, 6))
      } else {
        setRecipes([])
      }
    } catch (err) {
      setError(err.message)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRecipes(category)
  }, [category, fetchRecipes])

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
  }

  const handleRefresh = () => {
    fetchRecipes(category)
  }

  const getRecipeDetails = async (recipeId) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      )
      const data = await response.json()
      if (data.meals && data.meals[0]) {
        // Abrir en una nueva ventana o mostrar detalles
        window.open(`https://www.themealdb.com/meal/${recipeId}`, '_blank')
      }
    } catch (err) {
      console.error('Error al obtener detalles:', err)
    }
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-1">
              Error al cargar recetas
            </h3>
            <p className="text-red-600">{error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Recetas Saludables Sugeridas
        </h3>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Actualizar
        </button>
      </div>

      {/* Selector de categorías */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría:
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Cargando recetas...</span>
        </div>
      )}

      {/* Recetas */}
      {!loading && recipes.length === 0 && !error && (
        <div className="text-center py-8 text-gray-500">
          <p>No se encontraron recetas para esta categoría</p>
        </div>
      )}

      {!loading && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                    {category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {recipe.strMeal}
                </h4>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>~30 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>2-4 porciones</span>
                  </div>
                </div>
                
                <button
                  onClick={() => getRecipeDetails(recipe.idMeal)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink size={16} />
                  Ver Receta
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> Haz clic en "Ver Receta" para obtener ingredientes e instrucciones detalladas.
          Las recetas se actualizan automáticamente para ofrecerte variedad.
        </p>
      </div>
    </div>
  )
}