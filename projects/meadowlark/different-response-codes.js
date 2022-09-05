const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/about', (req, res) => {
    res.render('about');
});

// 코드 1과 코드 2는 같은 동작
// [코드 1]
app.get('/error', (req, res) => {
    res.status(500);
    res.render('500');
});
// [코드 2]
// app.get('/error', (req, res) => res.status(500).render('500'));


app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/headers\n`));
