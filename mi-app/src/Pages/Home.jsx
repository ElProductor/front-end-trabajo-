import React from 'react'

export default function Home() {
  return (
    <main className="container py-5">
      <section className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Gestor de Alimentación Consciente</h1>
        <p className="lead text-muted">
          Una aplicación profesional para ayudarte a llevar un control real y personalizado
          de tu alimentación, hidratación y bienestar emocional.
        </p>
      </section>

      <section className="row justify-content-center">
        <article className="col-md-8 col-lg-6">
          <h2 className="h4 mb-3">¿Qué puedes hacer?</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Registrar tus comidas diarias con estados emocionales.</li>
            <li className="list-group-item">Establecer metas saludables de agua y azúcar semanales.</li>
            <li className="list-group-item">Visualizar alertas nutricionales basadas en tus hábitos.</li>
            <li className="list-group-item">Analizar tu progreso mediante gráficos interactivos.</li>
          </ul>
        </article>
      </section>

      <section className="text-center mt-5">
        <p className="text-secondary small">
          © {new Date().getFullYear()} Gestor de Alimentación Consciente — Todos los derechos reservados.
        </p>
      </section>
    </main>
  )
}
