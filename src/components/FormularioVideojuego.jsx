// src/components/FormularioVideojuego.jsx
// Formulario controlado con validaciones dinámicas en tiempo real
// Inserta un nuevo videojuego en Supabase

import { useState } from 'react';
import { supabase } from '../config/supabaseClient';

function FormularioVideojuego({ onVideojuegoAgregado }) {
  // Estado del formulario (componente controlado: cada input está ligado a este estado)
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    anio_lanzamiento: '',
    imagen_url: '',
  });

  // Estado de errores de validación (uno por campo)
  const [errores, setErrores] = useState({});

  // Estados de envío
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const anioActual = new Date().getFullYear();

  // ============================
  // Validación de un campo individual
  // ============================
  const validarCampo = (nombre, valor) => {
    switch (nombre) {
      case 'titulo':
        if (!valor.trim()) return 'El título es obligatorio';
        if (valor.trim().length < 2) return 'El título debe tener al menos 2 caracteres';
        return '';

      case 'genero':
        if (!valor.trim()) return 'El género es obligatorio';
        return '';

      case 'plataforma':
        if (!valor.trim()) return 'La plataforma es obligatoria';
        return '';

      case 'anio_lanzamiento':
        if (!valor) return 'El año de lanzamiento es obligatorio';
        if (isNaN(valor)) return 'Debe ser un número válido';
        if (valor < 1970 || valor > anioActual + 1) {
          return `El año debe estar entre 1970 y ${anioActual + 1}`;
        }
        return '';

      case 'imagen_url':
        if (valor && !valor.match(/^https?:\/\/.+/)) {
          return 'Debe ser una URL válida (empezar con http:// o https://)';
        }
        return '';

      default:
        return '';
    }
  };

  // ============================
  // Manejo de cambios en cualquier input (validación en tiempo real)
  // ============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualiza el valor del campo en el estado
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Valida ese campo en el momento (tiempo real, mientras el usuario escribe)
    const errorCampo = validarCampo(name, value);
    setErrores((prev) => ({ ...prev, [name]: errorCampo }));
  };

  // ============================
  // Manejo de "salir del campo" (valida aunque no se haya escrito nada)
  // ============================
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorCampo = validarCampo(name, value);
    setErrores((prev) => ({ ...prev, [name]: errorCampo }));
  };
  // ============================
  // Validar todo el formulario antes de enviar
  // ============================
  const formularioEsValido = () => {
    const nuevosErrores = {};
    let esValido = true;

    Object.keys(formData).forEach((campo) => {
      const error = validarCampo(campo, formData[campo]);
      if (error) {
        nuevosErrores[campo] = error;
        esValido = false;
      }
    });

    setErrores(nuevosErrores);
    return esValido;
  };

  // ============================
  // Envío del formulario
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setMensajeError('');

    if (!formularioEsValido()) {
      return; // No enviamos si hay errores
    }

    try {
      setEnviando(true);

      const { error } = await supabase.from('videojuegos').insert([
        {
          titulo: formData.titulo.trim(),
          genero: formData.genero.trim(),
          plataforma: formData.plataforma.trim(),
          anio_lanzamiento: parseInt(formData.anio_lanzamiento),
          imagen_url: formData.imagen_url.trim() || null,
        },
      ]);

      if (error) throw error;

      setMensajeExito('¡Videojuego agregado correctamente!');

      // Limpiamos el formulario
      setFormData({
        titulo: '',
        genero: '',
        plataforma: '',
        anio_lanzamiento: '',
        imagen_url: '',
      });
      setErrores({});

      // Avisamos al componente padre para que recargue la lista
      if (onVideojuegoAgregado) {
        onVideojuegoAgregado();
      }

    } catch (err) {
      console.error('Error al agregar videojuego:', err.message);
      setMensajeError('No se pudo agregar el videojuego. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="formulario-videojuego">
      <h2>Agregar nuevo videojuego</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="campo-formulario">
          <label htmlFor="titulo">Título *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
             onBlur={handleBlur}
          />
          {errores.titulo && <span className="error-validacion">{errores.titulo}</span>}
        </div>

        <div className="campo-formulario">
          <label htmlFor="genero">Género *</label>
          <input
            type="text"
            id="genero"
            name="genero"
            placeholder="Ej: Aventura, Accion, RPG..."
            value={formData.genero}
            onChange={handleChange}
             onBlur={handleBlur}
          />
          {errores.genero && <span className="error-validacion">{errores.genero}</span>}
        </div>

        <div className="campo-formulario">
          <label htmlFor="plataforma">Plataforma *</label>
          <input
            type="text"
            id="plataforma"
            name="plataforma"
            placeholder="Ej: PC, PlayStation, Switch..."
            value={formData.plataforma}
            onChange={handleChange}
             onBlur={handleBlur}
          />
          {errores.plataforma && <span className="error-validacion">{errores.plataforma}</span>}
        </div>

        <div className="campo-formulario">
          <label htmlFor="anio_lanzamiento">Año de lanzamiento *</label>
          <input
            type="number"
            id="anio_lanzamiento"
            name="anio_lanzamiento"
            value={formData.anio_lanzamiento}
            onChange={handleChange}
             onBlur={handleBlur}
          />
          {errores.anio_lanzamiento && (
            <span className="error-validacion">{errores.anio_lanzamiento}</span>
          )}
        </div>

        <div className="campo-formulario">
          <label htmlFor="imagen_url">URL de la imagen (opcional)</label>
          <input
            type="text"
            id="imagen_url"
            name="imagen_url"
            placeholder="https://..."
            value={formData.imagen_url}
            onChange={handleChange}
             onBlur={handleBlur}
          />
          {errores.imagen_url && <span className="error-validacion">{errores.imagen_url}</span>}
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Agregar videojuego'}
        </button>

        {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
        {mensajeError && <p className="mensaje-error">{mensajeError}</p>}
      </form>
    </section>
  );
}

export default FormularioVideojuego;