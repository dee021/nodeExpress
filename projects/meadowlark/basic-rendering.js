const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

// the following is needed to use views
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// 기본 사용법
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/headers\n`));
