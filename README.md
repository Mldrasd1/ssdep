# MOULOUD E-Commerce website

A modern, full-stack e-commerce application built with Next.js 15, featuring a complete shopping experience with product browsing, cart management, checkout, order tracking, and more.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=flat&logo=node.js)

## Features

### Shopping Experience

- **Product Catalog**: Browse through a wide range of products with detailed information
- **Smart Search & Filter**: Find products quickly with intuitive search functionality
- **Product Details**: View comprehensive product information, ratings, and pricing

### Cart Management

- **Dynamic Cart**: Add, update, and remove items with real-time updates
- **Quantity Control**: Easily adjust product quantities
- **Cart Persistence**: Your cart stays saved across sessions
- **Price Calculation**: Automatic price and tax calculations

### Checkout & Delivery

- **Flexible Delivery Options**: Choose from multiple shipping methods
- **Delivery Date Estimation**: See estimated delivery dates before purchase
- **Secure Checkout**: Streamlined checkout process
- **Order Summary**: Review complete order details before confirming

### Order Management

- **Order History**: View all past orders with complete details
- **Order Tracking**: Real-time package tracking with progress indicators
- **Reorder**: Quickly add previous purchases back to cart
- **Order Details**: Access detailed information for each order

### User Interface

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean and intuitive interface
- **Fast Navigation**: Smooth page transitions and routing
- **Loading States**: Elegant loading indicators for better UX

## Architecture

### Frontend (Next.js 15)

```
src/
├── app/
│   ├── page.js              # Homepage with product listings
│   ├── checkout/            # Checkout process
│   ├── orders/              # Order history
│   ├── tracking/            # Package tracking
│   └── components/          # Reusable components
│       ├── header.js        # Navigation header
│       ├── CartContext.js   # Global state management
│       └── *.css            # Component styles
└── utils/
    └── FormatePrices.js     # Price formatting utilities
```

### Backend (Node.js + Express)

```
backendModules/
├── server.js                # Express server
├── models/                  # Database models
│   ├── Product.js
│   ├── CartItem.js
│   ├── Order.js
│   └── DeliveryOption.js
├── routes/                  # API endpoints
│   ├── products.js
│   ├── cartItems.js
│   ├── orders.js
│   └── deliveryOptions.js
└── backend/                 # Data storage
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Mldrasd1/ssdep.git
cd ssdep
```

2. **Install frontend dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd backendModules
npm install
cd ..
```

4. **Start the backend server**

```bash
cd backendModules
node server.js
```

Backend will run on `http://localhost:3001`

5. **Start the development server**

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Tech Stack

### Frontend

- **Framework**: Next.js 15.5.4 with App Router
- **UI Library**: React 19.1.0
- **HTTP Client**: Axios 1.8.4
- **Date Handling**: Day.js 1.11.13
- **Styling**: CSS Modules + Tailwind CSS 4
- **State Management**: React Context API

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Sequelize ORM with SQLite
- **API**: RESTful architecture
- **Data Format**: JSON

### Development Tools

- **Linting**: ESLint with Next.js config
- **Testing**: Vitest 3.1.2
- **Build Tool**: Turbopack (Next.js 15)

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart

- `GET /api/cart-items` - Get cart items
- `POST /api/cart-items` - Add item to cart
- `PUT /api/cart-items/:id` - Update cart item
- `DELETE /api/cart-items/:id` - Remove cart item

### Orders

- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order

### Delivery Options

- `GET /api/delivery-options` - Get available delivery options

### Payment

- `GET /api/payment-summary` - Get payment summary

## Key Features Implementation

### Context API for State Management

The application uses React Context API to manage global state:

- Cart items synchronization
- Order management
- Delivery options
- Payment calculations

### Dynamic Routing

- Product pages with dynamic IDs
- Order tracking with query parameters
- Nested layouts for consistent UI

### Real-time Updates

- Cart updates reflect immediately across all pages
- Order status tracking with progress indicators
- Automatic price calculations

## Pages Overview

| Page     | Route       | Description                            |
| -------- | ----------- | -------------------------------------- |
| Home     | `/`         | Product catalog and shopping interface |
| Checkout | `/checkout` | Cart review and checkout process       |
| Orders   | `/orders`   | Order history and management           |
| Tracking | `/tracking` | Real-time package tracking             |

## Development

### Build for Production

```bash
npm run build
npm start
```

### Run Linting

```bash
npm run lint
```

### Testing

```bash
npm test
```

## Configuration

### Backend Configuration

The backend server is hosted on Render and accessible at:

```
https://backendmodules.onrender.com
```

To use a local backend, update the API URLs in the components.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Author

**Mouloud**

- GitHub: [@Mldrasd1](https://github.com/Mldrasd1)

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment platform
- All contributors and supporters

---

Built with Next.js and Node.js
