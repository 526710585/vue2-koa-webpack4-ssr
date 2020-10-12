const Vue = require('vue')
const Koa = require('koa')
const Router = require('koa-router')
const renderer = require('vue-server-renderer').createRenderer()

//  第 1 步：创建koa、koa-router 实例
const app = new Koa()
const router = new Router()

// 第 2 步：路由中间件
router.get('/', async (ctx, next) => {
  // 创建Vue实例
  const app = new Vue({
    data: {
      url: ctx.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  // 有错误返回500,无错误返回html结构
  try {
    const html = await renderer.renderToString(app)
    ctx.status = 200
    ctx.body = `
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.body = 'Internal Server Error'
  }
})
//若ctx.status为空或者404的时候,丰富response对象的header头
app
  .use(router.routes())
  .use(router.allowedMethods())

// 第 3 步：启动服务，通过http://localhost:3000/访问
app.listen(3000, () => {
  console.log(`server started at localhost:3000`)
})
