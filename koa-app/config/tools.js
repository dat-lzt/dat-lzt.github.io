//数据加密
const bcrypt = require("bcryptjs");

const tools = {
    // Usage - Sync(同步用法)
    enbcrypt(password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    //数据加密(异步用法)
    //  await bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(newUser.password, salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         // console.log(hash);
    //         if (err) throw err;
    //         newUser.password = hash;
    //     });
    // });
};

module.exports = tools;