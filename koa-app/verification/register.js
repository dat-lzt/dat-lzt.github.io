//注册表单验证name
const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatRegisterInput(data) {
    let errors = {};

    //判断是否是字符串(string)
    //如果是真，返回一个string
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    //当验证为不正常时，返回true执行一下代码，否则false
    if (!Validator.isLength(data.name, { min: 2, max: 8 })) {
        errors.name = "名字长度不能小于两位且不能超过30位"
    }
    // 检查字符串的长度是否为零(isEmpty是validator中的一个方法)
    if (Validator.isEmpty(data.name)) {
        errors.name = "名字不能为空";
    }
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
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "密码2不能为空";
    }
    //equals:检查字符串是否与比较匹配
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "两次密码不一致";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};