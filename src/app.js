const Vue = require('vue')
// const renderer = require('vue-server-renderer').createRenderer()
// const App = require()

module.exports = function createVue(ctx,context) { 
    return new Vue({
        data:{
            url:ctx.url,
            title:'hello',
        },
        template:`<div>hello 访问的url是: {{ url }}</div>`
    })
 }