import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-center py-3 mt-5 border-top" aria-label="Pie de página">
      <div className="container">
        <small className="text-muted">
          &copy; {currentYear} <strong>Gestor de Alimentación Consciente</strong>. 
          Creado con <span role="img" aria-label="corazón">❤️</span> por el equipo.
        </small>
      </div>
    </footer>
  );
}
