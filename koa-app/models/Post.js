const mongoose = require('mongoose');
//模板
const Schema = mongoose.Schema;

//实例化数据模板
const PostSchema = new Schema({
    user: { //关联数据表
        type: String,
        ref: "users",
        require: true
    },
    text: {
        type: String,
        require: true
    },
    name: {
        type: String,
        // require: true
    },
    //全球公认图像(非必传)
    avatar: {
        type: String,
    },
    //点赞
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text: {
            type: String,
            require: true
        },
        name: {
            type: String,
            // require: true
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

    }],
    //日期(非必传)
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model("post", PostSchema);