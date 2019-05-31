const fs = require("fs")

let dbFile = JSON.parse(fs.readFileSync("./database.json").toString()) // fs reads just a buffer, need toString() to translate it to string
this.content = dbFile

console.log(dbFile)
console.log(dbFile.record_configs)

dbFile["record_configs"]["records"]["6.1"]["20181901"] = true
dbFile["record_configs"]["records"]["6.1"]["20181902"] = true

// Save
let willSaveContent = JSON.stringify(dbFile)
fs.writeFileSync("./database.json", willSaveContent)
console.log('Save success!')