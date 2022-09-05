const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/about', (req, res) => {
    res.render('about');
});

// 평문 렌더링
app.get('/text', (req, res) => {
    res.type('text/plain');
    res.send('this is a test');
});

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/headers\n`));
