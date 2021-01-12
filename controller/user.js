import jwt from 'jsonwebtoken'
import { db } from '../db/mysql.js'
import { genPassword } from '../util/index.js'
import { TOKEN_SECRETKEY } from '../config/secret.js'

const register = async(usrname, password, ctx) => {
  try {
    const checkNameResult = await checkName(usrname)
    if (checkNameResult[0].length) {
      return Promise.reject(
        {
          data: '',
          code: 400,
          message: '用户已存在'
        }
      )
    }
    const encryption = genPassword(password)
    await db.query(`insert into users (username,password,registrationTime) values(
      ?, ?, ?
    )`, [usrname, encryption, Date.now()])
    return {
      data: [],
      code: 200,
      msg: '注册成功'
    }
  } catch (error) {
    console.error(error)
  }
}

const login = async(username, password) => {
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
const checkName = async(username) => {
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
