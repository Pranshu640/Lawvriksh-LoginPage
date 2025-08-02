# LawVriksh Application

A modern web application for the creator economy with React + TypeScript frontend and FastAPI backend.

## 🏗️ Project Structure

```
lawvriksh-application/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main API application
│   └── requirements.txt    # Python dependencies
├── src/                    # React frontend source
│   ├── components/         # React components
│   └── ...
├── public/                 # Static assets
├── .env.sample            # Environment variables template
└── package.json           # Node.js dependencies
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **MySQL** database server
- **npm** or **yarn** package manager

### 1. Database Setup

Create a MySQL database and user:

```sql
-- Create database
CREATE DATABASE lawvriksh_db;

-- Create user table
USE lawvriksh_db;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    passcode VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample user for testing
INSERT INTO users (email, passcode) VALUES 
('test@example.com', '1234'),
('user@lawvriksh.com', '5678');
```

### 2. Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   # Copy the sample environment file
   cp ../.env.sample ../.env
   
   # Edit .env file with your database credentials
   ```
   
   Update `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=lawvriksh_db
   ```

5. **Start the backend server:**
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   
   Backend will be available at: `http://localhost:8000`

### 3. Frontend Setup

1. **Navigate to project root:**
   ```bash
   cd ..  # if you're in backend directory
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   Frontend will be available at: `http://localhost:5173`

## 🔧 Development

### Frontend Development
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** CSS with custom fonts (Playfair Display, Verdana, Roboto, Libre Baskerville)
- **Proxy:** API calls to `/api/*` are proxied to `http://localhost:8000`

### Backend Development
- **Framework:** FastAPI
- **Database:** MySQL with mysql-connector-python
- **Authentication:** Simple passcode-based (for demo purposes)

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Backend:**
```bash
uvicorn main:app --reload          # Development server
uvicorn main:app --host 0.0.0.0    # Production server
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    passcode VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Note:** In production, passcodes should be properly hashed using libraries like `passlib` or `bcrypt`.

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=lawvriksh_db
```

## 📱 Features

- **Responsive Design:** Optimized for both desktop and mobile devices
- **Modern UI:** Clean, professional interface with custom typography
- **Authentication:** Email and passcode-based login system
- **API Integration:** RESTful API with FastAPI backend
- **Type Safety:** Full TypeScript support

## 🚀 Production Deployment

### Frontend
```bash
npm run build
# Deploy the 'dist' folder to your web server
```

### Backend
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production ASGI server
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Verify MySQL server is running
   - Check database credentials in `.env` file
   - Ensure database and table exist

2. **Frontend API Calls Failing:**
   - Ensure backend server is running on port 8000
   - Check Vite proxy configuration in `vite.config.ts`

3. **Font Loading Issues:**
   - Fonts are loaded from Google Fonts CDN
   - Check internet connection for font loading

### Test Credentials
- Email: `test@example.com`
- Passcode: `1234`

## 📄 License

This project is private and proprietary to LawVriksh.
