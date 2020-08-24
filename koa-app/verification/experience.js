//个人信息表单验证
const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatExperienceInput(data) {
    let errors = {};

    //判断是否是字符串(string)
    //如果是真，返回一个string
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = "title不能为空";
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = "company不能为空";
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = "from不能为空";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};