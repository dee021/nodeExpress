const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/about', (req, res) => {
    res.render('about');
});

// 레이아웃을 사용하지 않는 뷰 렌더링
app.get('/no-layout', (req, res) => {
    res.render('no-layout', { layout: null});
});

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/headers\n`));
