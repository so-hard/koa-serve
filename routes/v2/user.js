import Router from 'koa-router'
import UserDao from '../../dao/user.js'
import {register} from '../../controller/user.js'
const router =  Router()

router.prefix('/api/v2/user')

// console.log(register)
router.post('/signUp',register)
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


router.post('/signIn',async(ctx,next) => {

})

router.get('/test', async (ctx,next) => {
  console.log(ctx);

})
export default router