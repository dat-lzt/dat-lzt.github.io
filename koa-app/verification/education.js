//个人信息表单验证
const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatEducationInput(data) {
    let errors = {};

    //判断是否是字符串(string)
    //如果是真，返回一个string
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if (Validator.isEmpty(data.school)) {
        errors.school = "school不能为空";
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = "degree不能为空";
    }

    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = "fieldofstudy不能为空";
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = "from不能为空";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};