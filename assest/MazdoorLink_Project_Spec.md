# MazdoorLink: Project Specification (for Antigravity)

> Read this whole file first. Give me a short plan, then build the project step by step. Do not skip any section.

---

## 1. Assignment Requirements (from my teacher, MUST be satisfied)

This project is a university/class assignment: **"Assignment: Deploy Your Idea" (100 points)**.

The teacher requires:

- The work must be **complete and working**, not just an idea or concept.
- The project must be **deployed properly** (a live public link must work).
- Submission must contain:
  - Name
  - Project/Idea Name
  - Short Project Description
  - Deployed Project Link
  - Screenshots
- The project must be **fully deployed and tested before submission**.

**What you (Antigravity) must do for this:**

1. Make the app production-ready and deployable on Netlify or Vercel.
2. Give me exact deployment steps at the end.
3. Create a `SUBMISSION.md` file containing: project name, a 3-4 line description, tech stack, and a list of 5 screenshots I should take (Splash, Sign Up, Login, Contractor Post Site, Mazdoor Home).
4. Test every page and button before saying the project is finished. Fix any bug.

---

## 2. Project Idea

**Project name:** MazdoorLink (suggest a better name if you have one)

**Country:** Pakistan

**Problem:**
Daily-wage construction workers (mazdoor, mistri, painters, electricians, plumbers, carpenters) often do not know where a new building is under construction or where workers are needed. They earn on some days and sit idle at home on others. Contractors and dealers, on the other hand, struggle to find reliable workers quickly.

**Solution:**
A simple, professional mobile app where:
- **Contractors/dealers** post their active construction site and how many workers they need.
- **Workers** see nearby sites, check the daily wage, and contact the contractor directly by call or WhatsApp.

**Why it is useful:** More working days for workers, faster hiring for contractors, and less time wasted at labour chowks.

**Difference from existing apps (Fori Mazdoori, Rozgar.pk):** This app focuses only on **construction sites**, with a site-based job post (location, wage, days, number of workers) and a very simple Urdu, icon-based interface for low-literacy users.

---

## 3. Tech Stack

- React + Vite
- Tailwind CSS
- Firebase Authentication (email/password)
- Firebase Firestore (database)
- PWA (manifest + service worker) so it installs like a real app on a phone
- Deployable on Netlify or Vercel

Keep the code clean, split into components, with a clear folder structure.

---

## 4. Design and Theme

- **Theme: Luxury Black and Gold**
  - Background: `#0A0A0A`
  - Cards: `#141414`
  - Gold: `#D4AF37` (use a subtle gold gradient for buttons and headings)
  - Text: white and soft grey
- Premium, clean look. Rounded cards, soft gold glow on hover, smooth transitions.
- **Mobile-first**, but must also look good on desktop.
- Large, touch-friendly buttons with big icons next to every action (many users have low literacy).
- Fonts: a clean modern font for English, and Noto Nastaliq Urdu (or similar) for Urdu.

### Logo and Splash Screen

- Create an **animated SVG logo**: a gold hard-hat or building silhouette combined with two joined hands (connection/trust).
- On app start, show a splash screen: the logo **draws itself with a gold stroke animation**, the app name fades in below it, then it transitions to the Login page.
- Use the same logo in the header, login page and favicon.

---

## 5. Language

- **Urdu (default, RTL)** and **English**, with a toggle button on every main page.
- Remember the chosen language.

---

## 6. Pages and Features

### 6.1 Splash Screen
Animated logo (see above).

### 6.2 Sign Up
Fields: full name, phone number, email, password, city.
Role selection with two big cards: **Mazdoor (Worker)** or **Contractor/Dealer**.
Validation on all fields with clear error messages.

### 6.3 Login
Email + password, "Forgot password" (Firebase reset email), link to Sign Up.

### 6.4 Contractor Dashboard
- **Post a Site** form:
  - Site name
  - City and area
  - Work type: mistri, mazdoor, painter, electrician, plumber, carpenter
  - Number of workers needed
  - Daily wage (PKR)
  - Number of days
  - Phone / WhatsApp number
  - Short note (optional)
- List of their own posts with **Edit**, **Delete**, and **Mark as Filled**.

### 6.5 Mazdoor Home
- List of active sites as cards (site name, area, work type, wage, days, workers needed).
- **Search and filters:** city/area, work type, minimum wage.
- **Call** and **WhatsApp** buttons on every card (WhatsApp opens `https://wa.me/<number>` with a prefilled message).
- Hide posts marked as filled.

### 6.6 Profile Page
- Mazdoor: name, skill, experience (years), area, availability (available / busy).
- Contractor: name, company name, city.
- Edit and save.

### 6.7 Navigation
Bottom navigation bar on mobile (Home, Post/My Sites, Profile). Logout option.

---

## 7. Rules and Quality

- Protect routes by role: a Mazdoor cannot open the Contractor dashboard and vice versa.
- Redirect logged-out users to Login.
- Show loading states, empty states ("No sites found") and friendly error messages.
- Seed **8 realistic demo sites** (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, etc.) so the app does not look empty.
- Firebase keys go in a `.env` file. Never hardcode them.
- Add basic Firestore security rules (users can edit only their own data; anyone logged in can read sites; only the owner can edit or delete a site).

---

## 8. Features NOT to build (out of scope)

- Online payments
- Live chat
- GPS tracking
- Video calls

## 9. Optional (only if everything above works perfectly)

- Rating system for workers and contractors
- "Apply" button and contractor approval

---

## 10. Final Deliverables

1. Full working code.
2. Step-by-step guide to create the Firebase project, enable Authentication and Firestore, and where to paste the keys.
3. Step-by-step deployment guide (Netlify or Vercel) to get the live link.
4. `SUBMISSION.md` (project name, description, tech stack, screenshot checklist).
5. `README.md` with setup instructions.

**Start by showing me a short plan, then build step by step and wait for my confirmation after each major step.**
