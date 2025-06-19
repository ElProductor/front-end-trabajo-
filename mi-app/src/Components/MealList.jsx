import React, { useState } from 'react'
import { Trash2, Edit3, Clock, Heart, Utensils, Filter, Search, Calendar } from 'lucide-react'

export default function MealList({ meals, onUpdate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEmotion, setFilterEmotion] = useState('')
  const [filterSatiety, setFilterSatiety] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [editingMeal, setEditingMeal] = useState(null)

  // Funciones de filtrado y ordenado
  const getFilteredAndSortedMeals = () => {
    let filteredMeals = meals.filter(meal => {
      const matchesSearch = meal.food.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesEmotion = !filterEmotion || meal.emotion === filterEmotion
      const matchesSatiety = !filterSatiety || meal.satiety.toString() === filterSatiety
      
      return matchesSearch && matchesEmotion && matchesSatiety
    })

    // Ordenar
    filteredMeals.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp)
        case 'oldest':
          return new Date(a.date || a.timestamp) - new Date(b.date || b.timestamp)
        case 'food':
          return a.food.localeCompare(b.food)
        case 'satiety-high':
          return b.satiety - a.satiety
        case 'satiety-low':
          return a.satiety - b.satiety
        default:
          return 0
      }
    })

    return filteredMeals
  }

  const getEmotionColor = (emotion) => {
    const colors = {
      'Feliz': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Triste': 'bg-blue-100 text-blue-800 border-blue-200',
      'Ansioso': 'bg-red-100 text-red-800 border-red-200',
      'Calmado': 'bg-green-100 text-green-800 border-green-200',
      'Estresado': 'bg-orange-100 text-orange-800 border-orange-200',
      'Neutral': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[emotion] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getSatietyColor = (satiety) => {
    if (satiety >= 8) return 'text-green-600'
    if (satiety >= 5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleEdit = (meal) => {
    setEditingMeal({ ...meal })
  }

  const handleSaveEdit = () => {
    if (editingMeal && onUpdate) {
      onUpdate(editingMeal.id, editingMeal)
      setEditingMeal(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingMeal(null)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const uniqueEmotions = [...new Set(meals.map(meal => meal.emotion))].filter(Boolean)
  const filteredMeals = getFilteredAndSortedMeals()

  if (meals.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Utensils size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg mb-2">No hay comidas registradas aún</p>
        <p className="text-gray-500 text-sm">Comienza registrando tu primera comida</p>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Utensils size={24} />
          Registros de Comidas ({meals.length})
        </h3>
      </div>

      {/* Controles de filtrado y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar comida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtro por emoción */}
          <select
            value={filterEmotion}
            onChange={(e) => setFilterEmotion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas las emociones</option>
            {uniqueEmotions.map(emotion => (
              <option key={emotion} value={emotion}>{emotion}</option>
            ))}
          </select>

          {/* Filtro por saciedad */}
          <select
            value={filterSatiety}
            onChange={(e) => setFilterSatiety(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Toda saciedad</option>
            {[1,2,3,4,5,6,7,8,9,10].map(level => (
              <option key={level} value={level}>Saciedad {level}</option>
            ))}
          </select>

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Más reciente</option>
            <option value="oldest">Más antiguo</option>
            <option value="food">Por comida (A-Z)</option>
            <option value="satiety-high">Saciedad alta</option>
            <option value="satiety-low">Saciedad baja</option>
          </select>
        </div>

        {/* Resultados del filtro */}
        {(searchTerm || filterEmotion || filterSatiety) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter size={14} />
            <span>Mostrando {filteredMeals.length} de {meals.length} registros</span>
            {(searchTerm || filterEmotion || filterSatiety) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterEmotion('')
                  setFilterSatiety('')
                }}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lista de comidas */}
      {filteredMeals.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No se encontraron comidas con los filtros aplicados</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMeals.map(meal => (
            <div
              key={meal.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {editingMeal && editingMeal.id === meal.id ? (
                /* Modo edición */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Comida:
                    </label>
                    <input
                      type="text"
                      value={editingMeal.food}
                      onChange={(e) => setEditingMeal({...editingMeal, food: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Saciedad (1-10):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={editingMeal.satiety}
                        onChange={(e) => setEditingMeal({...editingMeal, satiety: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emoción:
                      </label>
                      <select
                        value={editingMeal.emotion}
                        onChange={(e) => setEditingMeal({...editingMeal, emotion: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Feliz">Feliz</option>
                        <option value="Triste">Triste</option>
                        <option value="Ansioso">Ansioso</option>
                        <option value="Calmado">Calmado</option>
                        <option value="Estresado">Estresado</option>
                        <option value="Neutral">Neutral</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* Modo visualización */
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {meal.food}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEmotionColor(meal.emotion)}`}>
                        {meal.emotion}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Heart size={14} className={getSatietyColor(meal.satiety)} />
                        <span>Saciedad: <span className={`font-medium ${getSatietyColor(meal.satiety)}`}>{meal.satiety}/10</span></span>
                      </div>
                      
                      {meal.date && (
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(meal.date)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {onUpdate && (
                      <button
                        onClick={() => handleEdit(meal)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
                        title="Editar registro"
                      >
                        <Edit3 size={16} />
                        Editar
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
                          onDelete(meal.id)
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas rápidas */}
      {meals.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-1">Saciedad Promedio</h4>
            <p className="text-2xl font-bold text-blue-600">
              {(meals.reduce((sum, meal) => sum + meal.satiety, 0) / meals.length).toFixed(1)}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-1">Emoción Más Común</h4>
            <p className="text-lg font-semibold text-green-600">
              {uniqueEmotions.reduce((a, b) => 
                meals.filter(m => m.emotion === a).length > meals.filter(m => m.emotion === b).length ? a : b
              )}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-1">Total Registros</h4>
            <p className="text-2xl font-bold text-purple-600">{meals.length}</p>
          </div>
        </div>
      )}
    </div>
  )
}