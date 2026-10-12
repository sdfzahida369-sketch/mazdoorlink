# Assignment Submission: Deploy Your Idea

## 1. Student Details
- **Student Name:** [Your Name]
- **Course / Degree:** [Your Course / Class]
- **Date of Submission:** October 12, 2026

---

## 2. Project Details
- **Project Name:** MazdoorLink (مزدور لنک)
- **Deployed Project Link:** [Add your live Netlify / Vercel link here, e.g., `https://mazdoorlink.vercel.app`]
- **GitHub / Source Code Repository:** [Add your repository link if applicable]

---

## 3. Short Project Description
MazdoorLink is a mobile-first web and PWA platform designed for Pakistan's construction sector to directly connect daily-wage construction workers (mazdoor, mistri, painters, electricians, plumbers, carpenters) with contractors and builders. Contractors post active construction sites with real-time labor requirements, daily wage rates (PKR), and job durations, while workers can browse and filter nearby sites with a high-contrast luxury Urdu (RTL default) and English interface. Workers can instantly contact contractors via direct cellular calls or pre-filled WhatsApp messages, eliminating the uncertainty and lost hours spent waiting at physical labor chowks.

---

## 4. Tech Stack
- **Frontend Framework:** React 18 + Vite
- **Styling & Design:** Tailwind CSS (Luxury Black `#0A0A0A` & Gold `#D4AF37` Theme)
- **Typography & Localization:** Noto Nastaliq Urdu / Noto Sans Arabic (Urdu RTL default) & Inter (English)
- **Backend / Authentication:** Firebase Authentication (Email/Password with reset support)
- **Database:** Firebase Cloud Firestore (with local fallback demo mode)
- **PWA Capabilities:** Service Worker, Web App Manifest (`vite-plugin-pwa`)
- **Icons & Assets:** Lucide React & Custom Animated Gold SVG Logo

---

## 5. Required Submission Screenshots Checklist
Please capture the following 5 screenshots on desktop or mobile view (Chrome DevTools Mobile Toggle recommended):

- [ ] **Screenshot 1: Splash Screen**
  - *Location:* App startup (`http://127.0.0.1:5173/`)
  - *Details:* Animated gold hard-hat and joined hands SVG logo with gold glow, "مزدور لنک" title, and loading bar on deep black background.
- [ ] **Screenshot 2: Sign Up Page**
  - *Location:* Click "نیا اکاؤنٹ بنائیں / Sign Up"
  - *Details:* Registration form showing role selection cards for **Mazdoor (Worker)** vs **Contractor / Dealer** with gold active highlights.
- [ ] **Screenshot 3: Login Page**
  - *Location:* Login screen (`http://127.0.0.1:5173/`)
  - *Details:* Email and password input fields, "Demo as Mazdoor" & "Demo as Contractor" instant quick-test buttons, and language toggle.
- [ ] **Screenshot 4: Contractor Dashboard / Post Site**
  - *Location:* Contractor Dashboard ("میری سائٹس / My Sites" tab)
  - *Details:* "نئی تعمیراتی سائٹ پوسٹ کریں" form with fields for Site Name, City/Area, Work Type, Daily Wage (PKR), Days, Workers needed, and list of posted sites with Edit/Delete/Mark as Filled options.
- [ ] **Screenshot 5: Mazdoor Home Feed**
  - *Location:* Mazdoor Home ("مرکزی صفحہ / Home" tab)
  - *Details:* Active construction site cards with PKR daily wage badges, duration, city/area filters, search bar, and one-tap **Call (کال کریں)** and **WhatsApp (واٹس ایپ)** buttons.
