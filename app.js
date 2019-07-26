const express = require('express')
const db = require('./src/dblib')
const BodyParser = require('body-parser')

// init
let database = new db('./data/database.json')
const Encryption = require('./src/Encryption')

let app = express()
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'application/json');
  res.header('Access-Control-Allow-Credentials',true);
  next();
};

app.use(allowCrossDomain);//运用跨域的中间件
app.use(BodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    // Root Directory
    console.log('Get root')
    res.jsonp({'code':200, 'msg':'Welcome!'})
    res.end()
})

app.get('/record/tick', (req, res) => {
    let student_id = req.query.student_id
    let chapter_id = req.query.chapter_id
    database.tick(student_id, chapter_id)
    res.jsonp({'code':200, 'msg': 'Tick success!'})
    res.end()
})

app.get('/record/delete', (req, res) => {})

app.get('/record/edit', (req, res) => {})

app.get('/record/query', (req, res) => {
    let is_recite = database.query_single_chapter(req.query.student_id, req.query.chapter_id)
    let response = {
        'code': 200,
        'msg': 'success',
        'is_recite': is_recite
    }

    res.jsonp(response)
    res.end()
})

app.get('/user/login', (req, res) => {
    // Login
    const user_name = Encryption.DecryptBase64(req.query.user_name)
    const user_password = Encryption.DecryptBase64(req.query.user_password)
    let user_flag = database.user_login(user_name, user_password)
    let response = {
        'code': 200,
        'msg': 'success',
        'user_flag': user_flag
    }
    res.jsonp(response)
})

app.post('/user/login', (req, res) => {
    // Encryption User Login Interface
    const username = req.body.username
    const password = req.body.password
    /**
     * Attention: !! Important !!
     * This 'password' is MD5 encrypted password
     * The real password in that database is encrypted, too
     * So be careful, THIS IS NOT REAL CLEAR PASSWORD!!!
     */
    res.jsonp({
        code: 200,
        msg: 'success',
        loginCorrect: database.user_login(username, password)
        /**
         * Here using database.user_login() method on database object to 
         * connect database.
         * Have to be aware is, the database object is required from the file names 'dblib.js', 
         * and the dblib.js is a connector to interact with json file in data directory names 'database.json'
         */
    })
})

app.listen(8080, () => {
    console.log(`Server running on port 8080`)
})
