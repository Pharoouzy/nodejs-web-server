// Deploying to real server layer
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();// express App

hbs.registerPartials(__dirname + '/views/partials');// partials are functions you can run from inside your hbs
app.set('view engine', 'hbs');// tells express what view engine to use
// app.set('views', 'hbs');
// express middleware helps u configure how ur express app works
app.use((request, response, next) => {// without using next() pages rendered will not fire up
    // this middleware is to log all request to the server and timestamp for specifying when a particular URL requested
    var now = new Date().toString();
    var logger = `${now}: ${request.method} ${request.url}` + "\r\n";
    fs.appendFile('logger.log', logger, (err) => {
        if(err){
            console.log('Unable to log message to file!');
        }
        else{
            console.log(`${now}: Logged Successfully!`);
        }
    });
    console.log(logger);
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs', {
//         pageTitle: "Maintenance..."
//     });
// });
app.use(express.static(__dirname + '/public'));// setting up express middleware

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});// takes 2 arg, name of the helper and the function to run
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// handler for HTTP GET request
// takes 2 arg, 1st is the url and 2nd is function to run,
// the function tells the express what to send back to the person who makes the request
app.get('/', (request, response) => {
    //response.send('<h1>Hello Express!</h1>'); // sending HTML response
    // response.send({
    //     name: 'Pharoouzy',
    //     likes: [
    //         'Programming',
    //         'Reading'
    //     ]
    // });
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!'
    });
});

app.get('/login', (request, response) => {
    response.render('login.hbs');
});
// /about route
app.get('/about', (request, response) => {
    // response.send('About Page');
    // render let u render any page u've setup with current view engine
   response.render('about.hbs', {
       pageTitle: 'About Page'
   });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle request...'
    });
});

app.listen(7000, () => {
    var now = new Date().toDateString();
    var message = `${now}: Server is running on port 7000...`;
    console.log(message);
}); // bind the app to a port on our machine