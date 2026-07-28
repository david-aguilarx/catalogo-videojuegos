// src/components/LandingPage.jsx
// Página de presentación del proyecto (landing page)

function LandingPage() {
  return (
    <header className="landing-page">
      <div className="landing-contenido">
        <h1>🎮 Catálogo de Videojuegos</h1>
        <p className="landing-subtitulo">
          Explora, descubre y agrega tus videojuegos favoritos a nuestra colección
        </p>
        <p className="landing-descripcion">
          Esta aplicación te permite consultar un catálogo de videojuegos guardado en una base de datos
          en la nube (Supabase), y contribuir agregando nuevos títulos con toda su información:
          género, plataforma y año de lanzamiento. Todo se actualiza en tiempo real.
        </p>
      </div>
      <img
        src="https://placehold.co/1200x400/1a1a2e/e94560?text=Catalogo+de+Videojuegos"
        alt="Banner de catálogo de videojuegos"
        className="landing-imagen"
      />
    </header>
  );
}

export default LandingPage;