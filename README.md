# 🚀 InventarioEC

Sistema de inventario para negocios en Ecuador, desarrollado con **Node.js**, **Express** y **MongoDB**.  
Permite gestionar productos, categorías, usuarios y movimientos de stock de manera simple, rápida y organizada.

---

## 📦 Características

- CRUD de **productos**
- CRUD de **categorías**
- Registro de **entradas / salidas** de inventario
- Registro y login de **usuarios**
- API REST modular y escalable
- Conexión a MongoDB con Mongoose
- Preparado para despliegue en **Render / Railway / Vercel**

---

## 🛠️ Tecnologías

- Node.js  
- Express  
- MongoDB + Mongoose  
- Dotenv  
- JWT para autenticación  
- Bcrypt.js para cifrado de contraseñas  
- CORS  
- Jest + Supertest para pruebas

---

## ▶️ Cómo iniciar el proyecto

### 1️⃣ Instalar dependencias
npm install

### 2️⃣ Configurar variables de entorno
Crea un archivo .env con tus datos:
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventarioec
JWT_SECRET=tu_secret_aqui

### 3️⃣ Iniciar servidor
npm run dev

### 🔑 Endpoints principales
## Usuarios

POST /api/users/register → Registrar usuario

POST /api/users/login → Login

## Categorías

POST /api/categories → Crear categoría (requiere token)

GET /api/categories → Listar categorías

## Productos

POST /api/products → Crear producto (requiere token)

GET /api/products → Listar productos

GET /api/products/filter → Filtrar productos por nombre, categoría o precio

PUT /api/products/:id → Actualizar producto

DELETE /api/products/:id → Eliminar producto

## Inventario

POST /api/inventory → Agregar movimiento de inventario (IN/OUT) (requiere token)
