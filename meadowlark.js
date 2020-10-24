const express = require('express');
const expresshandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');
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

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverError)

// app.listen(port, () => console.log(`Express Started on Localhost ${port}`));

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express Started on Localhost ${port}.`);
    })
} else {
    module.exports = app;
}