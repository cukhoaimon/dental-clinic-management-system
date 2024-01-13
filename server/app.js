const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors(
    {
        origin: ['http://localhost:5173', 'http://localhost:5174'],
        credentials: true
    }
));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// FOR ALL USER
app.use('/medicines', require('./routes/medicineRoutes'));


// FOR ADMIN
app.use('/users', require('./routes/userRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/dentists', require('./routes/dentistRoutes'));
app.use('/employees', require('./routes/employeeRoutes'));

module.exports = app;
