const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/about', (req, res) => {
    res.render('about');
});

// 404 핸들러 추가
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/headers\n`));
