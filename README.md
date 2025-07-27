# ApniMandi - Stock Management System

This is a full-stack application for managing stock/inventory for suppliers. The frontend is built with React and the backend with Node.js/Express.

## What was Fixed

### Frontend (Stockpage.jsx)
1. **API Endpoint Issues**: Fixed incorrect API calls and ensured proper connection with backend
2. **Data Type Validation**: Added proper validation for quantity and price fields (must be numbers)
3. **Error Handling**: Improved error handling with user-friendly messages and console logging
4. **UI Improvements**: 
   - Replaced broken image paths with inline SVG icons
   - Added confirmation dialogs for delete operations
   - Added success messages for CRUD operations
   - Improved loading and empty states
5. **Form Validation**: Added client-side validation for numeric inputs
6. **Data Mapping**: Fixed inconsistent field mapping (product/name, price/rate)

### Backend
1. **Route Fixes**: Fixed console.log statement in update route
2. **API Endpoints**: All CRUD operations are properly implemented:
   - `POST /api/v1/stock/stock` - Add new stock item
   - `GET /api/v1/stock/all` - Get all stock items
   - `PUT /api/v1/stock/update/:id` - Update stock item
   - `DELETE /api/v1/stock/delete/:id` - Delete stock item
   - `GET /api/v1/stock/find/:id` - Get specific stock item

## How to Run

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with:
   ```
   PORT=3001
   ```

4. Start the backend server:
   ```bash
   node app.js
   ```
   or with nodemon for development:
   ```bash
   npx nodemon app.js
   ```

### Frontend Setup
1. Navigate to the FRONTEND directory:
   ```bash
   cd FRONTEND
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

### Stock Management
- **Add Stock Items**: Add new raw materials with name, quantity, and price
- **View Stock**: Display all stock items in a responsive table
- **Edit Stock**: Update existing stock items
- **Delete Stock**: Remove stock items with confirmation
- **Real-time Updates**: Changes reflect immediately in the UI

### User Experience
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Client-side validation for all inputs
- **Error Handling**: Clear error messages for failed operations
- **Loading States**: Visual feedback during API calls
- **Success Feedback**: Confirmation messages for successful operations

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/stock/stock` | Add new stock item |
| GET | `/api/v1/stock/all` | Get all stock items |
| PUT | `/api/v1/stock/update/:id` | Update stock item |
| DELETE | `/api/v1/stock/delete/:id` | Delete stock item |
| GET | `/api/v1/stock/find/:id` | Get specific stock item |

## Database Schema

```javascript
{
  product: String (required),
  quantity: Number (required),
  price: Number (required),
  timestamps: true
}
```

## Technologies Used

### Frontend
- React 18
- Vite
- Axios for API calls
- CSS3 with custom styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- Environment variables with dotenv 