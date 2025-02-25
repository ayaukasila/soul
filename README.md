Soul - Mental Health Tracker
Soul is a Flask-based web application that helps users track their mood, save daily mood entries (with optional notes), chat with an AI assistant powered by AI21 Labs, and explore relevant articles. The project includes user authentication (registration and login), mood tracking with graphical analysis, an AI-powered chat feature, and profile management with account update and deletion capabilities.

Features
User Authentication

Register a new account (with password hashing)
Login and logout
Mood Tracking

Enter your mood (choose from options: awful, bad, okay, good, great) along with an optional note
View a line chart showing the frequency of mood entries over various time ranges (Last Week, Last Month, All Time)
AI Chat

Chat with an AI assistant using the AI21 Labs API
Explore Articles

Search for articles stored in a local database based on keywords
Profile Management

View your account details (username, email, total mood entries)
See a history of your mood entries
Update your username
Delete your account
Technologies
Python 3 & Flask
Flask SQLAlchemy for database management
PostgreSQL (or SQLite for testing)
Tailwind CSS for styling
Chart.js for rendering mood charts
AI21 Labs API for AI chat functionality
