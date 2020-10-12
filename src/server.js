const Vue = require('vue')
const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const renderer = require('vue-server-renderer').createRenderer({
    template:fs.readFileSync(path.join(__dirname,'./public/index.template.html'), 'utf-8')
})

//1.
const app = new Koa()
const router = new Router()

//2.
router.get('/',async (ctx,next)=>{
    const app  = require('./app')(ctx)
    try{
        const html = await renderer.renderToString(app)
        ctx.status = 200
        ctx.body = html
    } catch (err){
        console.log(err)
        ctx.status = 500
        ctx.body = 'Internal Server Error'
    }
})

app.use(router.routes()).use(router.allowedMethods())

//3.
app.listen(3000,()=>{
    console.log('启动服务,port:3000');
})