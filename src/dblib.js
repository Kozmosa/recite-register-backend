const fs = require('fs')

module.exports.db = class db {
    constructor(filePath) {
        // Get db file
        let dbFile = fs.readFileSync(filePath).toString() // fs reads just a buffer, need toString() to translate it to string
        this.filePath = filePath
        this.content = JSON.parse(dbFile)
    }

    save(filePath, dbContent){
        fs.write(fs.open(filePath, ()=>{}), dbContent)
    }

    tick(student_id, chapter_id) {
        // Student_id example: "20181901", chaper_id example: "6.1"
        this.content.record_configs.records[chapter_id][student_id] = true
        this.save(this.filePath, JSON.stringify(this.content))
        return true;
    }

    cross(student_id, chapter_id) {
        // Student_id example: "20181901", chaper_id example: "6.1"
        this.content.record_configs.records[chapter_id][student_id] = false
        return true;
    }
}