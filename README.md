# 🐾 Pet Meal Subscription System

A simple, straightforward Pet Meal Subscription system built with **Yii2 (Backend)** and **ReactJS (Frontend)**.

## 🚀 Setup & Installation

### 1. Database Setup
1. Open your MySQL client (e.g., phpMyAdmin, TablePlus, or CLI).
2. Create a new database named `pet_meal_subscription` (or import the provided file directly).
3. Import the `database.sql` file located in the root of this repository. This will create the necessary tables (`meal_plans`, `subscriptions`) and insert initial seed data.

### 2. Backend (Yii2) Setup
1. Navigate to the `backend` directory in your terminal:
   ```bash
   cd backend
   ```
2. The database configuration is located in `backend/config/db.php`. It defaults to:
   - **host**: `localhost`
   - **dbname**: `pet_meal_subscription`
   - **username**: `root`
   - **password**: `''` (empty)
   *(Update these credentials if your local MySQL setup is different).*
3. Start the Yii2 development server:
   ```bash
   php yii serve --port=8080
   ```
   *The API will now be accessible at `http://localhost:8080`.*

### 3. Frontend (ReactJS) Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

---

## 🎯 Assumptions Made

1. **User Authentication**: To keep the assessment focused and simple, full user authentication (Login/Registration) was omitted. The frontend uses a simple "User ID" input field (defaulting to 1) when creating or viewing subscriptions to simulate a logged-in user.
2. **Yii2 API Configuration**: I configured the `SubscriptionController` manually using `UrlRule` rather than using Yii2's advanced `ActiveController` magic. This makes the endpoints (`actionMealPlans`, `actionCreate`, `actionView`) highly readable and explicit, which is much better for an interview discussion.
3. **Frontend Styling**: I used vanilla CSS (`index.css`) for a clean, modern aesthetic without the overhead of bringing in Bootstrap or Tailwind, fulfilling the requirement to keep things minimal but good-looking.
4. **Environment**: It is assumed that PHP 8+ and Composer are installed for the backend, and Node.js (npm) is installed for the frontend.
