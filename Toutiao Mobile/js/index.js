// import demo1 from './demo1.js'

(function() {
    var Router = function() {
            //初始化路由信息
            this.routes = {}; //保存路由
            this.curUrl = ''; //获取当前hash值
        }
        //初始化
    Router.prototype.init = function() {
            //hashchange专门监听hash的变化
            window.addEventListener('load', this.reloadPage.bind(this));
            window.addEventListener('hashchange', this.reloadPage.bind(this));
        }
        //切割hash，渲染页面
    Router.prototype.reloadPage = function() {
            this.curUrl = location.hash.substring(1) || '/';
            this.routes[this.curUrl]();
        }
        //传入URL 以及根据URL对应的回掉函数
    Router.prototype.map = function(key, callback) {
            this.routes[key] = callback;
        }
        //将其暴露出去
    window.oRou = Router;
})()

var oRouter2 = new oRou();
oRouter2.init(); //调用里面的初始化函数，初始化hashchange事件函数
var content = document.querySelector('#container');
// oRouter2.map('/index', function() {
//     content.innerHTML = '首页'
// });
oRouter2.map('/index', () => {
    $.ajax({
        url: '../container/index_con.html',
        success: (res) => {
            content.innerHTML = res
        }
    })
});
oRouter2.map('/xg_video', () => {
    $.ajax({
        url: '../container/xg_video_con.html',
        success: (res) => {
            content.innerHTML = res
        }
    })
});
oRouter2.map('/send', () => {
        $.ajax({
            url: './demo2.html',
            success: (res) => {
                content.innerHTML = res
            }
        })
    })
    // oRouter2.map('/index', function() { //调用map函数，传入两个参数，一个是路由，一个是回调函数
    //     var oSidebar = document.getElementById("container");
    //     oSidebar.innerHTML = ['<div class="newsCon">',
    //         '<h1>驻港公署：当前香港事态的本质是有人企图颠覆特区政府</h1>',
    //         '<img src="img /new_pic.jpg" alt="">',
    //         '<div class="newInfo clean">',
    //         '<div class="new_hot">',
    //         ' <i></i>',
    //         '<span>人民日报</span>',
    //         '<span>18评论</span>',
    //         '<span>刚刚</span>',
    //         '</div>',
    //         '<div class="err"></div>',
    //         '</div>',
    //         '</div>'
    //     ].join('');

// })
// oRouter2.map('/xg_video', function() { //调用map函数，传入两个参数，一个是路由，一个是回调函数
//     var oSidebar = document.getElementById("container");
//     oSidebar.innerHTML = ['<div class="newsCon">',
//         '<h1>驻港公署：当前香港事态的本质是有人企图颠覆特区政府</h1>',
//         '<img src="img /new_pic.jpg" alt="">',
//         '<div class="newInfo clean">',
//         '<div class="new_hot">',
//         ' <i></i>',
//         '<span>人民日报</span>',
//         '<span>18评论</span>',
//         '<span>刚刚</span>',
//         '</div>',
//         '<div class="err"></div>',
//         '</div>',
//         '</div>',
//         '<div class="newsCon">',
//         '<h1>驻港公署：当前香港事态的本质是有人企图颠覆特区政府</h1>',
//         '<img src="img /new_pic.jpg" alt="">',
//         '<div class="newInfo clean">',
//         '<div class="new_hot">',
//         ' <i></i>',
//         '<span>人民日报</span>',
//         '<span>18评论</span>',
//         '<span>刚刚</span>',
//         '</div>',
//         '<div class="err"></div>',
//         '</div>',
//         '</div>',
//         '<div class="newsCon">',
//         '<h1>驻港公署：当前香港事态的本质是有人企图颠覆特区政府</h1>',
//         '<img src="img /new_pic.jpg" alt="">',
//         '<div class="newInfo clean">',
//         '<div class="new_hot">',
//         ' <i></i>',
//         '<span>人民日报</span>',
//         '<span>18评论</span>',
//         '<span>刚刚</span>',
//         '</div>',
//         '<div class="err"></div>',
//         '</div>',
//         '</div>'
//     ].join('');
// })