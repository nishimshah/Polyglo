# 🌐 Polyglo – Language Learning Platform (Duolingo Style)

Polyglo is a full-stack language learning platform built with **Django (Backend)** and **React + Vite + Tailwind (Frontend)**.  
It focuses on interactive language learning features similar to **Duolingo**, including lessons, flashcards, quizzes, and progress tracking.  

---

## 🚀 Features

### ✅ Current Features
- **User Authentication** (JWT-based login, signup, logout)  
- **Courses & Lessons** – Browse, search, and filter language courses by difficulty  
- **Enrollments** – Enroll in courses and track progress  
- **Flashcards** – Create flashcards with text/images  
- **Quizzes & Progress Tracking** – View XP, streaks, and completion stats  
- **Responsive UI** with **Tailwind CSS + React**  
- **File Uploads** to Supabase/Cloudinary for lesson media  
- **Real-time features** ready with Django Channels + Daphne  

---

## 🛠️ Tech Stack

**Frontend:**  
- React (Vite + Tailwind CSS)  
- React Router  
- Axios for API calls  
- JWT for authentication  

**Backend:**  
- Django + Django REST Framework (DRF)  
- JWT Authentication (SimpleJWT)  
- Django Channels (for future real-time chat & notifications)  

**Database & Storage:**  
- PostgreSQL / SQLite (local dev)  
- Supabase or Cloudinary for media uploads  

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/polyglo.git
cd polyglo
