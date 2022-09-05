const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/bad-bad-not-good', (req, res) => {
    // we're going to simulate something bad happening in your code....
    throw new Error("that didn't go well!");
  });

// 오류 핸들러 추가
app.use((err, req, res, next) => { // 사용하지 않더라도 next가 있어야 익스프레스가 오류 핸들러를 인식
    console.error('**SERVER ERROR: ' + err.message);
    res.status(500).render('error', {
        message: "you shouldn't have clicked that!"
    });
});

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/headers\n`));
