# TechStore — Angular SPA Project

TechStore is an e-commerce Single Page Application where users can browse, create, and manage tech products (phones, laptops, tablets, accessories). Guest users can view the catalog and product details. Registered users can create their own products, edit and delete them, add products to favorites, and post comments.

## Tech Stack

- **Frontend:** Angular 19, TypeScript, RxJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Session-based via HTTP-only cookies (no token stored in localStorage)

## Setup Requirements

Before running the project you need:

- **Node.js** installed
- **MongoDB** running locally on the default port (`mongodb://localhost:27017`)
- (Optional) Create a `.env` file in `server/Rest-api/` with:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/techstore
```

If no `.env` is provided, the app uses the default values above.

## How to Run

> ⚠️ **Start the backend first, then the frontend.**

### 1. Start the Backend

```bash
cd server/Rest-api
npm install
npm start
```

Server runs on `http://localhost:3000`

### 2. Start the Frontend

```bash
cd client
npm install
ng serve
```

App runs on `http://localhost:4200`

## Test Accounts

You can use these accounts to test the application:

| # | Email | Password |
|---|-------|----------|
| 1 |test1@gmail.com|Test1234|
| 2 |test2@gmail.com|Test4321|

## Features

### Guest Users (no login required)
- Browse all products in the Catalog (with search and category filter)
- View full product details and comments
- Register and Login

### Registered Users
- Create new products with name, price, category, image and description
- Edit and delete their own products (from the product details page)
- View all their own products in My Products
- Add and remove products from Favorites
- Post comments on any product
- Stay logged in after page refresh

### UX / Technical
- Global loading spinner on every HTTP request
- Toast notifications for success and error actions
- Confirm dialog before deleting a product
- Autofocus on first form field (login, register)
- Empty state messages on all list pages
- Responsive layout

## Application Structure

```
client/                   # Angular frontend
  src/app/
    core/                 # Guards, interceptors, services
    features/             # Page components (catalog, home, product-details, etc.)
    layout/               # Header, Footer
    shared/               # Reusable components, pipes, directives, interfaces

server/Rest-api/          # Node.js + Express backend
  controllers/            # Route handlers
  models/                 # Mongoose schemas
  router/                 # API routes
  config/                 # DB and app configuration
```

## API Base URL

```
http://localhost:3000/api
```

## Angular Features Used

- Standalone components with Signal-based state
- Route guards (`authGuard` for private, `guestGuard` for login/register)
- HTTP interceptors (credentials, global loading)
- Reactive Forms with custom validators (`emailValidator`, `passwordsMatchValidator`)
- Custom pipe (`TruncatePipe`)
- Custom directive (`AutofocusDirective`)
- RxJS operators: `finalize`, `tap`, `catchError`
- Lifecycle hooks: `ngOnInit`, `ngAfterViewInit`
