<h1 align="center">🏢 Enterprise Management System & E-Commerce Platform</h1>

<p align="center">
<i>A comprehensive enterprise administration and e-commerce platform featuring an advanced, highly customizable dashboard inspired by AdminLTE.</i>
</p>

<p align="center">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/React-20232A%3Fstyle%3Dfor-the-badge%26logo%3Dreact%26logoColor%3D61DAFB" alt="React" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Redux-593D88%3Fstyle%3Dfor-the-badge%26logo%3Dredux%26logoColor%3Dwhite" alt="Redux" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/FastAPI-009688%3Fstyle%3Dfor-the-badge%26logo%3Dfastapi%26logoColor%3Dwhite" alt="FastAPI" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Python-3776AB%3Fstyle%3Dfor-the-badge%26logo%3Dpython%26logoColor%3Dwhite" alt="Python" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Tailwind_CSS-38B2AC%3Fstyle%3Dfor-the-badge%26logo%3Dtailwind-css%26logoColor%3Dwhite" alt="Tailwind" />
</p>

📖 Overview

This project is a robust, full-stack enterprise management system integrated with an e-commerce storefront. It handles complex business logic, including product/order management, real-time analytics, secure payment processing, and multi-provider social authentication.

The admin interface is built with a highly responsive, AdminLTE-style dynamic layout to provide the best user experience for system administrators and managers.

<div align="center">
<!-- Thay link ảnh dưới đây bằng ảnh thực tế chụp màn hình dự án của bạn -->
<img src="https://www.google.com/search?q=https://via.placeholder.com/800x400.png%3Ftext%3D[Image+of+Admin+Dashboard+Screenshot]" alt="Admin Dashboard" width="100%" />
</div>

✨ Key Features

💻 Frontend (Client & Admin)

Modular Architecture: Built using React.js and state management with Redux.

AdminLTE-style Dashboard: Complex, dynamic layouts with sidebar navigations, collapsible menus, and highly responsive UI components styled with Tailwind CSS.

Role-Based Access Control (RBAC): Dynamically restricts UI components and routes based on user roles (e.g., Admin vs. Customer).

⚙️ Backend & Database

High-Performance API: Built with FastAPI for asynchronous, high-speed request handling.

Relational Database Design: Engineered with SQLAlchemy ORM, featuring complex schemas for users, products, shopping carts, orders, and real-time dashboard statistics.

🛡️ Security & Authentication

Strict JWT Session Management: Advanced session control detecting and preventing concurrent logins (logging in from a new device invalidates the previous session).

OAuth2 Social Login: Seamless integration with Google, Facebook, and GitHub authentication.

🔌 Integrations & Real-time

MoMo Payment Gateway: Integrated MoMo e-wallet API for secure, instant order checkouts.

WebSockets: Real-time bi-directional communication pushing instant order notifications and live statistics to the admin dashboard.

🛠️ Tech Stack

Component

Technology

Frontend

React.js, Redux, React Router, Tailwind CSS, Lucide Icons

Backend

Python, FastAPI, SQLAlchemy, Uvicorn

Database

PostgreSQL / MySQL / SQLite

Authentication

JWT (JSON Web Tokens), OAuth2

Real-time

WebSockets (Socket.io / FastAPI WebSockets)

Payments

MoMo API

🚀 Getting Started

Prerequisites

Node.js (v16+)

Python (3.9+)

SQL Database (PostgreSQL/MySQL)

1. Clone the repository

git clone [https://github.com/yourusername/enterprise-management-system.git](https://github.com/yourusername/enterprise-management-system.git)
cd enterprise-management-system


2. Backend Setup

cd backend
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your Database URL, JWT Secret, and MoMo API keys

# Run database migrations
alembic upgrade head

# Start the FastAPI server
uvicorn app.main:app --reload --port 1111


3. Frontend Setup

cd frontend
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your REACT_APP_API_URL

# Start the React development server
npm start


📂 Project Structure

Brief overview of the system architecture:

📦 project-root
 ┣ 📂 backend (FastAPI)
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 models        # SQLAlchemy Models (Users, Orders, Products, etc.)
 ┃ ┃ ┣ 📂 routers       # API Endpoints
 ┃ ┃ ┣ 📂 schemas       # Pydantic validation schemas
 ┃ ┃ ┣ 📂 services      # Business logic & Third-party integrations (MoMo)
 ┃ ┃ ┗ 📜 main.py       # FastAPI application entry point
 ┃ ┗ 📜 requirements.txt
 ┃
 ┗ 📂 frontend (React)
   ┣ 📂 src
   ┃ ┣ 📂 components    # Reusable UI components (AdminLTE styles)
   ┃ ┣ 📂 pages         # Page views (Dashboard, Login, Cart)
   ┃ ┣ 📂 stores        # Redux actions and reducers
   ┃ ┗ 📜 App.js        # React Router setup & Route Guards
   ┗ 📜 package.json


💡 System Architecture Highlight

One of the standout technical achievements of this project is the Session Management. The backend tightly controls JSON Web Tokens (JWT) and maintains a Session table. If a user logs in from a new device, the system automatically revokes the token of the previous session, returning a 401 Unauthorized - Logged in from another location error to the old device.

🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License

This project is MIT licensed.
