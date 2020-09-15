import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import Toast from './Toast';
class Btn extends Component {
    handle() {
        //跳转新的页面
        var seconds = 5;
        var timer = null;
        //开启定时器
        timer = setInterval(show,1000);
        function show(){
            if(seconds===0){
                clearInterval(timer);//清除定时器
                window.location.href = "http://www.baidu.com";
                // this.props.history.push("../New");
                // const w = window.open('about:blank');
                // w.location.href = 'http://www.baidu.com';
                return;
            }
            Toast(seconds+"秒后页面跳转")
            console.log(seconds); 
            seconds--;      
        }}

        render() {
            return (
                <div className="Btn">
                    <button onClick={() => this.handle()} activeClassName="active" className="todo">注册</button>
                </div>
            );
        }
    }

    export default withRouter(Btn) ;

