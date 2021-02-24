import User from '../model/user.js'
import UserAuth from '../model/userAuth.js'


export default class UserDao {

  /**
   * @param {Object} params 
   * @param {String} params.identity_type
   * @param {String} params.identifier
   * @param {String} params.credential
   */
  static async signUp(params) {
    const {identity_type,identifier,credential} = params;
    const hasUserAuth = await UserAuth.findOne({
      where: {
        identity_type,
        identifier
      }
    })
    if(hasUserAuth) {
      throw {
        code:400,
        msg:'用户已存在',
        data:[]
      }
    }
    const defaultUser = await User.create()
    await UserAuth.create({identity_type,identifier,credential,user_id:defaultUser.id})
    const {id,avatar,username,sex,createdAt} = defaultUser
    return Promise.resolve({
      id,
      username,
      avatar,
      sex,
      createdAt
    })
  }
}