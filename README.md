# Soul - Mental Health Tracker

Soul is a Flask-based web application that helps users track their mood, save daily mood entries (with optional notes), chat with an AI assistant powered by AI21 Labs, and explore relevant articles. The project includes user authentication (registration and login), mood tracking with graphical analysis, an AI-powered chat feature, and profile management with account update and deletion capabilities.

## Features

- **User Authentication**
  - Register a new account (passwords are securely hashed)
  - Login and logout

- **Mood Tracking**
  - Enter your mood (choose from options: awful, bad, okay, good, great) with an optional note
  - View a line chart showing the frequency of mood entries over various time ranges (Last Week, Last Month, All Time)

- **AI Chat**
  - Chat with an AI assistant using the AI21 Labs API

- **Explore Articles**
  - Search for articles from a local database based on keywords

- **Profile Management**
  - View your profile details (username, email, total mood entries)
  - See a history of your mood entries
  - Update your username
  - Delete your account

## Technologies

- **Python 3** & **Flask**
- **Flask SQLAlchemy** for database management
- **PostgreSQL** (or SQLite for testing)
- **Tailwind CSS** for styling
- **Chart.js** for rendering mood charts
- **AI21 Labs API** for AI chat functionality
## Getting Started

### Prerequisites

- **Python 3.x** (recommended Python 3.11)
- **pip** (or Poetry if you prefer)
- A PostgreSQL database (or SQLite for local testing)

### Installation

1. **Clone the repository:**

   git clone https://github.com/ayaukasila/soul.git
   cd soul
   
2. **Create and activate a virtual environment:**
   
   python3 -m venv venv
source venv/bin/activate

3. **Install dependencies:**

   pip install -r requirements.txt
   
4. **Configure the Database:**

In config.py, set your SQLALCHEMY_DATABASE_URI. For example, to use PostgreSQL:
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://user:password@localhost:5432/soul_db')

5. **Run the Application:**

python app.py

### Usage

- User Authentication: Register a new account or log in using your credentials.
- Mood Tracking: Enter your mood and optional note, then view a chart of your mood history.
- AI Chat: Interact with the AI assistant on the Chat tab.
- Explore Articles: Search for articles in the Explore section.
- Profile Management: View your profile details, update your username, or delete your acco
