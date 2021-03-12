import Koa from 'koa'
import json from 'koa-json'
import jwt from 'koa-jwt'
import bodyParser from 'koa-bodyparser'
import { TOKEN_SECRETKEY } from './config/secret.js'
const app = new Koa()

// 路由
import { getModel } from './util/index.js'

app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())

// 打印log
app.use(async(ctx, next) => {
  try {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`) 
  } catch (error) {
    if(error.status === 401) {
      ctx.body = {
        code:error.status,
        msg:error.message
      }
    }
  }
})
const unPath = [/^\/$/, /public/, /checkName/, /register/, /getIpInfo/, /login/, /otherLogin/,/signIn/]
const buildFiles = [/\.js$/, /\.css$/, /\.less$/, /\.ico/, /\.json$/, /static/] // 前端打包后不需要验证的资源



app.use(jwt({secret:TOKEN_SECRETKEY}).unless({ path: unPath.concat(buildFiles)}))

getModel('routes', async (route) => {
  app.use(route.routes())
})


export default app