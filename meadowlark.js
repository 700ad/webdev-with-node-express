const express = require('express');
const expresshandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const handlers = require('./lib/handlers');
const weatherMiddlware = require('./lib/middleware/weather');
const app = express();

app.engine('handlebars', expresshandlebars({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))
app.set('view engine', 'handlebars');

// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

// app.use(weatherMiddlware)

app.get('/', handlers.home);

app.get('/about', handlers.about);

app.get('/newsletter-signup', handlers.newsLetterSignup);
app.post('/newsletter-signup/process', handlers.newsLetterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsLetterSignupThankYou);

app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsLetterSignup);

app.use(handlers.notFound);

app.use(handlers.serverError);

// app.listen(port, () => console.log(`Express Started on Localhost ${port}`));

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express Started on Localhost ${port}.`);
    });
} else {
    module.exports = app;
}