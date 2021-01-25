import { sequelize } from '../db/mysql.js'
import  Sequelize from 'sequelize' 
const {DataTypes, Model} = Sequelize

class User  extends Model {

}

User.init({
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  username:{
    type:DataTypes.STRING,
    defaultValue:'default',
    comment:'用户名'
  } ,
  parent_id: {
    type:DataTypes.INTEGER,
    defaultValue:0,
    comment:'父id'
  },
  is_admin: {
    type:DataTypes.INET,
    defaultValue:0,
    comment:'是否为管理员'
  },
  sex:{
    type:DataTypes.INET,
    defaultValue:0,
    comment:'用户性别0未知,1女性'
  },
  avatar:{
    type:DataTypes.STRING,
    defaultValue:'default.jpg'
  }
}, {
  sequelize,
  modelName:"User",
  timestamps: true,
})

export default User 
// const User = sequelize.define('se_user',
// {
//   userName: DataTypes.CHAR,
//   passworld: DataTypes.INTEGER,
//   parent_id: DataTypes.INTEGER,
//   is_admin: DataTypes.INTEGER,
//   sex: DataTypes.INTEGER,
//   create_time: {
//     type: DataTypes.INTEGER,
//     defaultValue: DataTypes.NOW
//   },
//   location: {
//     type: DataTypes.CHAR,
//     defaultValue: null,
//   }
// })
