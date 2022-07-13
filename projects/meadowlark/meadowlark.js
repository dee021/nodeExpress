const fortune = require('./lib/fortune');
const express = require('express');
const exHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

const fortunes = ["conquer your fears or they will conquer you.", 
"Rivers need springs.", "Do not fear what you don't know.", 
"You will have a pleasant surprise.", "Whenever possible, keep it simple."];

// 핸들바 뷰 엔진 설정
app.engine('handlebars', exHandlebars({
    defaultLayout: 'main', // 기본 레이아웃 선언
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public')); 
//static 미들웨어 : 하나 이상의 디렉터리를 지정하여 정적 자원을 보관, 클라이언트로 바로 전송(img, .css 등)

/*
app.get('/', (req, res) => { // app.get : 라우트(route) 추가
    res.type('text/plain')
    res.send('Meadowlark Travel') // res.end -> res.send
})

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel')
})
*/

// --> 뷰 사용
app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => {
    // const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    // res.render('about', {fortune: randomFortune});
    res.render('about', { fortune: fortune.getFortune() });
});

// get -> use
// custom 404 page
app.use((req, res) => { 
    // res.type('text/plain')
    res.status(404); // res.writeHead -> res.set, res.status
    // res.send('404 - Not Found')
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message);
    // res.type('text/plain')
    res.status(500);
    // res.send('500 - Server Error')
    res.render('500');
});

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`
));

