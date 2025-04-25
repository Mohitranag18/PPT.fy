# ppt-maker

---

## 🛠️ Contribution Guide

Thank you for your interest in contributing to this project! We’re excited to have your help. Please follow the steps below to set up the project locally and start contributing.

---

### 🧱 Tech Stack
- **Frontend:** React.js
- **Backend:** Django (REST Framework)

---

### 🚀 Getting Started

#### 1. **Fork the Repository**
Click on the top-right **Fork** button and create a copy under your GitHub account.

#### 2. **Clone Your Fork**
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

#### 3. **Set Up the Backend (Django)**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
> Backend will run on: `http://127.0.0.1:8000/`

#### 4. **Set Up the Frontend (React)**
```bash
cd frontend
npm install
npm start
```
> Frontend will run on: `http://localhost:3000/`

---

### 🌐 Connecting Frontend with Backend
Make sure API calls from the React app point to your Django backend URL (e.g., `http://127.0.0.1:8000/api/...`). You can configure the base URL using environment variables or a config file.

---

### 📄 Contribution Guidelines

- Create a new branch:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- Make your changes and commit:
  ```bash
  git add .
  git commit -m "Add: Your message"
  ```
- Push to your fork:
  ```bash
  git push origin feature/your-feature-name
  ```
- Open a Pull Request (PR) from your fork to the main repository.

---
