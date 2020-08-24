# **koa功能模块**--用户注册登录
- ## **koa、koa-router** --- koa是基于Node.js平台的下一代web开发框架
   - ### *安装*
   ```
   npm install koa koa-router --save
   ```
   - ### *应用* app.js
   ```
   //引入koa、koa-router模块
   const koa = require('koa');
   const Router = require('koa-router');
   //实例化对象
   const app = new koa();
   const router = new Router();
   //配置路由(启动路由)
   /*
    *router.allowedMethods()处理的业务是
    *当所有路由中间件执行完成之后，
    *若ctx.status为空或者返回值为404时，
    *丰富response对象的header头(响应头)
    */
   app.use(router.routes());
   app.use(router.allowedMethods());
   //设置端口号:5000
   const port = process.env.PORT || 5000;
   app.listen(port,()=>{
       console.log(`server started on ${port}`);
   });


   ```
    
- ##  -----
- nodemon         ----- 可在检测到目录中的文件更改时通过自动重新启动节点应用程序
- mongoDB         ----- 在线数据库
- npmjs           ----- Node的模块管理器
- koa-bodyparser  -----后端接收前端数据的模块
- bcryptjs        -----前端数据加密模块
- gravatar        -----  显示全球公认的头像中间件(模块)
- jsonwebtoken    -----  生成token令牌模块
- koa-passport    -----  验证token令牌模块
- passport-jwt    -----  登录验证
