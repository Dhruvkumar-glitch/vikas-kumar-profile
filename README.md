# Professional Profile — MERN Stack (with Admin Dashboard + AI Chat)

DGM, Vynk Parking Solutions ke liye professional profile website. React (Vite) frontend + Express/Node backend + MongoDB, ek Admin Dashboard (bina code chhue content edit karne ke liye) aur ek AI chat widget (Gemini API se) ke saath.

## Structure

```
vynk-profile/
├── client/     React frontend (Vite) — public profile page + /admin dashboard
└── server/     Express API + MongoDB (Mongoose) + AI chat endpoint
```

## Features

- **Public profile page** — Hero, About, Services, Experience, Highlights, Contact
- **Admin Dashboard** (`/admin`) — password-protected page to edit every field directly from the browser. No more editing `seed.js` by hand.
- **AI Chat widget** — floating "Ask AI" button on the profile page, powered by Google Gemini, answers visitor questions using your profile data as context.

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

`.env` file kholo aur fill karo:
```
MONGO_URI=mongodb://127.0.0.1:27017/vynk_profile   # ya MongoDB Atlas connection string
PORT=5000
ADMIN_PASSWORD=apna-koi-bhi-strong-password
GEMINI_API_KEY=                                     # optional, AI chat ke liye — https://aistudio.google.com/apikey se free milta hai
```

Seed data daalo aur server start karo:
```bash
npm run seed
npm run dev
```
Backend chalega `http://localhost:5000` par.

## 2. Frontend setup

Naye terminal me:
```bash
cd client
npm install
npm run dev
```
Frontend chalega `http://localhost:5173` par.

## 3. Content edit karna (Admin Dashboard)

1. Browser me kholo: `http://localhost:5173/admin`
2. `.env` me set kiya hua `ADMIN_PASSWORD` daalo
3. Naam, bio, experience, services, stats, contact — sab kuch yahi se edit karo aur **Save Changes** dabao
4. Live page (`/`) turant update ho jayega

`seed.js` ab sirf **first-time setup** ke liye hai — uske baad sab kuch dashboard se hi update hoga.

## 4. AI Chat widget

Profile page ke right-bottom corner me "Ask AI" button hai. Ye tabhi kaam karega jab `server/.env` me `GEMINI_API_KEY` set ho. Free key yahan se milegi: https://aistudio.google.com/apikey

Key na ho toh bhi baki poora site normal kaam karega — sirf chat widget error dikhayega.

## Deployment

### MongoDB
- MongoDB Atlas (free tier) par account banao: https://mongodb.com/cloud/atlas
- Connection string production `.env` me `MONGO_URI` ke taur par daalo

### Backend (server)
- Render.com ya Railway.app par deploy karo (dono free tier dete hain)
- Environment variables (`MONGO_URI`, `PORT`, `ADMIN_PASSWORD`, `GEMINI_API_KEY`) waha ke dashboard me set karo
- Build command: `npm install` · Start command: `npm start`

### Frontend (client)
```bash
cd client
npm run build
```
Isse `client/dist` folder banega. Isko Vercel ya Netlify par deploy karo.
- Deploy karte waqt ek environment variable set karo jo API ka base URL point kare (production me `vite.config.js` ka proxy kaam nahi karega — deploy se pehle bata dena, is hisaab se ek chhota sa config change karna padega taaki frontend deployed backend URL ko hit kare)

Jab deploy karna ho, batana — us waqt exact steps aur zaroori config changes bata dunga (Render + Vercel ke actual URLs ke hisaab se).
