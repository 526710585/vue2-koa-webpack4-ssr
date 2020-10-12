const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync(path.join(__dirname,'./public/index.template.html'), 'utf-8')
})

//1.
const server = new Koa()
const router = new Router()

//2.server.use可匹配所有路径
server.use(async (ctx,next)=>{
    //用于render的renderToStrin 第二个参数 在模板中可以插入html或者字符串
    const context = {
        title: 'hello',
        mate: `<meta http-equiv="content-type" content="text/html;charset=utf-8">`,
    }
    const app  = require('./app')(ctx,context)
    console.log('urllllllllll',ctx.url);
    try{
        const html = await renderer.renderToString(app,context)
        ctx.status = 200
        ctx.body = html
    } catch (err){
        console.log(err)
        ctx.status = 500
        ctx.body = 'Internal Server Error'
    }
})

server.use(router.routes()).use(router.allowedMethods())

//3.
server.listen(3000,()=>{
    console.log('启动服务,port:3000');
})