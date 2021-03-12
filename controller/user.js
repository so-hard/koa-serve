import jwt from 'jsonwebtoken'
import { db } from '../db/mysql.js'
import { genPassword } from '../util/index.js'
import { TOKEN_SECRETKEY } from '../config/secret.js'
import User from '../model/user.js'
import UserAuth from '../model/userAuth.js'

/**
 * @api {psot} /v2/user/register 用户注册
 * @apiName userlogin
 * @apiGroup User
 * @apiVersion 0.0.1

 * @apiHeader {String} Authorization 需要token
 * @apiExample {bash} Curl example
 * curl -H "Authorization: token 5f048fe" -i https://api.example.com/user/4711
 * @apiParam {String} identity_type 登录类型,qq,wx,email,phone.
 * @apiParam {String} identifier 唯一标识,qq号,wx号,邮箱
 * @apiParam  {String} credential 登陆凭证
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *    data: {
        id:'1',
        username:'defalut',
        avatar:'defalut.jpg',
        sex:'0',
        createdAt:'2020.09.03'
      },
      code: 200,
      msg: '创建成功'
 *  }
 */
const register = async (ctx, next) => {
  try {
    // console.log(ctx.request)
    const { identity_type, identifier, credential } = ctx.request.body;
    const hasUserAuth = await UserAuth.findOne({
      where: {
        identity_type,
        identifier
      }
    })
    if (hasUserAuth) {
      throw {
        code: 400,
        msg: '用户已存在',
        data: []
      }
    }
    await User.create()
    // console.log(defaultUser)
    await UserAuth.create({ identity_type, identifier, credential, user_id: defaultUser.id })
    // const { id, avatar, username, sex, createdAt } = defaultUser;
    ctx.body = {
      data: [],
      code: 200,
      msg: '创建成功'
    }
  } catch (error) {
    console.log(error)
    ctx.body = error
  }
}


/**
 * @api {psot} /v2/user/signIn 用户登录
 * @apiName usersignIn
 * @apiGroup User
 * @apiVersion 0.0.1
 * 
 * @apiParam {String} identity_type 登录类型,qq,wx,email,phone.
 * @apiParam {String} identifier 唯一标识,qq号,wx号,邮箱
 * @apiParam  {String} credential 登陆凭证
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *    data: {
        id:'1',
        username:'defalut',
        avatar:'defalut.jpg',
        sex:'0',
        createdAt:'2020.09.03'
      },
      code: 200,
      msg: '创建成功'
 *  }
 */
const signIn = async (ctx,next) => {
  try {
    const { identity_type, identifier,credential} = ctx.request.body;
    // console.log( ctx.request.body)
    const hasUserAuth = await UserAuth.findOne({
      where: {
        identity_type,
        identifier,
      },
      // include:User
    })
    if(!hasUserAuth){
      throw {
        data: [],
        code:400,
        msg: '用户不存在'
      }
    }
    if(!(genPassword(credential) === hasUserAuth.credential)){
      console.log(genPassword(credential), hasUserAuth.credential)
      throw {
        data: [],
        code :400,
        msg: '密码凭证错误'
      }
    }
    const curUser  = await hasUserAuth.getUser();
    const token = jwt.sign({id:curUser.id,},TOKEN_SECRETKEY,{expiresIn: 60 * 60});
    // let {username,} = curUser;
    ctx.body = {
      data: {
          token,
          userInfo:curUser
      },
      code:200,
      msg:'登录成功'
    }
  } catch (error) {
    console.error(error)
    ctx.body = error
  }
}


const testToken = (ctx,next) => {
  console.log(ctx.request)
}

/**
 * @param {string} username
 */
const checkName = async (username) => {
  try {
    const res = await db.query(`select username from users where username=?`, [username])
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(error)
  }
}

export {
  register,
  signIn,
  testToken
}
