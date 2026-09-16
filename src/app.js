const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const db = require('./core/config/db');
const errorHandler = require('./core/middlewares/error.middleware');

// Routes
const authRoute = require('./modules/auth/auth.route');
const foodRoute = require('./modules/foods/food.route');
const cartRoute = require('./modules/carts/cart.route');
const orderRoute = require('./modules/orders/order.route');
const reviewRoute = require('./modules/reviews/review.route');
const tableRoute = require('./modules/tables/table.route');

const app = express();

// Connect DB
db();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

// Attach req.user for all layout.view if they have token (but no redirect if not logged in)
const jwt = require('jsonwebtoken');
app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
});

// Home route
app.get('/', (req, res) => {
    res.redirect('/foods');
});

// Use Routes
app.use('/', authRoute);
app.use('/', foodRoute);
app.use('/', cartRoute);
app.use('/', orderRoute);
app.use('/', reviewRoute);
app.use('/', tableRoute);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
