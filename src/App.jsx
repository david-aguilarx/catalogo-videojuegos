import { useState, useEffect } from 'react';
import { supabase } from './config/supabaseClient';
import ListaVideojuegos from './components/ListaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import './App.css';
import LandingPage from './components/LandingPage';

function App() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerVideojuegos();
  }, []);

  const obtenerVideojuegos = async () => {
    try {
      setCargando(true);
      setError(null);

      const { data, error } = await supabase
        .from('videojuegos')
        .select('*')
        .order('anio_lanzamiento', { ascending: false });

      if (error) throw error;

      setVideojuegos(data);

    } catch (err) {
      console.error('Error al obtener videojuegos:', err.message);
      setError('No se pudieron cargar los videojuegos. Intenta de nuevo más tarde.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="App">
       <LandingPage />
      <FormularioVideojuego onVideojuegoAgregado={obtenerVideojuegos} />
      <ListaVideojuegos
        videojuegos={videojuegos}
        cargando={cargando}
        error={error}
        onReintentar={obtenerVideojuegos}
      />
    </div>
  );
}

export default App;