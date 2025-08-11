# Zoco – Frontend

Aplicación React + Vite + TypeScript + TailwindCSS para la gestión de usuarios, direcciones y estudios, con autenticación mediante JWT y roles (Admin / User).  

Este frontend consume la API del backend de Zoco.

------------------------------------------------------------
🚀 Requisitos previos
------------------------------------------------------------
- Node.js 18+
- npm o yarn
- Backend de Zoco corriendo localmente o en un servidor accesible.

------------------------------------------------------------
⚙️ Configuración del entorno
------------------------------------------------------------
1. Clonar este repositorio:
   git clone https://github.com/TU_USUARIO/zoco-frontend.git
   cd zoco-frontend

2. Instalar dependencias:
   npm install

3. Crear un archivo .env en la raíz del proyecto con:
   VITE_API_URL=http://localhost:5216/api

   (Cambia la URL según dónde esté corriendo tu backend)

------------------------------------------------------------
🖥️ Scripts disponibles
------------------------------------------------------------
- Desarrollo  
  npm run dev
  Inicia el servidor de desarrollo en http://localhost:5173

- Compilar para producción  
  npm run build

- Previsualizar build de producción  
  npm run preview

------------------------------------------------------------
📂 Estructura del proyecto
------------------------------------------------------------
```
src/
 ├── api.ts         # Configuración Axios para consumir la API
 ├── components/    # Componentes UI reutilizables
 ├── context/       # Contexto de autenticación
 ├── pages/         # Vistas (Login, Addresses, Studies, Admin Users, etc.)
 ├── styles/        # Estilos globales y Tailwind
 └── main.tsx       # Punto de entrada
```


------------------------------------------------------------
🔑 Funcionalidades
------------------------------------------------------------
- Autenticación con JWT.
- Roles: User y Admin.
- Gestión de:
  - Direcciones (CRUD + edición en línea)
  - Estudios
  - Usuarios (solo Admin)
- Navbar responsive con diseño glassmorphism.
- Tablas y formularios adaptados para móvil.
- Integración con API REST del backend.

------------------------------------------------------------
🌐 Deploy
------------------------------------------------------------

- **Producción (Vercel)**: 🔗[https://zoco-frontend-kohl.vercel.app/](https://zoco-frontend-kohl.vercel.app/)

### Construcción:

```bash
npm run build
```

Subir la carpeta `/dist` al hosting elegido (Vercel, Netlify, etc.).

------------------------------------------------------------
🚀 Deploy - Local
------------------------------------------------------------

### Cómo correrlo en local
1. Clonar el repositorio:
   ```bash
   git clone <https://github.com/men7ar31/Zoco-frontend.git>
   cd <Zoco-frontend>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear archivo `.env` en la raíz con el contenido:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Levantar el entorno de desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir en el navegador la URL que indique la consola (ej: http://localhost:5173)