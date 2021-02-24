import jwt from 'jsonwebtoken'
import { db } from '../db/mysql.js'
import { genPassword } from '../util/index.js'
import { TOKEN_SECRETKEY } from '../config/secret.js'
import User from '../model/user.js'
import UserAuth from '../model/userAuth.js'

/**
 * @api {psot} /v2/user/register 
 * @apiName 用户注册
 * @apiGroup User
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
const register = async (ctx, next) => {
  try {
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
    const defaultUser = await User.create()
    await UserAuth.create({ identity_type, identifier, credential, user_id: defaultUser.id })
    const { id, avatar, username, sex, createdAt } = defaultUser;
    ctx.body = {
      data: {
        id,
        username,
        avatar,
        sex,
        createdAt
      },
      code: 200,
      msg: '创建成功'
    }
  } catch (error) {
    console.log(error)
    ctx.body = error
  }
}


/**
 * @api {psot} /v2/user/signIn 
 * @apiName 用户登录
 * @apiGroup User
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
      }
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
    console.log(jwt)
  } catch (error) {
    console.error(error)
    ctx.body = error
  }
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
  signIn
}
