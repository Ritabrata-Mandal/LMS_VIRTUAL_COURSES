# Virtual Code LMS

🎓 **Virtual Code LMS** is a full-stack Learning Management System (LMS) built using the **MERN Stack**. It enables educators to create and manage courses while allowing students to enroll, learn through video lectures, leave reviews, and search for courses using AI-powered recommendations.

---

## 🌐 Live Demo

**Frontend:** https://lms-virtual-code-frontend.onrender.com/

---

## ✨ Features

### 🔐 Authentication
- Email & Password Authentication
- Google Authentication
- JWT-based Authentication
- Secure HTTP-only Cookies
- Forgot Password using OTP Verification
- Password Reset

### 👨‍🎓 Student Features
- Browse Published Courses
- View Course Details
- AI-powered Course Search
- Voice Search using Web Speech API
- Course Reviews & Ratings
- Razorpay Payment Integration
- Course Enrollment
- User Profile Management

### 👨‍🏫 Educator Features
- Create Courses
- Edit Course Details
- Publish / Unpublish Courses
- Upload Course Thumbnails
- Create Lectures
- Edit Lectures
- Upload Video Lectures
- Mark Lectures as Preview Free
- Delete Lectures
- Course Management Dashboard

### 🤖 AI Features
- Intelligent Course Recommendation using Google Gemini API
- Voice Search
- Speech-to-Text Search
- Text-to-Speech Responses

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Nodemailer
- Google Gemini API

### 💳 Payment Gateway
- Razorpay

### ☁️ Deployment
- Frontend: Render
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Project Structure

```text
LMS
│
├── frontend
│   ├── src
│   ├── assets
│   ├── redux
│   └── components
│
├── backend
│   ├── controller
│   ├── middleware
│   ├── model
│   ├── route
│   ├── config
│   └── utils
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git
```

```bash
cd LMS
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GEMINI_API_KEY=

EMAIL=
EMAIL_PASSWORD=

RAZORPAY_KEY_ID=
RAZORPAY_SECRET=
```

Run the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

Add screenshots of the application here, such as:

- 🏠 Home Page
- 📚 Course Listing
- 🎥 Course Details
- 👨‍🏫 Educator Dashboard
- 🤖 AI Search
- ⭐ Reviews & Ratings
- 💳 Payment Page

---

## 📌 Future Improvements

- Wishlist
- Course Progress Tracking
- Certificate Generation
- Instructor Analytics
- Admin Dashboard
- Course Filtering & Sorting
- Discussion Forum
- Notifications
- Dark Mode

---

## 📄 License

This project is developed for educational and learning purposes.