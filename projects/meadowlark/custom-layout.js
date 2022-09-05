const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/about', (req, res) => {
    res.render('about');
});

// 커스텀 레이아웃을 사용한 뷰렌더링
app.get('/custom-layout', (req, res) =>
    res.render('custom-layout', { layout: 'custom'})
);

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/headers\n`));
