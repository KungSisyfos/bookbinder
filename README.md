# 📚 BookBinder

A social book cataloging web application designed to help readers organize their personal libraries, discover new books, and connect with fellow book lovers.

## 🎯 Project Overview

BookBinder allows users to catalog their book collections through ISBN scanning or manual entry, create wishlists, write reviews, and share their reading journey with others. Built as a full-stack portfolio project demonstrating modern web development practices.

## Features

- **ISBN Scanner** - Scan book barcodes using your phone camera for quick cataloging
- **Personal Library** - Track and organize books you own
- **Reviews & Ratings** - Write detailed reviews and rate books
- **Wishlist Management** - Create and manage your reading wishlist
- **Social Features** - View other users' libraries and reviews
- **Review Interactions** - Like and engage with reviews from other readers
- **Privacy Controls** - Choose to make your wishlists and library public or private
- **Secure Authentication** - JWT-based authentication system

## 🛠️ Tech Stack

**Frontend:**
- Svelte
- TypeScript
- TailwindCSS

**Backend:**
- Node.js
- Express.js
- JWT for authentication
- RESTful API architecture

**Database:**
- PostgreSQL

**External Services:**
- ISBN/Book Data API (TBD)

## 🏗️ Project Structure

```
bookbinder/
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── models/      # Database models
│   │   ├── middleware/  # Auth, validation, etc.
│   │   └── utils/       # Helper functions
│   └── package.json
├── frontend/             # Web application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/    # API calls
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- SQL database (PostgreSQL)

### Installation

```bash
# Clone the repository
git clone https://github.com/KungSisyfos/bookbinder.git
cd bookbinder

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/bookbinder

# JWT Secrets (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your_generated_secret_key_here
JWT_REFRESH_SECRET=your_generated_refresh_secret_key_here

# API Keys
BOOKS_API_KEY=your_books_api_key_from_provider

# Server
PORT=3000
NODE_ENV=development
```

### Running the Application

```bash
# Start backend server
cd backend
npm run dev

# Start frontend (in another terminal)
cd frontend
npm run dev
```

## 📱 API Endpoints (Planned)

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh

Books:
GET    /api/books
POST   /api/books
GET    /api/books/:id
PUT    /api/books/:id
DELETE /api/books/:id

Reviews:
GET    /api/reviews
POST   /api/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
POST   /api/reviews/:id/like

Wishlist:
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:id

Users:
GET    /api/users/:id/books
GET    /api/users/:id/reviews
GET    /api/users/:id/wishlist
```

## 🎯 Development Roadmap

- [ ] Backend API setup with Express
- [ ] Database schema design and implementation
- [ ] JWT authentication system
- [ ] Frontend framework setup
- [ ] ISBN scanning functionality
- [ ] Book cataloging features
- [ ] Review system
- [ ] Wishlist management
- [ ] Social features (user profiles, following)
- [ ] Privacy settings
- [ ] Search and filtering
- [ ] Responsive design for mobile
- [ ] API documentation
- [ ] Unit and integration tests
- [ ] Deployment

## 🔐 Security

- Passwords hashed with bcrypt
- JWT tokens with expiration
- HTTP-only cookies for refresh tokens
- Input validation and sanitization
- SQL injection prevention
- CORS configuration

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue if you spot any bugs or have ideas for improvements.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@KungSisyfos](https://github.com/KungSisyfos)
- Portfolio: philipandersson.dev
- LinkedIn: [Philip Andersson (https://www.linkedin.com/in/philip-andersson-022549228/)]

---

*This project is being developed as a portfolio piece to demonstrate full-stack web development skills, including API design, authentication, database management, and modern frontend development.*
