const mongoose = require('mongoose');
//模板
const Schema = mongoose.Schema;

//实例化数据模板
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    //全球公认图像(非必传)
    avatar: {
        type: String,
    },
    //日期(非必传)
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UserSchema);