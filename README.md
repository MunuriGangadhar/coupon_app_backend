
# Coupon App Backend

A Node.js/Express backend with MongoDB for distributing and managing coupons.

## Setup
1. **Navigate to Backend**:
   ```bash
   cd server
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   - Create a `.env` file in `server/` with:
     ```
     MONGO_URI=mongodb://localhost:27017/coupon-app
     JWT_SECRET=your-secret-key
     PORT=5000
     ```
   - Replace `MONGO_URI` with your MongoDB connection string if using MongoDB Atlas.
4. **Start the Server**:
   ```bash
   npm start
   ```
   - Runs on `http://localhost:5000`.

## How to Use

### Support Admin Login
- The admin is hardcoded:
  - **Username**: `admin`
  - **Password**: `securepass123`
- When the frontend sends these credentials to `POST /api/admin/login`, a token is returned for admin access.

### Manage Coupons
- The backend handles:
  - Coupon claims via `GET /api/claim-coupon`.
  - Adding coupons via `POST /api/admin/coupons` (admin only).
  - Toggling coupons via `PUT /api/admin/coupons/:id` (admin only).
  - Listing coupons and claims via `GET /api/admin/coupons` and `GET /api/admin/claims` (admin only).

## Features
- **Coupon Distribution**: Round-robin assignment with abuse prevention (IP/cookie tracking).
- **Admin Management**: Secure endpoints for coupon and claim oversight.

## Notes
- Ensure MongoDB is running locally or via Atlas.
- The frontend at `http://localhost:3000` relies on this backend.
```

