# Zoco – Frontend (React + Vite + Tailwind)

Frontend para la prueba técnica FullStack Zoco.
Incluye autenticación con JWT (guardado en sessionStorage), rutas protegidas con roles (Admin/User), manejo global de Axios con Authorization y pantalla 403.
Se integra con el backend Zoco (.NET + Azure SQL).

🧱 Tech stack
- React + Vite
- TypeScript (si aplica en tu repo)
- TailwindCSS
- Axios
- React Router
- Context API (AuthContext)

📁 Estructura (resumen)
src/
  api/
    index.ts               # axios instance: baseURL + interceptores
  components/
    Protected.tsx          # wrapper de rutas protegidas con support de roles
    Layout.tsx             # navbar, links por rol, logout
  context/
    AuthContext.tsx        # login/logout, usuario actual, persistencia en sessionStorage
  pages/
    Login.tsx
    Dashboard.tsx
    Studies.tsx
    Addresses.tsx
    AdminUsers.tsx
    SessionLogs.tsx        # solo Admin
    Forbidden.tsx          # 403
  App.tsx                  # definición de rutas
  main.tsx

## 🌐 Rutas

**Desarrollo:**
- Backend: http://localhost:5216/
- Frontend: http://localhost:5173/

**Producción:**
- Backend: https://zocoapp-dvg9crgygwhhbrep.brazilsouth-01.azurewebsites.net/
- Frontend: https://zoco-frontend-kohl.vercel.app/


🔐 Autenticación y estado
- El login llama POST /api/auth/login y guarda { token, user } en sessionStorage.
- El AuthContext expone: { me, loading, login(email,pwd), logout() }.
- Tras login exitoso, hace GET /api/me para obtener { email, role } desde el JWT.
- Logout limpia sessionStorage y opcionalmente llama /api/auth/logout.

🧭 Rutas y roles
- / (Dashboard) → protegida
- /studies → protegida
- /addresses → protegida
- /admin/users → protegida, solo Admin
- /admin/session-logs → protegida, solo Admin
- /login → pública
- /forbidden → pública (403)

Componente Protected:
- Requiere token y usuario cargado.
- Si no hay token → redirige a /login.
- Si hay role requerido y no coincide → redirige a /forbidden.

🌐 Axios (api/index.ts)
- baseURL: `${import.meta.env.VITE_API_URL}api`
- Interceptor de request: agrega `Authorization: Bearer <token>` si existe en sessionStorage.
- Interceptor de response:
  - 401 → limpia token y redirige a /login.
  - 403 → redirige a /forbidden.

🧪 Cómo correr en local
1) Instalar deps
   npm install
2) Configurar .env.development
   VITE_API_URL=http://localhost:5216/
3) Ejecutar Vite
   npm run dev
Abrir http://localhost:5173

▶️ Flujo de prueba (local o prod)
1) Login con usuarios seed del backend:
   - Admin: admin@zoco.com / Admin123!
   - User:  test@zoco.com  / Test123!
2) Ver Dashboard con email/rol en el header.
3) Navegar a /studies (User ve solo los suyos, Admin ve todos)
4) Intentar /admin/session-logs con User → debe ver 403 (Forbidden)
5) Con Admin sí debe listar los SessionLogs.
6) Probar logout (limpia sesión y redirige a /login).

🚀 Deploy en Vercel
1) Conectar repositorio GitHub.
2) Variables en Vercel → Project Settings → Environment Variables
   - VITE_API_URL = https://<tu-api>.azurewebsites.net/
3) Deploy.
4) Verificar llamadas desde el site:
   - Origin exacto debe estar permitido por CORS en el backend (FrontendOrigins).
   - Si usas Preview Deployments, agrega también esas URLs a FrontendOrigins.

🧯 Troubleshooting
- CORS: “No 'Access-Control-Allow-Origin'…”
  - Verificar que el origin (Vercel) esté en FrontendOrigins del backend.
  - Confirmar orden de middlewares en el backend: UseRouting → UseCors → UseAuth → MapControllers.
- 401 tras login:
  - Revisar que el interceptor envía `Authorization: Bearer <token>`.
  - Revisar expiración del token.
- 403 en rutas Admin con usuario común: es el comportamiento esperado.
- 404 a /api/...:
  - Confirmar VITE_API_URL con / final.
  - Confirmar que el backend esté en línea y el path sea correcto.

📜 Scripts útiles
- npm run dev      # desarrollo
- npm run build    # build de producción
- npm run preview  # previsualizar build local

✅ Checklist de la “Prueba Complementaria” (frontend)
- Guardar token en sessionStorage ✔
- Axios con Authorization y manejo 401/403 ✔
- Rutas protegidas y rol Admin ✔
- Página 403 Forbidden ✔
- Pantalla de SessionLogs para Admin ✔
- Capturas: dashboard Admin, dashboard User, 403 al intentar ruta Admin ✔

🚀 Deploy en producion:
   Producción (Vercel): 🔗https://zoco-frontend-kohl.vercel.app/

Licencia
Uso exclusivo para la prueba técnica de Zoco.
