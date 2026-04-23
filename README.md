# Commercial Real Estate Platform

This project is a simplified replica of a commercial real estate website like CBRE.

## Setup Instructions

### Option 1: Manual Setup (Requires Node.js and MongoDB)

1. **Start MongoDB**: Ensure MongoDB is running on `mongodb://localhost:27017`.
2. **Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Option 2: Docker Setup (Recommended)

Run the entire stack with a single command:
```bash
docker-compose up --build
```

## Features
- **Display List**: View properties in a professional card layout.
- **Add Property**: Admin can add new listings.
- **Update Property**: Edit existing property details.
- **Delete Property**: Remove listings from the platform.
- **Investor API**: Read-only access for fetching property data.

## Technologies
- **Frontend**: React (Vite), Vanilla CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
