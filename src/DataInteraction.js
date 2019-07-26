const fs = require('fs')
const path = require('path')

const XyDB = require('./XyDB')

module.exports.db = class db {
    constructor(filePath) {
        // Initialize XyDB with argument filePath
        this.XyDB = XyDB.db()
    }

    exit() {
        this.save(this.filePath, JSON.stringify(this.content))
    }

    // Recites regist start
    save(filePath, dbContent){
        fs.writeFile(filePath, dbContent)
    }

    tick(student_id, chapter_id) {
        // Student_id example: "20181901", chaper_id example: "6.1"
        this.content.record_configs.records[chapter_id][student_id] = true
        this.save(this.filePath, JSON.stringify(this.content))
        return true
    }

    cross(student_id, chapter_id) {
        // Student_id example: "20181901", chaper_id example: "6.1"
        this.content.record_configs.records[chapter_id][student_id] = false
        this.save(this.filePath, JSON.stringify(this.content))

        return true
    }

    query_single_chapter (student_id, chapter_id) {
        return this.content.record_configs.records[chapter_id][student_id]
    }


    // User query start
    create_user(user_name, user_password, user_permission) {
        this.content.user_configs.user_names.push(user_name)
        this.content.user_configs.user_passwords.push(user_password)
        this.save(this.filePath, JSON.stringify(this.content))

        return true
    }

    delete_user(user_name) {}

    edit_password(user_name, newPassword, superadmin_password) {
        if (superadmin_password != this.content.user_configs.superadmin_password) {
            return false
        } else if (superadmin_password == this.content.user_configs.superadmin_password) {
            let user_index = this.content.user_configs.user_names.indexOf(this.content.user_configs.user_names[user_name])
            this.content.user_configs.user_passwords[user_index] = newPassword
            this.save(this.filePath, JSON.stringify(this.content))

            return true
        }
    }

    user_login(user_name, user_password) {
        const user_names = this.content.user_configs.user_names
        const user_passwords = this.content.user_configs.user_passwords

        for (let i = 0; i < user_names.length; ++i) {
            if (user_names[i] == user_name) {
                if (user_passwords[i] == user_password) {
                    // flag is true
                    // ...
                    console.log(user_password);
                    return true
                } else {
                    // flag is false
                    console.log(user_password);
                    console.log("false");
                    return false
                }
            }
        }
    }
}
