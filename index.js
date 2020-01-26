const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const KoaRouter = require('koa-router');
const cors = require('@koa/cors');
const app = new Koa();
const route = require('./route/route.js')



app.use(KoaBodyParser()) // ต้องไว้ด้านบน Routes มีไว้รับ Body Method Post
app.use(
    cors({ //ไว้กำหนดสิทธิ Cross Origin Site
        origin: '*',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        exposeHeaders: ['X-Request-Id'],
    }),
)
app.use(route.routes())
app.listen(3000); //ให้รันที่ Port 3000
console.log('Start on port http://localhost:3000/')

// app.listen(appConfig.NODE_PORT)