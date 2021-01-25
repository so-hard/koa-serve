import Koa from 'koa'
import json from 'koa-json'
import jwt from 'koa-jwt'
import bodyParser from 'koa-bodyparser'


import User from "./model/user.js"
import  UserAuth from "./model/userAuth.js"
const TOKEN_SECRETKEY = 'secretkey'
const app = new Koa()

// 路由
import { getModel } from './util/index.js'

app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())

// 打印log
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const unPath = [/^\/$/, /public/, /checkName/, /register/, /getIpInfo/, /login/, /test/, /otherLogin/]
const buildFiles = [/\.js$/, /\.css$/, /\.less$/, /\.ico/, /\.json$/, /static/] // 前端打包后不需要验证的资源
app.use(jwt({ secret: TOKEN_SECRETKEY, cookie: 'sessionId' }).unless({ path: unPath.concat(buildFiles) }))

getModel('routes', (route) => {
  app.use(route.routes())
})

 User
 UserAuth

export default app