import React from 'react'

export default function Header() {
  return (
    <header className="bg-primary text-white py-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h4 m-0">Gestor de Alimentación Consciente</h1>
        <nav>
          <a href="#tracker" className="text-white me-3 text-decoration-none">
            Registro
          </a>
          <a href="#goals" className="text-white me-3 text-decoration-none">
            Metas
          </a>
          <a href="#stats" className="text-white text-decoration-none">
            Estadísticas
          </a>
        </nav>
      </div>
    </header>
  )
}
