//登录表单验证name
const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatLoginInput(data) {
    let errors = {};

    //判断是否是字符串(string)
    //如果是真，返回一个string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = "邮箱不合法";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "邮箱不能为空";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "密码不能为空";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
        errors.password = "密码的长度不能小于六位且不能超过20位";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};