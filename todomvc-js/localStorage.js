(function() {
    var model = window.model;
    var storage = window.localStorage;

    model.init = function(callback) {
        //读取储存变量名TodoMvc-Js的值
        var data = storage.getItem(model.TOKEN);
        try {
            if (data)
            //把字符串转换成JSON对象
                model.data = JSON.parse(data);
        } catch (e) {
            //try报错时走这，保存空字符串
            storage.setItem(model.TOKEN, '');
            console.error(e);
        }
        if (callback)
            callback();
    };
    model.flush = function(callback) {
        try {
            //首先将model.data转化成字符串
            //然后用localStorage保存转化好的字符串
            storage.setItem(model.TOKEN, JSON.stringify(model.data));
        } catch (e) {
            console.error(e);
        }
        if (callback)
            callback();
    }
})();