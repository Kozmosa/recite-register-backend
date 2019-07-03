const fs = require("fs")
const express = require("express")

let dbFile = JSON.parse(fs.readFileSync("./database.json").toString()) // fs reads just a buffer, need toString() to translate it to string

let app = express()

app.get('/', (req, res) => {
  res.write(JSON.stringify(dbFile))
  res.end()
})

// let port = Math.floor(Math.random()*10)*1000;
let port = 9000
app.listen(port, () => {
  console.log(`JSON View Server running on 127.0.0.1:${port.toString()}`);
})
