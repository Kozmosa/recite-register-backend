const express = require('express')
const db = require('./src/dblib')

// init
let database = new db.db('./data/database.json')

let app = express()
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'application/json');
  res.header('Access-Control-Allow-Credentials',true);
  next();
};

app.use(allowCrossDomain);//运用跨域的中间件

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
    const user_name = req.query.user_name
    const user_password = req.query.user_password
    let user_flag = database.user_login(user_name, user_password)
    let response = {
        'code': 200,
        'msg': 'success',
        'user_flag': user_flag
    }
    res.jsonp(response)
})

app.listen(8080, () => {
    console.log(`Server running on port 8080`)
})
