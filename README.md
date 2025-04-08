# 🤖 IntelliBot - AI-Powered Chatbot Ticketing System

IntelliBot is a full-stack web application that allows users to register/login, chat with an AI-powered assistant (OpenAI), and submit support tickets. Admins can view all submitted tickets. The system supports role-based access and uses JWT authentication.

## 💡 Features

- 🔐 User registration and login with JWT authentication
- 👤 Role-based access for Admin and User
- 💬 Smart chatbot powered by OpenAI API (ChatGPT)
- 📩 Ticket submission through chatbot interaction
- 🧑‍💼 Admin dashboard to manage tickets

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB Atlas
- **AI Integration:** OpenAI API (`gpt-3.5-turbo`)

## 📁 Folder Structure

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/intellibot.git
cd intellibot

cd server
npm install


MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key


node server.js


cd client
npm install
npm run dev


const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [...conversation],
});


📬 API Overview
Auth
POST /api/register — User registration

POST /api/login — User login (returns JWT)

Tickets
POST /api/tickets — Submit new ticket (User)

GET /api/tickets — Get all tickets (Admin only)

✅ Admin Access
Admins can:

View all submitted tickets

Manage responses (optional feature)

📌 Notes
No third-party chatbot services used (OpenAI only).

You must have a valid OpenAI API key to enable chatbot functionality.

Developed by Ravi, Rohit, Rishabh, Samar
GitHub: https://github.com/yourusername