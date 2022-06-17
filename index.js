// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const httpLogger = require('./httpLogger');
const logger = require('./logger');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.use(httpLogger);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var webhooksRouter = require('./routes/hooks');

/**
 * Routes Definitions
 */
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/hooks', webhooksRouter);

// app.get("/user", (req, res) => {
//     res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    logger.error("An error occurred: " + err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});