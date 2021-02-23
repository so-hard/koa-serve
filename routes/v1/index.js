import Router from 'koa-router'
import os from 'os'

const router = Router()

router.get('/', async(ctx, next) => {
  ctx.body = os.cpus().map(val=> val.model)
})

router.post('/test', async(ctx, next) => {
  console.log(ctx.request.body)
  // ctx.body = ctx.request.body
  ctx.body = '0000'
})

export default router
