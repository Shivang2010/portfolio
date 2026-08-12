# Full-Stack Personal Portfolio Website

A complete internship-ready portfolio project using:

- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- REST API
- Responsive CSS

## 1. Requirements

Install:

- Node.js (LTS)
- npm
- MongoDB Atlas account (recommended) or local MongoDB
- Git

## 2. Project structure

```text
fullstack-portfolio/
├── client/   # React frontend
└── server/   # Express + MongoDB backend
```

## 3. Start the backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Then:

```bash
npm run dev
```

The API runs at http://localhost:5000.

## 4. Start the frontend

Open another terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Then:

```bash
npm run dev
```

Open the URL printed by Vite, normally http://localhost:5173.

## 5. Add sample projects

After MongoDB is connected:

```bash
cd server
npm run seed
```

This inserts three sample projects.

## 6. Customize

Edit `client/src/data/profile.js` to replace the sample name, bio, skills and social links.

## 7. API endpoints

- GET `/api/projects`
- POST `/api/projects`
- PUT `/api/projects/:id`
- DELETE `/api/projects/:id`
- POST `/api/messages`
- GET `/api/messages`

## 8. Important

Do not commit `.env` files. They are already ignored by `.gitignore`.

## 9. Deployment

Frontend:
- Build with `npm run build`
- Deploy `client/dist` to Vercel or Netlify.

Backend:
- Deploy the `server` folder to Render or another Node hosting service.
- Add `MONGO_URI`, `CLIENT_URL`, and `PORT` as environment variables.

For the deployed frontend, set:

```env
VITE_API_URL=https://YOUR-BACKEND-URL/api
```
