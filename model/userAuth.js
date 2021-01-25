import {sequelize} from '../db/mysql.js'
import Sequelize from 'sequelize'

import User from './user.js' 


const  { DataTypes, Model } = Sequelize
class UserAuth  extends Model {

}

UserAuth.init({
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  identity_type:{
    type:DataTypes.STRING,
    allowNull:true,
    allowNull:false,
    comment:' 登录类型'
  },
  identifier :{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'唯一标识'
  },
  credential:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'密码凭证'
  }
},{
  sequelize,
  timestamps: true,
})

UserAuth.belongsTo(User,{
  foreignKey:'user_id',sourceKey:'id',as:'User'
})

User.hasMany(UserAuth,{
  foreignKey:'user_id',targetKey:'id',as:'UserAuth'
})
export default UserAuth