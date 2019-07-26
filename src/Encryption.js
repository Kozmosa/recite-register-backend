const crypto = require('crypto')

module.exports.EncryptMD5 = function cryptPwd(source, salt) {
    // 加盐密码的md5值
    const md5 = crypto.createHash('md5')
    return md5.update(source + ':' + salt).digest('hex')
}

module.exports.EncryptBase64 = function(source) {
    // 转换为Base64编码
    source = new Buffer(source)
    return source.toString('base64')
}

module.exports.DecryptBase64 = function(source) {
    // To source string
    source = new Buffer(source, 'base64')
    return source.toString()
}