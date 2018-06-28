const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
//middlewear lets you configure how your express application works, kind of third-party add-on
//app.use takes the middlewear function you want to use
//views is a default directory that express uses for your templates
//.render will let you render any template that you have set up with the view engine

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  console.log(log);

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


//register a handler/set up a route
//req stores a lot of information about the things coming in(headers, body, methods, path)
//res has a bunch of available methods so we can respond in whatever way we like, customize what data to send back
app.get('/', (req, res) => {

  //responding to the request sending some data back
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Vesna',
  //   likes: [
  //     'Walking',
  //     'Tv shows'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeText: 'Welcome Aboard!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fetch the data.'
  });
});


//bind the application to a port on our machine
//apps that use app.listen never stop, you gotta shut them down manually
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//a partial is a partial piece of your website(eg. header, footer)
