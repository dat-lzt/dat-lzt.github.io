const mongoose = require('mongoose');
//模板
const Schema = mongoose.Schema;

//实例化个人信息模板
const ProfileSchema = new Schema({
    user: { //关联数据表
        type: String,
        ref: "users",
        require: true
    },
    handle: {
        type: String,
        require: true,
        max: 40
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    //技能
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
    },
    githubusername: {
        type: String,
    },
    //个人经历
    experience: [{
        current: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String,
        },
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
        },
        description: {
            type: String,
        }
    }],
    //教育经历
    education: [{
        current: {
            type: Boolean,
            default: true
        },
        school: {
            type: String,
            required: true
        },
        //学历
        degree: {
            type: String,
            required: true
        },
        //专业
        fieldofstudy: {
            type: String,
            require: true
        },
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
        },
        //描述
        description: {
            type: String,
        }
    }],
    //社交
    social: {
        wechat: {
            type: String,
        },
        QQ: {
            type: String,
        },
        tengxunkt: {
            type: String,
        },
        wangyikt: {
            type: String,
        }
    },
    //日期(非必传)
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);