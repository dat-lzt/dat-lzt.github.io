// 思路：
// 1、按钮控制视频播放、获取按钮元素绑定点击事件
// 2、通过video.duration获取视频总时长，并显示出来
// 3、视频开始播放时同步进度条、

var palyer = document.querySelector('.palyer');
var video = palyer.querySelector('video');
var playBtn = palyer.querySelector('.switch');
var progress = palyer.querySelector('.progress');
//当前时间
var currTime = palyer.querySelector('.curr-time');
//总时间
var totalTime = palyer.querySelector('.total-time');
//当前进度条
var currProgress = palyer.querySelector('.curr-progress');
var extend = palyer.querySelector('.extend');
var zTime = 0;
//初始进入页面时进度条显示为0
currProgress.style.width = 0 + '%';
//点击屏幕：暂停/播放
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
video.addEventListener('click', togglePlay);

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
        zTime = Math.ceil(this.duration);
        // zTime = video.duration;
        console.log(zTime);
        //采取向下取整
        // var h = Math.floor(totalTime / 3600);
        // var m = Math.floor(totalTime % 3600 / 60);
        // var s = Math.floor(totalTime % 60);
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

    // 改变进度条的宽度：cTime/zTime
    var value = cTime / zTime;
    // var value = cTime / totalTime;

    currProgress.style.width = value * 100 + "%";
}

//拖动控制进度条
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
console.log(mousedown);

//视频结束触发得事件
// video.addEventListener("ended", function() {
//     video_Status.src = "../images/loading.gif";
// });

extend.addEventListener('click', function() {
    video.webkitRequestFullScreen();
});