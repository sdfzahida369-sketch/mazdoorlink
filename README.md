# MazdoorLink (مزدور لنک) 🏗️✨

> **Connecting Construction Workers & Contractors in Pakistan**  
> Luxury Black & Gold themed Progressive Web App (PWA) built with React, Vite, Tailwind CSS, and Firebase.

---

## 🌟 Key Features

1. **Luxury Black & Gold Design:**
   - Background `#0A0A0A`, Cards `#141414`, Gold `#D4AF37`.
   - Hand-crafted animated SVG logo (construction hardhat + joined hands of trust).
   - High-contrast touch-friendly interface tailored for low-literacy users.

2. **Dual Language (Urdu RTL Default & English):**
   - Seamless one-tap language switch with persistent preference in `localStorage`.
   - RTL layout for Urdu with Noto Nastaliq Urdu typography.

3. **Role-Based Experience:**
   - **Mazdoor (Worker):** Browse active construction sites, search by city/area, filter by trade and minimum daily wage, one-tap direct calling and pre-filled WhatsApp messages.
   - **Contractor / Dealer:** Post active construction sites with labor counts, daily wage (PKR), job duration, and manage posts (Edit, Delete, Mark as Filled).

4. **8 Realistic Pakistani Seed Sites:**
   - Pre-populated with realistic job postings across Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and Gujranwala.

5. **Dual-Mode Backend:**
   - Full Firebase Authentication & Cloud Firestore support.
   - Built-in instant **Demo Mode** with 1-click test logins ("Demo as Mazdoor" / "Demo as Contractor") even without active Firebase credentials.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The app will be available at: **http://127.0.0.1:5173/**

### 4. Build for Production
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

---

## 🔥 Firebase Setup Guide (Step-by-Step)

If you want to connect your own live Firebase backend:

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Click **Add project**, name it `mazdoorlink`, and click **Create Project**.

2. **Enable Firebase Authentication:**
   - In the left sidebar, navigate to **Build > Authentication**.
   - Click **Get Started**.
   - Under **Sign-in method**, enable **Email/Password** and click **Save**.

3. **Enable Cloud Firestore Database:**
   - Navigate to **Build > Firestore Database**.
   - Click **Create database**.
   - Choose your nearest cloud location (e.g. `asia-south1`).
   - Start in **Production mode** (or Test mode).
   - Click **Rules** tab and paste the contents from `firestore.rules`, then click **Publish**.

4. **Register Web App & Copy Keys:**
   - In Project Overview, click the **Web (</>)** icon.
   - App nickname: `mazdoorlink-web`.
   - Click **Register app**.
   - Copy the `firebaseConfig` credentials.

5. **Add Keys to `.env`:**
   Open the `.env` file in the project root and replace with your values:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=mazdoorlink.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=mazdoorlink
   VITE_FIREBASE_STORAGE_BUCKET=mazdoorlink.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:...
   ```
6. Restart your dev server (`npm run dev`) or re-build (`npm run build`).

---

## 🌐 Deployment Guide (Live Public Link)

### Option A: Deploy to Vercel (Recommended - Fastest)

#### Via Vercel Web Dashboard (Drag-and-Drop or GitHub):
1. Push your code to a GitHub repository or install Vercel CLI (`npm i -g vercel`).
2. Log into [vercel.com](https://vercel.com).
3. Click **Add New... > Project** and import your GitHub repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. (Optional) Add your Firebase environment variables under **Environment Variables**.
8. Click **Deploy**.
9. You will get a live URL such as `https://mazdoorlink.vercel.app`.

---

### Option B: Deploy to Netlify (Drag-and-Drop or Git)

#### Method 1: Netlify Drop (Instant without Git):
1. Run `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder directly onto the page.
4. Netlify will deploy it instantly and provide a live URL!

#### Method 2: Git Repository:
1. Log into [netlify.com](https://netlify.com).
2. Click **Add new site > Import an existing project**.
3. Select GitHub and choose your repository.
4. Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. (Optional) Add environment variables in **Site configuration > Environment variables**.
6. Click **Deploy MazdoorLink**.

---

## 📋 University Assignment Submission
Refer to [`SUBMISSION.md`](file:///c:/Users/At/Desktop/sadaf/SUBMISSION.md) for the project submission template, description, tech stack details, and screenshot checklist.
