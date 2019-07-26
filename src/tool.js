class Tool {
    constructor(database) {
        // Constructor
        this.db = database
    }

    regist_user(user_name, user_password) {
        console.log(this.content);
        this.db.content.user_configs.user_names.push(user_name)
        this.db.content.user_configs.user_passwords.push(user_password)

        return true
    }

    EncryptDB() {
        console.log("开始加密数据库......")
        console.log(this.db.content.user_configs.user_passwords)
        for(let i = 0; i < this.db.content.user_configs.user_passwords.length; i++) {
            const encryptedPassword = global.Encryption_instance.EncryptMD5(this.db.content.user_configs.user_passwords[i], global._global.md5_salt)
            this.db.content.user_configs.user_passwords[i] = encryptedPassword
            console.log("The user index " + i + "'s encrypted password is " + encryptedPassword)
        }
    }

    
}

// main
console.log("欢迎使用XyDB管理工具 ver0.1!");
try {
    const db = require('./dblib')
    let database = new db.db('../data/database.json')
    global.tool_instance = new Tool(database)
    global.Encryption_instance = require('./Encryption')
    global._global = require('../config/env')
} catch (e) {
    console.log("程序缺少必要的运行支持库，具体错误信息如下：")
    console.log(e)
}

global.tool_instance.EncryptDB()