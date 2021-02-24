import Router from 'koa-router'
import UserDao from '../../dao/user.js'
import {register,signIn} from '../../controller/user.js'
const router =  Router()

router.prefix('/api/v2/user')

// console.log(register)
router.post('/register',register)
// router.post('/signUp', async(ctx, next) =>  {
//   try {
//     let resData =  await UserDao.create(ctx.request.body)
//     ctx.body = {
//       data: resData,
//       msg:'创建成功',
//       code:200
//     }
//   } catch (error) {
//     ctx.body = error
//   }
// })


router.post('/signIn',signIn)

router.get('/test', async (ctx,next) => {
  console.log(ctx);

})
export default router