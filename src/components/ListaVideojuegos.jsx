// src/components/ListaVideojuegos.jsx
// Componente que MUESTRA los videojuegos (recibe los datos por props)

function ListaVideojuegos({ videojuegos, cargando, error, onReintentar }) {

  if (cargando) {
    return (
      <section className="lista-videojuegos">
        <p>Cargando videojuegos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="lista-videojuegos">
        <p className="mensaje-error">{error}</p>
        <button onClick={onReintentar}>Reintentar</button>
      </section>
    );
  }

  if (videojuegos.length === 0) {
    return (
      <section className="lista-videojuegos">
        <p>Aún no hay videojuegos registrados. ¡Agrega el primero!</p>
      </section>
    );
  }

  return (
    <section className="lista-videojuegos">
      <h2>Catálogo de Videojuegos</h2>
      <div className="grid-videojuegos">
        {videojuegos.map((juego) => (
          <div className="tarjeta-juego" key={juego.id}>
            {juego.imagen_url && (
              <img src={juego.imagen_url} alt={juego.titulo} />
            )}
            <h3>{juego.titulo}</h3>
            <p><strong>Género:</strong> {juego.genero}</p>
            <p><strong>Plataforma:</strong> {juego.plataforma}</p>
            <p><strong>Año:</strong> {juego.anio_lanzamiento}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ListaVideojuegos;