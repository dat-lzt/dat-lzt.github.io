//评论表单验证name
const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatPostsInput(data) {
    let errors = {};

    //判断是否是字符串(string)
    //如果是真，返回一个string
    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = "text的长度不能小于10位且不能超过300位";
    }
    if (Validator.isEmpty(data.text)) {
        errors.text = "text不合法";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};