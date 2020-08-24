//个人信息表单验证
const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatProfileInput(data) {
    let errors = {};

    //判断是否是字符串(string)
    //如果是真，返回一个string
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = "handle的长度不能小于2位且不能超过40位";
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "status不能为空";
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = "skills不能为空";
    }

    if (!Validator.isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'URL不合法';
        }
    }

    if (!Validator.isEmpty(data.tengxunkt)) {
        if (!Validator.isURL(data.tengxunkt)) {
            errors.tengxunkt = 'tengxunkt不合法'
        }
    }

    if (!Validator.isEmpty(data.wangyikt)) {
        if (!Validator.isURL(data.wangyikt)) {
            errors.wangyikt = 'wangyikt不合法'
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};