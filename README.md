# Catálogo de Videojuegos

Aplicación web construida con **React (Vite)** y **Supabase** que permite consultar un catálogo de videojuegos y agregar nuevos títulos mediante un formulario con validaciones en tiempo real.

## Funcionalidades

- Landing page de presentación del proyecto
- Consulta de videojuegos almacenados en Supabase (PostgreSQL en la nube)
- Renderizado condicional: estados de carga, éxito, error y "sin datos"
- Formulario controlado para agregar nuevos videojuegos
- Validaciones dinámicas en tiempo real (mientras se escribe y al salir del campo)
- Actualización automática del catálogo tras agregar un nuevo videojuego

## Tecnologías utilizadas

- React 19 + Vite
- Supabase (`@supabase/supabase-js`)
- CSS

## Requisitos previos

- Node.js instalado
- Una cuenta gratuita en [Supabase](https://supabase.com)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/catalogo-videojuegos.git
   cd catalogo-videojuegos
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un proyecto en [Supabase](https://supabase.com) y, dentro del **SQL Editor**, ejecuta:

   ```sql
   CREATE TABLE videojuegos (
       id SERIAL PRIMARY KEY,
       titulo VARCHAR(150) NOT NULL,
       genero VARCHAR(100) NOT NULL,
       plataforma VARCHAR(100) NOT NULL,
       anio_lanzamiento INTEGER NOT NULL,
       imagen_url TEXT,
       created_at TIMESTAMP DEFAULT now()
   );
   ```

4. Crea tu archivo `.env` en la raíz del proyecto, basado en `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://tuproyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_publishable_key
   ```
   Estos valores se obtienen en tu proyecto de Supabase, dentro de **Project Settings → API**.

5. Inicia el proyecto:
   ```bash
   npm run dev
   ```

6. Abre `http://localhost:5173` en el navegador.

## Estructura del proyecto

```
catalogo-videojuegos/
├── src/
│   ├── config/
│   │   └── supabaseClient.js
│   ├── components/
│   │   ├── LandingPage.jsx
│   │   ├── ListaVideojuegos.jsx
│   │   └── FormularioVideojuego.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
└── package.json
```

## Validaciones del formulario

| Campo | Validación |
|---|---|
| Título | Obligatorio, mínimo 2 caracteres |
| Género | Obligatorio |
| Plataforma | Obligatorio |
| Año de lanzamiento | Obligatorio, numérico, entre 1970 y el año actual + 1 |
| URL de imagen | Opcional, debe iniciar con `http://` o `https://` si se proporciona |

## Autor

David Moises Contreras Aguilar
