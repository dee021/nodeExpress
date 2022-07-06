const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serveStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => { // fs.readFile : 지정 내용을 읽고 callback 실행(비동기)
        // __dirname : 현재 실행 중인 스크립트가 존재하는 디렉터리
        if(err) {// error 발생 시
            res.writeHead(500, {'Content-Type' : 'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {'Content-Type' : contentType})
        return res.end(data)
    })
}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch(path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html')
            break
        case '/img/logo.png' :
            serveStaticFile(res, '/public/img/logo.png', 'image/png')
            break
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404)
            break
    }
})

server.listen(port, () => {console.log(`server started on port ${port}; ` + 'press Ctrl-C to terminate....')})