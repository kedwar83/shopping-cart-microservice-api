# Shopping Cart Microservice API

## Overview
This API allows users to interact with a shopping platform by fetching products, viewing product details, managing a shopping cart, and handling comments.

## Base URL

`http://18.220.85.60/api/`

## Endpoints

### 1. Get Product List
Fetch products based on filters like title, operating system, and price range.

**GET /GetProduct**

**Params (optional):** `title`, `operating_system`, `price_from`, `price_to`

### 2. Get Product Details
Fetch detailed information for a specific product by ID.

**GET /GetOneProduct**

**Params:** `product_id` (required)

### 3. Get Product Comments
Fetch comments for a specific product.

**GET /GetProductComment**

**Params:** `product_id` (required)

### 4. Add Comment
Submit a comment and rating for a product.

**POST /SetComment**

**Params:** `product_id`, `comment`, `score` (all required)

### 5. Add to Cart
Add a product to the shopping cart.

**POST /AddToCart**

**Params:** `product_id`, `email`, `quantity` (all required)

### 6. Go to Cart
Redirect to the shopping cart page after email validation.

**Function:** `toShoppingCart()`

## UI Interaction
- **Product List**: Displayed in a grid format.
- **Product Details**: Shows selected product information.
- **Comments**: View and submit product comments.
- **Shopping Cart**: Add items and view the cart.

## Error Handling
All errors trigger an alert message to the user.

## Dependencies
- **jQuery** for AJAX requests.
- **Bootstrap** for UI components.
