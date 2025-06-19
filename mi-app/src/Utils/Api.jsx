// src/api.jsx
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Obtenemos un listado de "meals" simulados desde la API
// Cada "post" será tratado como una comida con una emoción aleatoria
export async function getMeals() {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?_limit=20`);
    
    // Simular emociones
    const emociones = ['Feliz', 'Ansioso', 'Estresado', 'Neutral', 'Triste'];
    const comidas = response.data.map((post, index) => ({
      id: post.id,
      food: post.title,
      emotion: emociones[index % emociones.length],
    }));

    return comidas;
  } catch (error) {
    console.error('Error al obtener comidas:', error);
    return [];
  }
}

// Obtener metas simuladas para agua y azúcar
export async function getGoals() {
  try {
    // Usamos un "fake goal" desde la API, luego lo adaptamos
    const response = await axios.get(`${API_BASE_URL}/users/1`);

    // Simulación de metas (puedes cambiar los valores)
    return {
      agua: 10,
      azucar: 4,
    };
  } catch (error) {
    console.error('Error al obtener metas:', error);
    return { agua: 0, azucar: 0 };
  }
}
