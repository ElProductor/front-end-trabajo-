import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatsGraph() {
  const [meals, setMeals] = useState([]);

  const emotions = ['Feliz', 'Ansioso', 'Estresado', 'Neutral', 'Triste'];

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=20');
        const simulatedMeals = response.data.map((post, index) => ({
          id: post.id,
          food: post.title,
          emotion: emotions[index % emotions.length], // Asigna emoción rotativa
        }));
        setMeals(simulatedMeals);
      } catch (error) {
        console.error('Error al cargar comidas:', error);
      }
    }

    fetchMeals();
  }, []);

  // Conteo de emociones
  const counts = emotions.map(
    (emotion) => meals.filter((m) => m.emotion === emotion).length
  );

  const colors = {
    Feliz: 'rgba(75, 192, 192, 0.6)',
    Ansioso: 'rgba(255, 206, 86, 0.6)',
    Estresado: 'rgba(255, 99, 132, 0.6)',
    Neutral: 'rgba(201, 203, 207, 0.6)',
    Triste: 'rgba(153, 102, 255, 0.6)',
  };

  const data = {
    labels: emotions,
    datasets: [
      {
        label: 'Cantidad de comidas por estado emocional',
        data: counts,
        backgroundColor: emotions.map((e) => colors[e]),
        borderColor: emotions.map((e) => colors[e].replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Comidas registradas según estado emocional',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        title: { display: true, text: 'Cantidad' },
      },
      x: {
        title: { display: true, text: 'Estado emocional' },
      },
    },
  };

  return (
    <div className="mb-5">
      {meals.length === 0 ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
}
