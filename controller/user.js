import jwt from 'jsonwebtoken'
import { db } from '../db/mysql.js'
import { genPassword } from '../util/index.js'
import { TOKEN_SECRETKEY } from '../config/secret.js'
import User from '../model/user.js'
import UserAuth from '../model/userAuth.js'


const register = async (ctx, next) => {
  try {
    // console.log(ctx)
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

const login = async (username, password) => {
  try {
    const checkNameRes = await checkName(username)
    // console.trace(checkNameRes[0][0].username)
    if (!checkNameRes[0].length) {
      return Promise.reject({
        data: '',
        code: 400,
        message: '该用户不存在'
      })
    }
    const encryption = genPassword(password)
    // console.log(sql)
    const res = await db.query(`select username from users where username=? and password=?`, [username, encryption])
    if (res) {
      await db.query(`insert into users (lastLoginTime) values (?) `, [Date.now()])
      return {
        code: 200,
        data: {
          username,
          token: jwt.sign({ username }, TOKEN_SECRETKEY, { expiresIn: '7d' })
        },
        msg: '登陆成功'
      }
    }
  } catch (error) {
    console.error(error.message)
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
  login
}
