import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function StatsGraph({ meals }) {
  // Contar comidas por emoción
  const emotions = ['Feliz', 'Ansioso', 'Estresado', 'Neutral', 'Triste']
  const counts = emotions.map(
    emo => meals.filter(m => m.emotion === emo).length,
  )

  const data = {
    labels: emotions,
    datasets: [
      {
        label: 'Cantidad de comidas por estado emocional',
        data: counts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  }

  return (
    <div className="mb-4">
      <h3>Estadísticas de emociones</h3>
      <Bar data={data} />
    </div>
  )
}
