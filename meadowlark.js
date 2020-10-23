const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

app.use((req, res) => {
    console.error(err.message);
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(port, () => console.log(`Express Started on Localhost ${port}`));