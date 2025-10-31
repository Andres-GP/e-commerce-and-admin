# 🛒 E-Commerce & Admin

**E-Commerce & Admin** is a modern e-commerce platform built as a **Turborepo monorepo** with microfrontends and microservices, integrating **two microfrontends** (`ecommerce` and `admin`) and **four independent microservices** for a scalable, modular, and high-performance system.

Built with **Next.js**, **TypeScript**, **TailwindCSS**, **Radix UI**, and **Express + MongoDB** on the backend, it combines a smooth user experience with professional, enterprise-level architecture.

---

## 🚀 Live Demos

- 🛍️ **E-Commerce App** → [View on Vercel](https://ecommerce-app.vercel.app)
- 🧑‍💼 **Admin App** → [View on Vercel](https://e-commerce-admin-two-chi.vercel.app/)

---

## ⚙️ Microfrontends

### 🛍️ **E-Commerce App**

- 🏪 Full catalog with **products**, **categories**, and **dynamic filters**.
- 💳 **Integrated payment site**.
- 🛒 Persistent **shopping cart** connected to the `cart-service`.
- 🚚 **Shipping destination form**.
- 📞 Fully functional **contact page**.
- ⭐ **Review system** connected to `reviews-service`.
- 🔗 Full integration with microservices (`cart`, `orders`, `products`, `reviews`).
- 🌓 Light/Dark mode with `next-themes`.
- 📱 **Fully responsive** (mobile-first).
- ⚙️ Form validation using **Zod + React Hook Form**.
- 🧪 **Unit and integration tests** with Jest and Testing Library.

### 🧑‍💼 **Admin App**

- 📦 Manage **products**.
- 🧾 Monitor **orders**, **users**, **carts**, and **reviews**.
- 📊 Interactive dashboard with **Recharts** and dynamic components.
- 🔐 Direct connection to microservices (`products`, `orders`, `reviews`, `cart`).
- ⚙️ Forms with **React Hook Form + Zod**.
- 🧱 Modular UI using **Radix UI + TailwindCSS**.
- 💬 Elegant notifications with **Sonner**.
- 🧪 Full **unit and integration test coverage**.
- 🌙 Dark mode support.
- 🧭 **SEO optimized** with Next.js.

## ⚙️ Microservices

Each microservice runs independently.

### 🧩 **cart-service**

- Manages user shopping carts.
- APIs:
  - `POST /cart` → create cart.
  - `PATCH /cart/:id` → add or remove products.
  - `GET /cart/:userId` → get current cart.
- Database: `mongodb://cart-db`

### 🧩 **reviews-service**

- Handles product reviews and ratings.
- APIs:
  - `POST /reviews` → create review.
  - `GET /reviews/:productId` → get reviews by product.
- Database: `mongodb://reviews-db`

### 🧩 **orders-service**

- Processes orders and payments.
- APIs:
  - `POST /orders` → create order.
  - `GET /orders/:userId` → list user orders.
- Database: `mongodb://orders-db`

### 🧩 **products-service**

- Manages product catalog and categories.
- APIs:
  - `GET /products` → list products.
  - `GET /products/:id` → get product details.
  - `POST /products` → create product.
- Database: `mongodb://products-db`

---

Each microservice runs **independently**, has its own **MongoDB database**, and communicates with the frontends via **REST or GraphQL APIs**.

---

## 🧠 Technology Stack

| Category                | Technologies                                           |
| ----------------------- | ------------------------------------------------------ |
| **Frontend Frameworks** | Next.js (13–16), React 18                              |
| **Language**            | TypeScript                                             |
| **UI / Styling**        | TailwindCSS, Radix UI, clsx, class-variance-authority  |
| **Forms & Validation**  | React Hook Form, Zod                                   |
| **Themes**              | next-themes                                            |
| **Visual Components**   | MUI, radix, self-created                               |
| **Backend**             | Express.js, Node.js                                    |
| **Database**            | MongoDB                                                |
| **Testing**             | Jest, Testing Library, ts-jest, jest-environment-jsdom |
| **Dev Tools**           | TypeScript, ESLint, PostCSS                            |
| **Deployment**          | Vercel (Frontends), Render / (Microservices)           |
| **Monorepo Tooling**    | Turborepo                                              |

---
