const express = require('express');
const expresshandlebars = require('express-handlebars');
const fortune = require('./lib/fortune');
const handlers = require('./lib/handlers');
const app = express();

app.engine('handlebars', expresshandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverError)

app.listen(port, () => console.log(`Express Started on Localhost ${port}`));