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
}

// main
const db = require('./dblib')
let database = new db.db('../data/database.json')
const tool_example = new Tool(database)
let result = tool_example.regist_user('zouyuxin', 'zouyuxin')
console.log(result);
