import React, { useState, useRef, useEffect } from 'react'
import { Plus, Clock, Heart, Smile, Utensils, AlertCircle, Check, X, Camera } from 'lucide-react'

export default function MealForm({ onAdd }) {
  const [food, setFood] = useState('')
  const [satiety, setSatiety] = useState(5)
  const [emotion, setEmotion] = useState('Neutral')
  const [notes, setNotes] = useState('')
  const [mealTime, setMealTime] = useState('lunch')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [foodSuggestions, setFoodSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  const foodInputRef = useRef(null)

  // Sugerencias de comidas comunes
  const commonFoods = [
    'Ensalada de pollo', 'Pasta con verduras', 'Salmón a la plancha',
    'Quinoa con vegetales', 'Sopa de lentejas', 'Yogur con frutas',
    'Avena con plátano', 'Tostadas de aguacate', 'Batido de proteínas',
    'Pollo al horno', 'Arroz integral', 'Verduras al vapor',
    'Sandwich de pavo', 'Frutas mixtas', 'Frutos secos'
  ]

  const emotions = [
    { value: 'Feliz', icon: '😊', color: 'text-yellow-600' },
    { value: 'Neutral', icon: '😐', color: 'text-gray-600' },
    { value: 'Ansioso', icon: '😰', color: 'text-red-600' },
    { value: 'Estresado', icon: '😤', color: 'text-orange-600' },
    { value: 'Triste', icon: '😢', color: 'text-blue-600' },
    { value: 'Calmado', icon: '😌', color: 'text-green-600' }
  ]

  const mealTimes = [
    { value: 'breakfast', label: 'Desayuno', icon: '🌅' },
    { value: 'lunch', label: 'Almuerzo', icon: '☀️' },
    { value: 'dinner', label: 'Cena', icon: '🌙' },
    { value: 'snack', label: 'Snack', icon: '🍎' }
  ]

  // Generar ID único sin dependencias externas
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {}
    
    if (!food.trim()) {
      newErrors.food = 'Por favor ingresa qué comiste'
    } else if (food.trim().length < 2) {
      newErrors.food = 'El nombre debe tener al menos 2 caracteres'
    }
    
    if (satiety < 0 || satiety > 10) {
      newErrors.satiety = 'La saciedad debe estar entre 0 y 10'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Filtrar sugerencias basadas en el input
  const handleFoodChange = (value) => {
    setFood(value)
    if (value.length > 1) {
      const filtered = commonFoods.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      )
      setFoodSuggestions(filtered.slice(0, 5))
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  // Seleccionar sugerencia
  const selectSuggestion = (suggestion) => {
    setFood(suggestion)
    setShowSuggestions(false)
    foodInputRef.current?.focus()
  }

  // Obtener color del nivel de saciedad
  const getSatietyColor = (level) => {
    if (level >= 8) return 'bg-green-500'
    if (level >= 6) return 'bg-yellow-500'
    if (level >= 4) return 'bg-orange-500'
    return 'bg-red-500'
  }

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
      const mealData = {
        id: generateId(),
        food: food.trim(),
        satiety: Number(satiety),
        emotion,
        notes: notes.trim(),
        mealTime,
        date: new Date().toISOString(),
      }
      
      onAdd(mealData)
      
      // Reset form
      setFood('')
      setSatiety(5)
      setEmotion('Neutral')
      setNotes('')
      setMealTime('lunch')
      setErrors({})
      setIsSubmitting(false)
      setShowSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)
      
      // Focus back to food input
      foodInputRef.current?.focus()
    }, 500)
  }

  // Mensaje de éxito
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  return (
    <div className="mb-6">
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <Check size={20} className="text-green-600" />
          <span className="text-green-800 font-medium">¡Comida registrada exitosamente!</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Utensils size={24} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Registrar Nueva Comida</h2>
            <p className="text-gray-600 text-sm">Lleva un registro de tus comidas y emociones</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Tipo de comida */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tipo de comida
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {mealTimes.map(time => (
                <button
                  key={time.value}
                  type="button"
                  onClick={() => setMealTime(time.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    mealTime === time.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-lg mb-1">{time.icon}</div>
                  <div className="text-sm font-medium">{time.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ¿Qué comiste? */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ¿Qué comiste? *
            </label>
            <div className="relative">
              <input
                ref={foodInputRef}
                type="text"
                value={food}
                onChange={(e) => handleFoodChange(e.target.value)}
                onFocus={() => food.length > 1 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.food ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ej: Ensalada de pollo, Pasta con verduras..."
              />
              
              {/* Sugerencias */}
              {showSuggestions && foodSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {foodSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {errors.food && (
              <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle size={14} />
                {errors.food}
              </div>
            )}
          </div>

          {/* Nivel de saciedad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nivel de saciedad: {satiety}/10
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="10"
                value={satiety}
                onChange={(e) => setSatiety(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${getSatietyColor(satiety)} 0%, ${getSatietyColor(satiety)} ${satiety * 10}%, #e5e7eb ${satiety * 10}%, #e5e7eb 100%)`
                }}
              />
              
              <div className="flex justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Heart size={12} className="text-red-500" />
                  Muy hambriento
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={12} className="text-green-500" />
                  Muy satisfecho
                </span>
              </div>
              
              {/* Indicador visual */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${getSatietyColor(satiety)}`}></div>
                <span className="text-sm text-gray-600">
                  {satiety <= 2 && "Muy hambriento"}
                  {satiety > 2 && satiety <= 4 && "Hambriento"}
                  {satiety > 4 && satiety <= 6 && "Neutral"}
                  {satiety > 6 && satiety <= 8 && "Satisfecho"}
                  {satiety > 8 && "Muy satisfecho"}
                </span>
              </div>
            </div>
          </div>

          {/* Estado emocional */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Estado emocional
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {emotions.map(emotionOption => (
                <button
                  key={emotionOption.value}
                  type="button"
                  onClick={() => setEmotion(emotionOption.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    emotion === emotionOption.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{emotionOption.icon}</div>
                  <div className={`text-sm font-medium ${emotionOption.color}`}>
                    {emotionOption.value}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notas adicionales */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notas adicionales (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              placeholder="¿Cómo te sentiste durante la comida? ¿Alguna observación especial?"
            />
            <div className="mt-1 text-xs text-gray-500">
              {notes.length}/200 caracteres
            </div>
          </div>

          {/* Botón de envío */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Registrando...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Registrar Comida
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setFood('')
                setSatiety(5)
                setEmotion('Neutral')
                setNotes('')
                setMealTime('lunch')
                setErrors({})
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
              <X size={20} />
              Limpiar
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Clock size={16} />
            Tips para un mejor registro
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Registra tus comidas lo antes posible para mayor precisión</li>
            <li>• El nivel de saciedad te ayudará a identificar patrones alimenticios</li>
            <li>• Las emociones pueden influir en tus hábitos alimentarios</li>
            <li>• Usa las notas para detalles importantes sobre la comida</li>
          </ul>
        </div>
      </div>
    </div>
  )
}