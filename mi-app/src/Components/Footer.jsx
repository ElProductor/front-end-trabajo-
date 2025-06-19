import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-5 border-top">
      <div className="container">
        <small>
          &copy; {new Date().getFullYear()} Gestor de Alimentación Consciente. 
          Creado con ❤️ por el equipo.
        </small>
      </div>
    </footer>
  )
}
