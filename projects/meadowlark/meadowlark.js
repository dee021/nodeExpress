const express = require('express')
const exHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', exHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

/*
app.get('/', (req, res) => { // app.get : 라우트(route) 추가
    res.type('text/plain')
    res.send('Meadowlark Travel')
})

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel')
})
*/

// --> 뷰 사용
app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => res.render('about'))

// get -> use
// custom 404 page
app.use((req, res) => { 
    // res.type('text/plain')
    res.status(404)
    // res.send('404 - Not Found')
    res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    // res.type('text/plain')
    res.status(500)
    // res.send('500 - Server Error')
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`
))

