import Router from 'koa-router'

import { register, login } from '../controller/user.js'
import { getTokenFromDatrix } from '../controller/other.js'

const router = Router()
const handleRes = (ctx, next, res) => {
  if (res.code === 200) {
    ctx.body = res
  } else {
    ctx.code = res.code
    ctx.body = res
  }
}
router.prefix('/user')

router.post('/register', async(ctx, next) => {
  const { username, password } = ctx.request.body
  let res
  try {
    res = await register(username, password, ctx)
    handleRes(ctx, next, res)
  } catch (error) {
    handleRes(ctx, next, error)
  }
})

router.post('/login', async(ctx, next) => {
  const { username, password } = ctx.request.body
  let res
  try {
    res = await login(username, password, ctx)
    handleRes(ctx, next, res)
  } catch (error) {
    handleRes(ctx, next, error)
  }
})

router.post('/otherLogin', async(ctx, next) => {
  const { loginId, passworld } = ctx.request.body
  try {
    const res = await getTokenFromDatrix({ loginId, passworld })
    handleRes(ctx, next, res)
  } catch (error) {
    console.trace(error)
  }
})

export default router
