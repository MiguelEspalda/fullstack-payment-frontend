# 💳 Fullstack Payment App - Frontend

Este es el frontend de una aplicación de pagos simulada, desarrollada como prueba técnica.  
Construida con ReactJS + Vite + TypeScript, utilizando TailwindCSS para estilos y Redux Toolkit para gestión de estado.

---

## 🧪 Tecnologías utilizadas

- ⚛️ React 18 + Vite
- 🎨 TailwindCSS
- 🧠 Redux Toolkit + redux-persist
- 🔄 React Router DOM
- 🔔 React Toastify
- 🗂️ Arquitectura por features

---

## 📱 Responsive Design

La aplicación fue desarrollada con enfoque **mobile-first**, compatible desde resoluciones como iPhone SE (750px) en adelante, usando flexbox y clases responsive con Tailwind.

---

## 🧩 Funcionalidad

- Ver productos disponibles
- Seleccionar un producto
- Ingresar datos del cliente y de pago
- Ver resumen antes de pagar
- Simulación de transacción exitosa
- Visualización del estado final
- Persistencia del estado con `redux-persist`

---

## 🛠 Instalación y ejecución local

```bash
# Clonar repositorio
git clone https://github.com/MiguelEspalda/fullstack-payment-frontend.git
cd fullstack-payment-frontend.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

```

---
## 🌍 Variables de entorno
No se requiere configuración especial si el backend corre en http://localhost:3000/api.

---

---
## 🚀 Deploy
Este frontend fue desplegado en Vercel.
El link estará disponible en la entrega final.

---

---
## 📂 Estructura

```bash
Copiar
Editar
src/
├── app/           # Redux store
├── components/    # UI reutilizable
├── features/      # Slices de Redux
├── pages/         # Vistas principales
├── routes/        # Enrutamiento SPA
├── services/      # Cliente Axios
└── utils/         # Funciones auxiliares
```

---

## 🙌 Autor

Hecho por Miguel Martinez Cobos como parte de la prueba técnica.