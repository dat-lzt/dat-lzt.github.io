// 思路：
// 1、按钮控制视频播放、获取按钮元素绑定点击事件
// 2、通过video.duration获取视频总时长，并显示出来
// 3、视频开始播放时同步进度条、


var video = document.querySelector('video');
var playBtn = document.querySelector('.switch');
//当前时间
var currTime = document.querySelector('.curr-time');
//总时间
var totalTime = document.querySelector('.total-time');
//当前进度条
var currProgress = document.querySelector('.curr-progress');
var extend = document.querySelector('.extend');
var zTime = 0;


playBtn.addEventListener('click', function() {
    if (video.paused) {
        video.play();
        //切换图标
        this.classList.remove('icon-play');
        this.classList.add('icon-pause');
    } else {
        video.pause();
        //切换图标
        this.classList.remove('icon-pause');
        this.classList.add('icon-play');
    }
});

//在视频准备播放时执行
video.oncanplay = function() {
        //获取总时长/s
        zTime = video.duration;
        console.log(zTime);

        //采取向下取整
        var h = Math.floor(zTime / 3600);
        var m = Math.floor(zTime % 3600 / 60);
        var s = Math.floor(zTime % 60);
        // console.log(h);
        // console.log(m);
        // console.log(s);

        //把数据转换成00:00:00
        h = h >= 10 ? h : "0" + h;
        m = m >= 10 ? m : "0" + m;
        s = s >= 10 ? s : "0" + s;
        console.log(h);
        console.log(m);
        console.log(s);

        //显示出来
        totalTime.innerHTML = h + ":" + m + ":" + s;

    }
    //在当前位置改变时执行
video.ontimeupdate = function() {
    //获取视频播放的当前位置（以秒记）
    var cTime = video.currentTime;
    var h = Math.floor(cTime / 3600);
    var m = Math.floor(cTime % 3600 / 60);
    var s = Math.floor(cTime % 60);

    // console.log(cTime);
    // console.log("dq" + h);
    // console.log("dq" + m);
    // console.log("dq" + s);
    //            把数据格式转成 00:00：00
    h = h >= 10 ? h : "0" + h;
    m = m >= 10 ? m : "0" + m;
    s = s >= 10 ? s : "0" + s;
    currTime.innerHTML = h + ":" + m + ":" + s;

    //改变进度条的宽度：cTime/zTime
    var value = cTime / zTime;
    currProgress.style.width = value * 100 + "%";
}

extend.addEventListener('click', function() {
    video.webkitRequestFullScreen();
});