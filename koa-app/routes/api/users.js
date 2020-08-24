const Router = require("koa-router");
const router = new Router();
const bcrypt = require("bcryptjs");
//全球公认头像
const gravatar = require("gravatar");
//生成token令牌模块
const jwt = require("jsonwebtoken");
//引入模板User
const User = require("../../models/User");
//引入加密模块
const tools = require("../../config/tools");
const keys = require("../../config/keys");
const passport = require("koa-passport");
//引入input验证
const validatRegisterInput = require("../../verification/register");
const validatLoginInput = require("../../verification/login");


/**
 * @route GET api/users/test(请求接口)
 * @desc 测试接口地址
 * @access 接口是公开的
 */
//test
router.get("/test", async ctx => {
    ctx.status = 200;
    ctx.body = { msg: 'users works...' };
});

/**
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post("/register", async ctx => {
    // console.log(ctx.body = ctx.request.body);

    //表单验证
    const { errors, isValid } = validatRegisterInput(ctx.request.body);
    //判断是否通过
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }


    //从前端获取的信息存取到数据库中
    //1、先查找数据库中是否已存在相关数据
    const findResult = await User.find({ name: ctx.request.body.name }, { email: ctx.request.body.email });
    // console.log(findResult)
    if (findResult.length > 0) {
        ctx.status = 500;
        ctx.body = { eamil: '用户或邮箱已存在' };
    } else {
        const avatar = gravatar.url(ctx.request.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        //未查询到
        //实例化模型
        const newUser = new User({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            avatar,
            password: tools.enbcrypt(ctx.request.body.password)
        });
        // console.log(newUser);

        //存储到数据库
        await newUser.save()
            .then(user => {
                ctx.body = user;
            })
            .catch(err => {
                console.log(err);
            });

        //返回JSON数据
        ctx.body = newUser;
    }
});

/**
 * @route POST api/users/login
 * @desc  登录接口地址 返回token值
 * @access 接口是公开的
 */
router.post("/login", async ctx => {

    //表单验证
    const { errors, isValid } = validatLoginInput(ctx.request.body);
    //判断是否通过
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }

    //查询
    const findResult = await User.find({ email: ctx.request.body.email });
    const user = findResult[0];
    const password = ctx.request.body.password;
    //查询结果
    if (findResult.length == 0) {
        ctx.status = 404;
        ctx.body = { email: '用户不存在' };
    } else {
        //查询结果为真时,验证密码
        var result = await bcrypt.compareSync(password, user.password); // true
        //验证通过
        if (result) {
            //返回生成token令牌
            const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                }
                //jwt.sign(内容,Key,过期时间)
            const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });

            ctx.status = 200;
            ctx.body = { success: true, token: 'Bearer ' + token };
        } else {
            ctx.status = 400;
            ctx.body = { password: '密码错误！' };
        }
    }
});

/**
 * @route GET api/users/current
 * @desc  用户信息接口地址 返回用户信息
 * @access 接口是私密的、登录之后才显示
 */
//.get(" ","token验证",)
router.get("/current",
    passport.authenticate(
        'jwt', { session: false }),
    async ctx => {
        ctx.body = {
            id: ctx.state.user.id,
            name: ctx.state.user.name,
            email: ctx.state.user.email,
            avatar: ctx.state.user.avatar
        };
    });

module.exports = router.routes();