# Backend Deployment Guide

## Deploy to Railway (Recommended)

### Prerequisites
- GitHub account with repo pushed ✅
- MongoDB Atlas account (already set up ✅)
- Railway account (free)

### Step 1: Create Railway Account & Connect GitHub
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway to access your GitHub repos

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find `jumbotail` repo and connect

### Step 3: Configure Environment Variables
Once the project is created, go to **Variables** tab and add:

```
MONGO_URI=mongodb+srv://akhiljoseph225292_db_user:LUn9kMYys3qAj0Y3@cluster0.pwuv9po.mongodb.net/?appName=Cluster0
DB_NAME=ecommerce_search
FRONTEND_URL=https://jumbotail-pn5m4kppg-akhil-josephs-projects-74519c2b.vercel.app
PORT=3000
NODE_ENV=production
```

### Step 4: Deploy
1. Select the **`backend`** directory as root (if prompted)
2. Click **Deploy**
3. Wait for build to complete (2-3 minutes)
4. Copy the public URL (e.g., `https://jumbotail-backend-production.up.railway.app`)

### Step 5: Connect Frontend to Backend
1. Go to Vercel → Settings → Environment Variables
2. Add: `VITE_API_URL=https://jumbotail-backend-production.up.railway.app`
3. Redeploy frontend (or it auto-redeploys)
4. Test at your Vercel frontend URL

### Step 6: Test Backend Health
```
curl https://your-railway-backend-url/health
```
Expected response:
```json
{ "status": "OK" }
```

---

## Deploy to Render (Alternative)

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. New → Web Service
4. Connect `jumbotail` repo
5. Set **Root Directory**: `backend`
6. Set **Build Command**: `npm install`
7. Set **Start Command**: `npm start`
8. Add environment variables (same as Railway)
9. Deploy

---

## Deploy to Heroku (Legacy but still works with paid tier)

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. `heroku login`
3. `heroku create jumbotail-backend`
4. Add environment variables:
   ```bash
   heroku config:set MONGO_URI=<your_mongo_uri> -a jumbotail-backend
   heroku config:set FRONTEND_URL=https://jumbotail-pn5m4kppg-akhil-josephs-projects-74519c2b.vercel.app -a jumbotail-backend
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

---

## Verify Deployment

After deploying, test these endpoints:

### Health Check
```bash
curl https://your-backend-url/health
```

### Search Products
```bash
curl "https://your-backend-url/api/v1/search/product?query=iPhone"
```

Expected response:
```json
{
  "data": [
    {
      "_id": "...",
      "title": "iPhone 10 64GB",
      "price": 63200,
      "rating": 4.67,
      ...
    }
  ]
}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors in frontend console | Make sure `FRONTEND_URL` is set correctly in backend env vars |
| MongoDB connection fails | Verify `MONGO_URI` is correct; check Atlas whitelist has your IP |
| 502 Bad Gateway | Check Railway/Render logs for errors |
| Port conflicts | Railway/Render auto-assign PORT; don't hardcode 5000 |

---

## Quick Summary
- **Railway**: 5 minutes, free tier available, auto-deploys on push
- **Render**: 5 minutes, free tier available, good uptime
- **Heroku**: 5 minutes, paid tier ($7/month minimum)

**Next Step**: Choose platform and I'll guide you through it!
