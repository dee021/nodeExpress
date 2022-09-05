const express = require('express');
const expressHandlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const catNames = require('cat-names');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(cookieParser()); // for cookie support
app.use(session({ resave: false, saveUninitialized: false, secret: 'keyboard cat'})); // for session support

app.get('/about', (req, res) => {
    res.render('about');
});

// 뷰에 쿼리스트링, 쿠키, 세션 값 드의 콘텍스트 전달
app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: 'Hello esteemed programmer!', 
        style: req.query.style,
        userid: req.cookies.userid,
        username: req.session.username
    });
});


app.get('/set-random-userid', (req,res) => {
    res.cookie('userid', (Math.random() * 10000).toFixed(0));
    res.redirect('/greeting');
});

app.get('/set-random-username', (req, res) => {
    req.session.username = catNames.random();
    res.redirect('/greeting');
});

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/headers\n`));
