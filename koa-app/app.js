const koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

//引入users.js
const users = require('./routes/api/users');
//引入profile.js
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//后端接收前端数据的模块
const bodyParser = require('koa-bodyparser');
//验证token令牌模块
const passport = require('koa-passport');

//实例化koa
const app = new koa();
const router = new Router();

app.use(bodyParser());

//路由跳转
router.get("/", async ctx => {
    ctx.body = { msg: 'Hello Koa Interfacesdds' }
});


//连接数据库
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongodb Connectd...");
    })
    .catch(err => {
        console.log(err);
    });

//koa-passport初始化
app.use(passport.initialize());
app.use(passport.session());
//回掉到config文件中 passport.js
require("./config/passport")(passport);

//配置路由地址,当我们访问localhost:5000/api/users时都会进入=>users.js
router.use("/api/users", users);
router.use("/api/profile", profile);
router.use("/api/posts", posts);


//配置路由
app.use(router.routes()).use(router.allowedMethods());


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on ${port}`);
});