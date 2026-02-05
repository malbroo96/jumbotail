# Deployment Checklist & Guide

## Pre-Deployment Steps

### 1. **Remove Debug Routes**
- Remove `import debugRoutes from "./routes/debugRoutes.js"` from `backend/src/app.js`
- Remove `app.use("/__debug", debugRoutes)` from `backend/src/app.js`
- Delete `backend/src/routes/debugRoutes.js` file

### 2. **Update Environment Variables**

#### Backend (.env on deployment platform)
```
MONGO_URI=mongodb+srv://akhiljoseph225292_db_user:LUn9kMYys3qAj0Y3@cluster0.pwuv9po.mongodb.net/?appName=Cluster0
DB_NAME=ecommerce_search
PORT=5000  # or let platform assign it
NODE_ENV=production
```

#### Frontend (.env.local or .env)
```
VITE_API_URL=https://your-backend-domain.com
```

### 3. **Configure CORS for Production**
Update `backend/src/app.js`:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));
```

### 4. **Frontend API URL**
Update `frontend/src/pages/SearchPage.jsx`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const res = await fetch(`${API_URL}/api/v1/search/product?query=${encodeURIComponent(searchQuery)}`);
```

## Deployment Platforms

### Option 1: **Vercel (Frontend) + Railway (Backend)**

#### Frontend (Vercel):
1. Push code to GitHub
2. Connect repo to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add env var: `VITE_API_URL=https://your-railway-backend.com`

#### Backend (Railway):
1. Connect repo to Railway
2. Set PORT to empty (Railway assigns it)
3. Set environment variables in Railway dashboard
4. Deploy!

### Option 2: **Heroku**
- Heroku phased out free tier, but similar flow applies to Render or Railway

### Option 3: **Self-hosted (AWS EC2, DigitalOcean, etc.)**
- Install Node.js
- Install MongoDB (or use Atlas - already set up)
- Set environment variables
- Use PM2 for process management
- Configure NGINX as reverse proxy

## Build & Test Locally

```bash
# Backend
cd backend
npm install
npm start  # Verify no errors

# Frontend
cd frontend
npm install
npm run build  # Creates dist/ folder
npm run preview  # Test production build locally
```

## Quick Deployment Summary

| Component | Platform | Steps |
|-----------|----------|-------|
| **Frontend** | Vercel | Push to GitHub → Connect Vercel → Auto-deploy |
| **Backend** | Railway | Push to GitHub → Connect Railway → Set env vars |
| **Database** | MongoDB Atlas | Already configured ✅ |

## Post-Deployment

1. Test API endpoint: `https://your-backend.com/health`
2. Test frontend: `https://your-frontend.com`
3. Check browser console for API errors
4. Verify search works end-to-end
5. Monitor logs on deployment platform
