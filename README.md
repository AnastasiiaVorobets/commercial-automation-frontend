# Frontend (Angular)

- The frontend of this project is developed using Angular and is organized into several modules and components to handle various aspects of the online store.

## Admin Module
- This module is responsible for the administrative part of the website. It includes components for managing products, sales, and users.

### Components:

- admin-page: The main page of the administrative panel.
- manage-products: Page for managing products (adding, editing, deleting).
- manage-sales: Page for viewing and managing sales.
- manage-users: Page for managing users (adding, editing, deleting).

### Routing: The admin-routing.module.ts file defines the routes for the administrative panel components.

### Auth Module
- This module handles user authentication.

### Components:

- login: Login page for users to access their accounts.
- register: Registration page for new users.
- Routing: The auth-routing.module.ts file defines the routes for authentication components.

### Shop Module
- This module manages the main shopping functionality of the website.

### Components:

- cart: Shopping cart page.
- footer: Footer component of the website.
- header: Header component of the website.
- home: Home page of the store.
- not-found: Page displayed when a non-existent resource is accessed.
- product-detail: Page showing detailed information about a product.
- roduct-list: Page displaying a list of products available for purchase.

### Models
- Models define the structure of data used within the application.

- product.model.ts: Defines the structure for product data.
- sale.model.ts: Defines the structure for sale data.
- user.model.ts: Defines the structure for user data.

### Services
- Services facilitate communication between components and the backend.

- auth.service.ts: Handles user authentication processes.
- cart.service.ts: Manages the shopping cart functionality.
- product.service.ts: Handles operations related to products.
- sale.service.ts: Manages sales operations.
- user.service.ts: Manages user-related operations.

### Interceptors
- auth.interceptor.ts: Adds authentication tokens to HTTP requests to secure endpoints.

### Routing Configuration
- Routing between components is managed using the RouterModule in the respective modules.

### Running the Project
- Clone the repository.
- Install dependencies: npm install.
- Start the project: npm start
- Open http://localhost:4200 in your browser.
