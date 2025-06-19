import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AlertBanner() {
  const [meals, setMeals] = useState([]);
  const [goals, setGoals] = useState({ agua: 10, azucar: 4 });

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener comidas simuladas
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=20');

        // Simular comidas con nombre + ingredientes como "azúcar" y "agua"
        const simulatedMeals = response.data.map((post, index) => {
          const foodName = post.title.toLowerCase();
          const includeSugar = index % 3 === 0;
          const includeWater = index % 4 === 0;

          return {
            id: post.id,
            food:
              foodName +
              (includeSugar ? ' con azúcar' : '') +
              (includeWater ? ' y agua' : ''),
          };
        });

        setMeals(simulatedMeals);

        // Simular metas (puedes hacer otra llamada a una API si quieres)
        setGoals({ agua: 6, azucar: 3 });
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    }

    fetchData();
  }, []);

  // Lógica de conteo de palabras clave
  const countByKeyword = (keyword) =>
    meals.filter((m) =>
      m.food.toLowerCase().includes(keyword.toLowerCase())
    ).length;

  const sugarCount = countByKeyword('azúcar');
  const waterCount = countByKeyword('agua');

  const alerts = [];

  if (waterCount < goals.agua) {
    alerts.push(
      `No has cumplido tu meta de ingesta de agua semanal (${waterCount}/${goals.agua})`
    );
  }

  if (sugarCount > goals.azucar) {
    alerts.push(
      `Has consumido más azúcar de la meta semanal (${sugarCount}/${goals.azucar})`
    );
  }

  if (alerts.length === 0) return null;

  return (
    <div className="alert alert-warning" role="alert" aria-label="Alertas nutricionales">
      {alerts.map((message, index) => (
        <p key={index} className="mb-1">
          <span role="img" aria-label="advertencia">⚠️</span> {message}
        </p>
      ))}
    </div>
  );
}
