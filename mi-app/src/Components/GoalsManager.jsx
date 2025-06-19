import React, { useState, useEffect } from 'react'
import { Target, TrendingUp, Award, Settings, Save, RotateCcw, CheckCircle, AlertTriangle, Droplets, Apple, Activity, Moon, Coffee, Utensils } from 'lucide-react'

export default function GoalsManager({ goals, setGoals, weeklyProgress = {} }) {
  const [editMode, setEditMode] = useState(false)
  const [tempGoals, setTempGoals] = useState(goals)
  const [showSuccess, setShowSuccess] = useState(false)

  // Definir las metas disponibles con sus configuraciones
  const goalDefinitions = [
    {
      key: 'agua',
      label: 'Vasos de agua diarios',
      icon: Droplets,
      color: 'blue',
      unit: 'vasos',
      min: 1,
      max: 20,
      recommended: 8,
      description: 'Mantén tu cuerpo hidratado'
    },
    {
      key: 'azucar',
      label: 'Límite de azúcar semanal',
      icon: Coffee,
      color: 'orange',
      unit: 'veces',
      min: 0,
      max: 21,
      recommended: 3,
      description: 'Controla tu consumo de azúcar'
    },
    {
      key: 'ejercicio',
      label: 'Días de ejercicio',
      icon: Activity,
      color: 'green',
      unit: 'días',
      min: 0,
      max: 7,
      recommended: 3,
      description: 'Mantente activo regularmente'
    },
    {
      key: 'frutas',
      label: 'Porciones de frutas diarias',
      icon: Apple,
      color: 'red',
      unit: 'porciones',
      min: 0,
      max: 10,
      recommended: 5,
      description: 'Consume vitaminas naturales'
    },
    {
      key: 'sueno',
      label: 'Horas de sueño diarias',
      icon: Moon,
      color: 'purple',
      unit: 'horas',
      min: 4,
      max: 12,
      recommended: 8,
      description: 'Descansa lo suficiente'
    },
    {
      key: 'comidas',
      label: 'Comidas balanceadas semanales',
      icon: Utensils,
      color: 'emerald',
      unit: 'comidas',
      min: 0,
      max: 21,
      recommended: 14,
      description: 'Mantén una dieta equilibrada'
    }
  ]

  // Inicializar metas por defecto si no existen
  useEffect(() => {
    const defaultGoals = {}
    goalDefinitions.forEach(goal => {
      if (!(goal.key in goals)) {
        defaultGoals[goal.key] = goal.recommended
      }
    })
    
    if (Object.keys(defaultGoals).length > 0) {
      setGoals({ ...goals, ...defaultGoals })
      setTempGoals({ ...goals, ...defaultGoals })
    }
  }, [])

  useEffect(() => {
    setTempGoals(goals)
  }, [goals])

  // Manejar cambios en modo edición
  const handleChange = (goalKey, value) => {
    const numValue = Math.max(0, Number(value))
    setTempGoals({ ...tempGoals, [goalKey]: numValue })
  }

  // Guardar cambios
  const saveGoals = () => {
    setGoals(tempGoals)
    setEditMode(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Cancelar cambios
  const cancelEdit = () => {
    setTempGoals(goals)
    setEditMode(false)
  }

  // Restablecer a valores recomendados
  const resetToRecommended = () => {
    const recommendedGoals = {}
    goalDefinitions.forEach(goal => {
      recommendedGoals[goal.key] = goal.recommended
    })
    setTempGoals(recommendedGoals)
  }

  // Calcular progreso de una meta
  const calculateProgress = (goalKey) => {
    const current = weeklyProgress[goalKey] || 0
    const target = goals[goalKey] || 0
    if (target === 0) return 0
    return Math.min(100, Math.round((current / target) * 100))
  }

  // Obtener color según el progreso
  const getProgressColor = (progress) => {
    if (progress >= 100) return 'text-green-600 bg-green-100'
    if (progress >= 75) return 'text-blue-600 bg-blue-100'
    if (progress >= 50) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  // Obtener colores por tipo de meta
  const getGoalColors = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="mb-6">
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle size={20} className="text-green-600" />
          <span className="text-green-800 font-medium">¡Metas actualizadas exitosamente!</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Target size={24} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Metas de Bienestar</h2>
                <p className="text-gray-600 text-sm">Define y rastrea tus objetivos de salud</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Settings size={16} />
                  Editar Metas
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={resetToRecommended}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    title="Restablecer a valores recomendados"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveGoals}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Save size={16} />
                    Guardar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goalDefinitions.map(goal => {
              const Icon = goal.icon
              const currentValue = editMode ? tempGoals[goal.key] : goals[goal.key]
              const progress = calculateProgress(goal.key)
              const progressColor = getProgressColor(progress)
              
              return (
                <div
                  key={goal.key}
                  className={`p-4 rounded-lg border-2 ${getGoalColors(goal.color)}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} />
                    <h3 className="font-semibold text-sm">{goal.label}</h3>
                  </div>
                  
                  <p className="text-xs opacity-75 mb-3">{goal.description}</p>
                  
                  {editMode ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={currentValue || 0}
                          onChange={(e) => handleChange(goal.key, e.target.value)}
                          min={goal.min}
                          max={goal.max}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <span className="text-sm text-gray-600">{goal.unit}</span>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Min: {goal.min}</span>
                        <span>Recomendado: {goal.recommended}</span>
                        <span>Max: {goal.max}</span>
                      </div>
                      
                      <input
                        type="range"
                        value={currentValue || 0}
                        onChange={(e) => handleChange(goal.key, e.target.value)}
                        min={goal.min}
                        max={goal.max}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          {currentValue || 0}
                        </span>
                        <span className="text-sm text-gray-600">{goal.unit}</span>
                      </div>
                      
                      {/* Progreso */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Progreso semanal</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${progressColor}`}>
                            {progress}%
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              progress >= 100 ? 'bg-green-500' :
                              progress >= 75 ? 'bg-blue-500' :
                              progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, progress)}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {weeklyProgress[goal.key] || 0} / {currentValue || 0} {goal.unit}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Resumen de progreso */}
          {!editMode && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={20} className="text-blue-600" />
                <h3 className="font-semibold text-gray-800">Resumen Semanal</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {goalDefinitions.filter(g => calculateProgress(g.key) >= 100).length}
                  </div>
                  <div className="text-sm text-gray-600">Metas completadas</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {goalDefinitions.filter(g => calculateProgress(g.key) >= 75 && calculateProgress(g.key) < 100).length}
                  </div>
                  <div className="text-sm text-gray-600">Casi completadas</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {goalDefinitions.filter(g => calculateProgress(g.key) >= 25 && calculateProgress(g.key) < 75).length}
                  </div>
                  <div className="text-sm text-gray-600">En progreso</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {goalDefinitions.filter(g => calculateProgress(g.key) < 25).length}
                  </div>
                  <div className="text-sm text-gray-600">Necesitan atención</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="px-6 pb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Award size={16} />
              Tips para alcanzar tus metas
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Establece metas realistas y alcanzables</li>
              <li>• Revisa tu progreso semanalmente</li>
              <li>• Celebra los pequeños logros en el camino</li>
              <li>• Ajusta las metas según tus necesidades</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}