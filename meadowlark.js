const express = require('express');
const expresshandlebars = require('express-handlebars');
const fortune = require('./lib/fortune');
const app = express();

app.engine('handlebars', expresshandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Meadowlark Travel')
})

app.get('/about', (req, res) => {
    res.render('about', { fortune: fortune.getFortune() })
})

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((req, res) => {
    console.error(err.message);
    res.status(500)
    res.render('500')
})



app.listen(port, () => console.log(`Express Started on Localhost ${port}`));