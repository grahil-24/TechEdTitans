const path = require('path');
const express = require('express');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const cookieParser = require('cookie-parser');
const app = express();

//to serve static files
app.use(express.static(path.join(__dirname, 'public'))); // eslint-disable-line

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// parsing data from cookies
app.use(cookieParser());

//setting pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// body parser, reading data from body into req.body. start express app
app.use(
    express.json({
        limit: '10kb', // body having size bigger than 10kb will not be accepted
    })
);

//express passes next() function as the third argument
app.use((req, res, next) => {
    //we have to call the next() function to finish the request-response cycle
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    next();
});

app.use('/', viewRouter);
app.use('/api/users', userRouter);

// app.use(express.json());

// app.use(globalErrorHandler);

module.exports = app;
